const getActiveTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener('DOMContentLoaded', function() {

  // Set access level
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

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
    chrome.storage.local.get(["speed"], async (result) => {
      if (result.speed !== selectedSpeed) {
        chrome.storage.local.set({'speed': selectedSpeed});
        const tab = await getActiveTab();
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['change-speed.js']
        });
      }
    });

    // Show user selected speed
     speedIndicator.innerHTML = selectedSpeed;
  });

  // Set value to stored value
  chrome.storage.local.get(["speed"], async (result) => {
    if (result.speed !== undefined) {
      selectedSpeed.value = result.speed;
      speedIndicator.innerHTML = result.speed;
      const tab = await getActiveTab();
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['change-speed.js']
      });
    }
  });
});
