// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const bookingTable = document.getElementById("bookingTable");
const searchInput = document.getElementById("searchInput");

// Fetch and render bookings
function fetchBookings() {
  db.collection("bookings").orderBy("date", "desc").onSnapshot(snapshot => {
    const bookings = [];
    snapshot.forEach(doc => bookings.push({ id: doc.id, ...doc.data() }));
    renderBookings(bookings);
  });
}

// Render bookings
function renderBookings(bookings) {
  const keyword = searchInput.value.toLowerCase();
  const filtered = bookings.filter(b =>
    b.name.toLowerCase().includes(keyword) ||
    b.date.toLowerCase().includes(keyword)
  );

  bookingTable.innerHTML = filtered.map(b => `
    <tr>
      <td class="p-3">${b.name}</td>
      <td class="p-3">${b.date}</td>
      <td class="p-3">${b.time}</td>
      <td class="p-3">
        <button onclick="deleteBooking('${b.id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </td>
    </tr>
  `).join("");
}

// Delete a booking
function deleteBooking(id) {
  if (confirm("Are you sure you want to delete this booking?")) {
    db.collection("bookings").doc(id).delete();
  }
}

// Event: Search
searchInput.addEventListener("input", fetchBookings);

// Initial load
fetchBookings();
