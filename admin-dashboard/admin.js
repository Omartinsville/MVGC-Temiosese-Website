
    const firebaseConfig = {
      apiKey: "AIzaSyA-b8o07OzvAp-WK50m2N6c47E7DknOakQ",
      authDomain: "temiosesealagbede.firebaseapp.com",
      projectId: "temiosesealagbede",
      storageBucket: "temiosesealagbede.appspot.com",
      messagingSenderId: "105174914045",
      appId: "1:105174914045:web:5362ab4a7699b9eb02bf94",
      measurementId: "G-F4M4J2QXB4"
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
