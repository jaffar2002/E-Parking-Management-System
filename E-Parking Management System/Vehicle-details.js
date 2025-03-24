



function loadVehicleData() {
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    let tableBody = document.getElementById("vehicleTableBody");
    tableBody.innerHTML = "";

    if (vehicles.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='7' class='text-center text-muted'>No bookings found</td></tr>";
    } else {
        vehicles.forEach((vehicle, index) => {
            let row = `<tr>
                <td>${vehicle.ownerName}</td>
                <td>${vehicle.vehicleNumber}</td>
                <td>${vehicle.vehicleType}</td>
                <td>${new Date(vehicle.bookingSlot).toLocaleString()}</td>
                <td>
                    <input type="datetime-local" class="form-control" id="exitTime-${index}" value="${vehicle.exitTime || ''}">
                </td>
                <td id="fee-${index}">₹${vehicle.fee || '0'}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="generateReceipt(${index})">Receipt</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteVehicle(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

    function searchVehicle() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tableRows = document.querySelectorAll("#vehicleTableBody tr");

    tableRows.forEach(row => {
        let vehicleNumber = row.cells[1]?.textContent.toLowerCase();
        if (vehicleNumber.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}





function generateReceipt(index) {
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    let vehicle = vehicles[index];
    let exitTime = document.getElementById(`exitTime-${index}`).value;
    let fee = calculateParkingFee(new Date(vehicle.bookingSlot), new Date(exitTime));

    vehicle.exitTime = exitTime;
    vehicle.fee = fee;
    vehicles[index] = vehicle;
    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    document.getElementById(`fee-${index}`).textContent = `₹${fee}`;
    document.getElementById("recOwner").textContent = vehicle.ownerName;
    document.getElementById("recVehicle").textContent = vehicle.vehicleNumber;
    document.getElementById("recType").textContent = vehicle.vehicleType;
    document.getElementById("recEntry").textContent = new Date(vehicle.bookingSlot).toLocaleString();
    document.getElementById("recExit").textContent = new Date(exitTime).toLocaleString();
    document.getElementById("recFee").textContent = fee;
    document.getElementById("receipt").style.display = "block";
}

function calculateParkingFee(entryTime, exitTime) {
    let duration = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60));
    return duration * 20;
}

function deleteVehicle(index) {
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    vehicles.splice(index, 1);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    loadVehicleData();
}

function printReceipt() {
    let receiptContent = document.getElementById("receipt").innerHTML;
    let originalContent = document.body.innerHTML;
    
    document.body.innerHTML = receiptContent;
    window.print();
    document.body.innerHTML = originalContent;
}

window.onload = loadVehicleData;


