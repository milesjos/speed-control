function findVideos(doc, videos) {
  // Find videos and put them in an array
  var vidArr = Array.prototype.slice.call(doc.getElementsByTagName('video'));
  videos.push(...vidArr);
  // Find iframes
  var iframes = doc.getElementsByTagName('iframe');
  if (iframes.length > 0) {
    // Search the iframes for more videos
    for (var iframe of iframes) {
      if (iframe.src === "") {
        findVideos(iframe.contentDocument, videos);
      }
    }
  }
}

var videos = [];
findVideos(document, videos);
for (var video of videos) {
  video.playbackRate = selectedSpeed;
}
