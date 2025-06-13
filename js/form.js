/* -------------------- НАЛАШТУЙ -------------------- */
const API_URL =
  "https://script.google.com/macros/s/AKfycbzjnWePUt8msmFYDB43_pYR3yUZYMcVNw1ftMxxylyTQf72eKiCTsSfxg5chzdsyrOd/exec";

const TOTAL_SEATS = 10;

/* -------------------------------------------------- */

let seatsTaken = 0; // лічба локально (для UX)

const form = document.getElementById("booking-form");
const successBox = document.getElementById("booking-success");
const seatsLeftEl = document.getElementById("seats-left");
const submitBtn = form.querySelector("button[type='submit']");
const fullMsg = document.getElementById("fully-booked-msg");

/* ---------- HELPERS ---------- */
function updateSeatsLeft() {
  const left = Math.max(0, TOTAL_SEATS - seatsTaken);
  seatsLeftEl.textContent = left;

  if (left === 0) {
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
    fullMsg.classList.remove("hidden");
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    fullMsg.classList.add("hidden");
  }
}

function showError(el, msg = "") {
  el.classList.remove("hidden");
  if (msg) el.textContent = msg;
}
function hideError(el) {
  el.classList.add("hidden");
}

/* ---------- ВАЛІДАЦІЯ ---------- */
function validateName(input) {
  const err = document.getElementById("error-name");
  const ok = input.value.trim().length >= 2;
  ok ? hideError(err) : showError(err);
  input.classList.toggle("border-red-500", !ok);
  return ok;
}

function validatePhone(input) {
  const err = document.getElementById("error-phone");
  const ok = /^[+0-9\s()-]{7,20}$/.test(input.value.trim());
  ok ? hideError(err) : showError(err);
  input.classList.toggle("border-red-500", !ok);
  return ok;
}

function validateEmail(input) {
  const err = document.getElementById("error-email");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  ok ? hideError(err) : showError(err);
  input.classList.toggle("border-red-500", !ok);
  return ok;
}

function validateSeats() {
  const legend = document.getElementById("seats-legend");
  const selected = form.querySelector("input[name='seats']:checked");
  if (!selected) {
    legend.innerHTML =
      "Скільки місць? <span class='text-red-500'>— оберіть опцію</span>";
    return false;
  }
  legend.textContent = "Скільки місць?";
  return true;
}

/* ---------- LIVE-зняття помилки seats ---------- */
form.querySelectorAll("input[name='seats']").forEach((r) =>
  r.addEventListener("change", () => {
    document.getElementById("seats-legend").textContent = "Скільки місць?";
  })
);

/* ---------- ВІДПРАВКА ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameIn = form.elements["name"];
  const phoneIn = form.elements["phone"];
  const mailIn = form.elements["email"];
  const seatRad = form.querySelector("input[name='seats']:checked");

  const valid =
    validateName(nameIn) &&
    validatePhone(phoneIn) &&
    validateEmail(mailIn) &&
    validateSeats();

  if (!valid || !seatRad) return;

  /* локальна перевірка ліміту */
  const seatsReq = parseInt(seatRad.value, 10);
  if (seatsTaken + seatsReq > TOTAL_SEATS) {
    alert("На жаль, недостатньо вільних місць 😢");
    return;
  }

  /* готуємо payload */
  const payload = {
    name: nameIn.value.trim(),
    phone: phoneIn.value.trim(),
    email: mailIn.value.trim(),
    seats: seatsReq,
  };

  /* disable, щоб не спамили */
  submitBtn.disabled = true;
  submitBtn.textContent = "Надсилаємо…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.success) {
      seatsTaken += seatsReq; // оновлюємо локально
      updateSeatsLeft(); // ...і на сторінці

      form.reset();
      successBox.classList.remove("hidden", "opacity-0");
      successBox.classList.add("animate-fade-in");
      setTimeout(() => successBox.classList.add("opacity-0"), 4000);
    } else {
      alert(data.message || "Помилка збереження");
    }
  } catch (err) {
    alert("Не вдалося відправити заявку. Спробуйте пізніше.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Надіслати заявку";
  }
});

/* ---------- ПЕРШИЙ рендер ---------- */
updateSeatsLeft();

/* ---------- ОТРИМАННЯ АКТУАЛЬНОЇ КІЛЬКОСТІ ЗАЙНЯТИХ МІСЦЬ ---------- */
async function fetchTakenSeats() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (typeof data.taken === "number") {
      seatsTaken = data.taken;
      updateSeatsLeft();
    }
  } catch (err) {
    console.warn("Не вдалося отримати кількість місць з API:", err);
  }
}

// Виклик при завантаженні
fetchTakenSeats();
