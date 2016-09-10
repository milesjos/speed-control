document.addEventListener('DOMContentLoaded', function() {

  selectedSpeed.addEventListener("click", function(event) {
    document.getElementById("currentSpeed").innerHTML = document.getElementById("selectedSpeed").value;
  });
});
