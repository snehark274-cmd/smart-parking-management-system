
const totalSlots = 12;
let bookings = JSON.parse(localStorage.getItem("parkingBookings")) || [];

const parkingSlots = document.getElementById("parkingSlots");
const slotNumber = document.getElementById("slotNumber");
const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

function saveBookings() {
    localStorage.setItem("parkingBookings", JSON.stringify(bookings));
}

function displaySlots() {
    parkingSlots.innerHTML = "";
    slotNumber.innerHTML = '<option value="">Choose an available slot</option>';

    for (let i = 1; i <= totalSlots; i++) {
        const booking = bookings.find(item => item.slot === i);

        const slot = document.createElement("div");
        slot.className = booking ? "slot occupied" : "slot available";
        slot.textContent = booking ? `Slot ${i} - Occupied` : `Slot ${i} - Available`;
        parkingSlots.appendChild(slot);

        if (!booking) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Slot ${i}`;
            slotNumber.appendChild(option);
        }
    }

    document.getElementById("totalSlots").textContent = totalSlots;
    document.getElementById("availableSlots").textContent = totalSlots - bookings.length;
    document.getElementById("occupiedSlots").textContent = bookings.length;
}

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const vehicle = document.getElementById("vehicleNumber").value.trim();
    const selectedSlot = Number(slotNumber.value);

    if (!name || !vehicle || !selectedSlot) {
        message.textContent = "Please fill all the details.";
        return;
    }

    if (bookings.some(item => item.slot === selectedSlot)) {
        message.textContent = "This slot is already booked.";
        return;
    }

    bookings.push({
        name: name,
        vehicle: vehicle,
        slot: selectedSlot
    });

    saveBookings();
    displaySlots();
    bookingForm.reset();

    message.textContent = `Success! Slot ${selectedSlot} booked for ${name}.`;
    message.style.color = "green";
});

displaySlots();
