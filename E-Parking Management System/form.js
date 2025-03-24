document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    let ownerName = document.getElementById("ownerName").value;
    let vehicleNumber = document.getElementById("vehicleNumber").value;
    let vehicleType = document.getElementById("vehicleType").value;
    let mobileNumber = document.getElementById("mobileNumber").value;
    let bookingSlot = document.getElementById("bookingSlot").value;

    let vehicleData = { ownerName, vehicleNumber, vehicleType, mobileNumber, bookingSlot };

    // Store in Local Storage
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    vehicles.push(vehicleData);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    // Redirect to Vehicle Details Page
    window.location.href = "vehicle-details.html";
});