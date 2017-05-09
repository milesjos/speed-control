document.addEventListener('DOMContentLoaded', function() {

  // Get selected speed element
  var selectedSpeed = document.getElementById("selectedSpeed");
  var speedIndicator = document.getElementById("currentSpeed");

  // Change slider to reflect options
  chrome.storage.local.get({
    minSpeed: 0.5,
    maxSpeed: 2.5,
    speedInterval: 0.1
  }, function(items) {
    selectedSpeed.min = items.minSpeed;
    selectedSpeed.max = items.maxSpeed;
    selectedSpeed.step = items.speedInterval;
  });

  // Add listener on change of slider
  selectedSpeed.addEventListener("input", function(event) {
    // Get selected speed
    var selectedSpeed = this.value;

    // Save speed if different
    chrome.storage.local.get(["speed"], function(result) {
      if (result.speed !== selectedSpeed) {
        chrome.storage.local.set({'speed': selectedSpeed});
        chrome.tabs.executeScript({
          code: "var videos = document.getElementsByTagName('VIDEO');"+
            "for (var video of videos) {"+
              "video.playbackRate = "+selectedSpeed+
            "}"
        });
      }
    });

    // Show user selected speed
     speedIndicator.innerHTML = selectedSpeed;
  });

  // Set value to stored value
  chrome.storage.local.get(["speed"], function(result) {
    if (result.speed !== undefined) {
      selectedSpeed.value = result.speed;
      speedIndicator.innerHTML = result.speed;
      chrome.tabs.executeScript({
        code: "var videos = document.getElementsByTagName('VIDEO');"+
          "for (var video of videos) {"+
            "video.playbackRate = "+selectedSpeed.value+
          "}"
      });
    }
  });

});
