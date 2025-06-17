# 🎤 Girls Rule! | Stand-Up Tallinn 2025

A stylish single-page event site for a women's stand-up comedy night in Tallinn. Built for fast and simple seat booking — no payments, just good vibes and a real-time booking tracker 💥

---

## 🧾 Overview

This project allows visitors to:

- View event details (date, venue, message)
- Book up to **3 seats** per person
- See how many seats are left — updated live
- Store all bookings in **Firebase Firestore**
- Export submissions to **Google Sheets** for organizers

---

## 🔧 Technologies Used

- **HTML + Tailwind CSS** — responsive layout and design
- **Vanilla JS (ES Modules)** — form validation & logic
- **Firebase Firestore** — database to store bookings
- **Google Apps Script** — exports data into Google Sheets
- **Netlify / Local dev server** — deployment-ready

---

## 📁 Project Structure

<pre> 
standup-tallinn/ 
├── index.html # Landing page 
├── css/ 
│ └── styles.css # Additional styles 
├── js/ 
│ ├── form.js # Form handling, validation, Firestore logic 
│ ├── performers.js # Optional dynamic list of performers 
│ └── firebase-init.js # Firebase configuration & export 
└── img/ # Assets (logo, background images) 

 </pre>

## ✅ Features

- Realtime seat counter with max limit (70 total)
- Form validation (name, phone, email, seat count)
- Booking disabled automatically when full
- Optional Google Sheets export (via Apps Script)
- Minimal dependencies & deploy-friendly

---

## 🚀 Getting Started

1. Clone or download this repo
2. Add your Firebase config in `firebase-init.js`
3. Deploy to Netlify or run locally via Live Server
4. (Optional) Set up Google Apps Script for exporting bookings to Sheets

---

**Made with ❤️ by Olga Tenison**
