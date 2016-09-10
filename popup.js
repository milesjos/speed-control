document.addEventListener('DOMContentLoaded', function() {

  // Get selected speed element
  var selectedSpeed = document.getElementById("selectedSpeed");
  var speedIndicator = document.getElementById("currentSpeed");

  // Add listener on change of slider
  selectedSpeed.addEventListener("change", function(event) {
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
        code: "document.getElementsByTagName('VIDEO')[0].playbackRate = "+result.speed
      });
    }
  });

});
