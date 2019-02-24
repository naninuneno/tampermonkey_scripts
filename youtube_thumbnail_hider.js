// ==UserScript==
// @name         Youtube thumbnail hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make youtube work-friendly
// @author       neilb
// @run-at document-start
// @include        https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    var currentUrl = document.location.href;

    if (isVideoPage(currentUrl)) {
        runWrapper();
    }

    setInterval(function() {
        var checkUrl = document.location.href;
        if (checkUrl !== currentUrl) {
            currentUrl = checkUrl;
            if (isVideoPage(currentUrl)) {
                runWrapper();
            }
        }
    }, 100);

    function isVideoPage(url) {
        return /watch/.test(url);
    };

    function runWrapper() {
        var checkBodyPresent = setInterval(function() {
            if (document.body) {
                clearInterval(checkBodyPresent);
                runEverything();
            }
        }, 10); // very fast - shouldn't take long for body ready
    };

    function runEverything() {
        document.body.style.visibility = 'hidden';
        var text = createLoadingText();

        var checkLoaded = setInterval(function() {
            if (document.getElementById("ytd-player")) {
                clearInterval(checkLoaded);
                console.log("Loaded!");
                createToggleButton();
                hideVideo();
                hideThumbnails();
                document.body.style.visibility = 'visible';
                document.body.removeChild(text);
            }
        }, 100);

        // hide thumbnails every 3 seconds as their loading is hard to track properly
        setInterval(function() {
            hideThumbnails();
        }, 3000);

        function createLoadingText() {
            var text = document.createElement('p');
            text.innerHTML = "Safety loading... :)";
            document.body.appendChild(text);
            text.style.setProperty("visibility", "visible", "important");
            text.style.fontSize = "30px";
            text.style.position = "fixed";
            text.style.top = "50%";
            text.style.left = "43%";
            return text;
        };

        function createToggleButton() {
            var toggle = document.createElement('button');
            toggle.innerHTML = 'Enable';
            document.body.appendChild(toggle);
            toggle.style.position = "fixed";
            toggle.style.left = "0px";
            toggle.style.bottom = "0px";
            toggle.style.height = "40px";
            toggle.style.width = "100px";
            toggle.onclick = function() {
                var videoPlayer = document.getElementById("ytd-player");
                var videoVisibility = videoPlayer.style.visibility;
                var setVisibility = "hidden";
                if (videoVisibility == "hidden") {
                    setVisibility = "visible";
                }
                videoPlayer.style.visibility = setVisibility;
            }
            return toggle;
        }

        function hideVideo() {
            // Make sure controls bar still visible
            document.getElementsByClassName("ytp-chrome-bottom")[0].style.setProperty("visibility", "visible", "important");

            // Hide youtube player (but will keep black video box)
            document.getElementById("ytd-player").style.visibility = "hidden";
        };

        function hideThumbnails() {
            var thumbnails = document.getElementsByTagName("ytd-thumbnail");
            for (let thumbnail of thumbnails) {
                thumbnail.style.visibility = "hidden";
            }
        };
    };
})();
