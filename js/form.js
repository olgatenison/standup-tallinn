import { db, addDoc, collection, getDocs } from "./firebase-init.js";

const MAX_SEATS = 62;
let seatsTaken = 0;

const form = document.getElementById("booking-form");
const successBox = document.getElementById("booking-success");
const seatsLeftEl = document.getElementById("seats-left");
const submitBtn = form.querySelector("button[type='submit']");
const fullMsg = document.getElementById("fully-booked-msg");

function updateSeatsLeft() {
  const left = Math.max(0, MAX_SEATS - seatsTaken);
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

form.querySelectorAll("input[name='seats']").forEach((r) =>
  r.addEventListener("change", () => {
    document.getElementById("seats-legend").textContent = "Скільки місць?";
  })
);

async function countTakenSeats() {
  const snapshot = await getDocs(collection(db, "bookings"));
  let count = 0;
  snapshot.forEach((doc) => {
    count += parseInt(doc.data().seats || 0);
  });
  return count;
}

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

  if (!valid) return;

  const seatsReq = parseInt(seatRad.value, 10);
  const currentTaken = await countTakenSeats();

  if (currentTaken + seatsReq > MAX_SEATS) {
    alert("На жаль, недостатньо вільних місць 😢");
    return;
  }

  const payload = {
    name: nameIn.value.trim(),
    phone: phoneIn.value.trim(),
    email: mailIn.value.trim(),
    seats: seatsReq,
    createdAt: new Date().toISOString(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Надсилаємо…";

  try {
    await addDoc(collection(db, "bookings"), payload);
    seatsTaken = currentTaken + seatsReq;
    updateSeatsLeft();

    form.reset();
    successBox.classList.remove("hidden");
    setTimeout(() => {
      successBox.classList.add("hidden");
    }, 4000);
  } catch (err) {
    alert("Не вдалося відправити заявку. Спробуйте пізніше.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Надіслати заявку";
  }
});

async function initSeats() {
  seatsTaken = await countTakenSeats();
  updateSeatsLeft();
}

initSeats();
