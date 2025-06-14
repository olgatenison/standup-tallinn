/* -------------------- НАЛАШТУЙ -------------------- */
const API_URL =
  "https://script.google.com/macros/s/AKfycbzOMuwkLePSfI1jeOoqx-nKVUaNr33vVBRewFba2XnZzUblv548Dj5SfbjezQgOcp5N/exec";

/* -------------------------------------------------- */

let TOTAL_SEATS; // ← отримаємо з API
let seatsTaken = 0; // локальна змінна для UX

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

  const seatsReq = parseInt(seatRad.value, 10);
  if (seatsTaken + seatsReq > TOTAL_SEATS) {
    alert("На жаль, недостатньо вільних місць 😢");
    return;
  }

  const payload = {
    name: nameIn.value.trim(),
    phone: phoneIn.value.trim(),
    email: mailIn.value.trim(),
    seats: seatsReq,
  };

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
      seatsTaken += seatsReq;
      updateSeatsLeft();

      form.reset();
      successBox.classList.remove("hidden");
      setTimeout(() => {
        successBox.classList.add("hidden");
      }, 4000);
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

/* ---------- ОТРИМАННЯ КІЛЬКОСТІ З API ---------- */
async function fetchTakenSeats() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (typeof data.taken === "number" && typeof data.total === "number") {
      seatsTaken = data.taken;
      TOTAL_SEATS = data.total;
      updateSeatsLeft();
    } else if (typeof data.taken === "number") {
      // fallback, якщо total не приходить
      seatsTaken = data.taken;
      TOTAL_SEATS = 70; // запасний варіант
      updateSeatsLeft();
    }
  } catch (err) {
    console.warn("Не вдалося отримати кількість місць з API:", err);
  }
}

/* ---------- ПЕРШИЙ ЗАПУСК ---------- */
fetchTakenSeats();
