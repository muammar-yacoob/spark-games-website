function stopGifLoop(imageId, gifDuration, staticImagePath) {
    window.onload = function() {
        setTimeout(function() {
            var img = document.getElementById(imageId);
            img.src = staticImagePath;
        }, gifDuration);
    };
}