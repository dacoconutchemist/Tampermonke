// ==UserScript==
// @name         Prnt.sc Next Image
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over prnt.sc!
// @author       dacoconutchemist
// @match        https://prnt.sc/*
// @icon         https://www.google.com/s2/favicons?domain=prnt.sc
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

(function() {
    'use strict';
    var lnk = document.createElement("a");
    lnk.innerHTML = "▶️▶️▶️";
    lnk.style.color = "white";
    lnk.href = "https://prnt.sc/" + (parseInt(document.location.href.split("/").slice(-1)[0], 36) + 1).toString(36);
    lnk.target = "_self";
    var hold = document.getElementsByClassName("header-social")[0];
    hold.appendChild(lnk);
})();
