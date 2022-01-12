// ==UserScript==
// @name         Savefrom Opener
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       dacoconutchemist
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/-.js
// @grant        GM_openInTab
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';
    GM_openInTab(window.location.href.replace("://www.youtube", "://www.ssyoutube"));
})();
