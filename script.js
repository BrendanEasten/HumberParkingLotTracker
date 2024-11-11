// For dropdown menu selection
document.getElementById('photo-lot-selector').addEventListener('change', function () {
    const selectedLot = this.value; // Get the value (e.g., "lot1", "lot3", etc.)
    
    if (selectedLot) {
      const targetSection = document.getElementById(selectedLot); // Find the section by ID
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth' // Smooth scroll to the selected section
        });
      }
    }
  });
// Simulate an update every minute for parking availability
function updateParkingAvailability() {
    const parkingLots = [
        { id: 'lot1-count', maxSpots: 80 },
        { id: 'lot3-count', maxSpots: 80 },
        { id: 'lot4-count', maxSpots: 80 },
        { id: 'lot6-count', maxSpots: 80 },
        { id: 'lot7-count', maxSpots: 80 },
        { id: 'lot8-count', maxSpots: 80 },
        { id: 'lot9-count', maxSpots: 80 },
        { id: 'lot10-count', maxSpots: 80 },
        { id: 'lot11-count', maxSpots: 80 },
        { id: 'lot12-count', maxSpots: 80 },
        { id: 'lot13-count', maxSpots: 80 },
        { id: 'lot14-count', maxSpots: 80 },
        { id: 'lot15-count', maxSpots: 80 },
        { id: 'parking-garage-count', maxSpots: 150 }
    ];

    parkingLots.forEach(lot => {
        const availableSpots = Math.floor(Math.random() * lot.maxSpots); // Random spots based on max capacity
        const lotElement = document.getElementById(lot.id);
        const totalSpotsElement = lotElement.nextElementSibling; // The span with total spots

        if (availableSpots > 0) {
            lotElement.textContent = availableSpots;
            lotElement.classList.add('available');
            lotElement.classList.remove('full');
            totalSpotsElement.textContent = `/${lot.maxSpots}`; // Show total spots
        } else {
            lotElement.textContent = 'FULL';
            lotElement.classList.add('full');
            lotElement.classList.remove('available');
            totalSpotsElement.textContent = ''; // Hide total spots when full
        }
    });
}

// Update every minute (60000ms)
setInterval(updateParkingAvailability, 60000);

// Run once on page load
updateParkingAvailability();

// Create the modal elements dynamically
const modal = document.createElement("div");
modal.id = "mapModal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.zIndex = "1";
modal.style.left = "0";
modal.style.top = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

// Add the close button
const closeButton = document.createElement("span");
closeButton.innerHTML = "&times;";
closeButton.style.position = "absolute";
closeButton.style.top = "30px";
closeButton.style.right = "40px";
closeButton.style.fontSize = "40px";
closeButton.style.fontWeight = "bold";
closeButton.style.color = "white";
closeButton.style.cursor = "pointer";
closeButton.onclick = function () {
    modal.style.display = "none";
};
modal.appendChild(closeButton);

// Add the enlarged image inside the modal
const modalImage = document.createElement("img");
modalImage.style.margin = "5% auto";
modalImage.style.display = "block";
modalImage.style.width = "100%";
modalImage.style.maxWidth = "1000px";
modal.appendChild(modalImage);

// Append the modal to the body
document.body.appendChild(modal);

// Get the original map image and set up the click event
const mapImage = document.getElementById("parking-lot-map");
mapImage.style.cursor = "pointer";
mapImage.onclick = function () {
    modal.style.display = "block";
    modalImage.src = this.src;
};

// Close the modal when clicking outside of the image
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function updateTime() {
    const timeElements = document.querySelectorAll('.current-time'); // Get all elements with class 'current-time'
    const dateElements = document.querySelectorAll('.current-date'); // Get all elements with class 'current-date'
    
    const now = new Date();
    
    // Get time in 12-hour format
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12' in 12-hour format
    
    const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Get the current date in a readable format
    const currentDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Update the time for each element with class 'current-time'
    timeElements.forEach(timeElement => {
        timeElement.textContent = currentTime;
    });
    
    // Update the date for each element with class 'current-date'
    dateElements.forEach(dateElement => {
        dateElement.textContent = currentDate;
    });
}

// Update the time and date every second
setInterval(updateTime, 1000);

// Call updateTime once to set the initial time and date immediately
updateTime();