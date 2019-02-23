// ==UserScript==
// @name         Youtube thumbnail hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make youtube work-friendly
// @author       neilb
// @run-at document-idle
// @include        https://www.youtube.com/watch?v=*
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function () {
        // Clone bottom controls bar to always display at bottom of black video box once hidden
        var bottomBar = document.getElementsByClassName("ytp-chrome-bottom")[0];
        var clonedBar = bottomBar.cloneNode(true);
        document.body.appendChild(clonedBar);
        clonedBar.style.top = "500px";

        // Hide youtube player (but will keep black video box
        document.getElementById("ytd-player").style.display = "none";
    }
})();
