function save_options() {
  var minSpeed = document.getElementById("min");
  var maxSpeed = document.getElementById("max");
  var speedInterval = document.getElementById("interval");
  chrome.storage.local.set({
    minSpeed: minSpeed.value,
    maxSpeed: maxSpeed.value,
    speedInterval: speedInterval.value
  }, function updateStatus() {
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function restore_options() {
  chrome.storage.local.get({
    minSpeed: 0.5,
    maxSpeed: 2.5,
    speedInterval: 0.1
  }, function(items) {
    document.getElementById("min").value = items.minSpeed;
    document.getElementById("max").value = items.maxSpeed;
    document.getElementById("interval").value = items.speedInterval;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
