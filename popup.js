document.addEventListener('DOMContentLoaded', function() {

  selectedSpeed = document.getElementById("selectedSpeed");

  selectedSpeed.addEventListener("change", function(event) {
    // Get selected speed
    selectedSpeed = this.value;
    // Show user selected speed
    document.getElementById("currentSpeed").innerHTML = selectedSpeed;

  });
});
