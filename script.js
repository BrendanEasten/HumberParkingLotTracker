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