// ==UserScript==
// @name         Next Lightshot Page
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  go to next prnt.sc image
// @author       dacoconutchemist
// @match        https://prnt.sc/*
// @icon         https://www.google.com/s2/favicons?domain=prnt.sc
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @require      https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/-.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

//zzy1
function notFound() {
    var imglink = document.getElementsByClassName('no-click screenshot-image')[0].src;
    return !(
        /https:\/\/i\.imgur\.com\/.+/.test(imglink) ||
        /https:\/\/image\.prntscr\.com\/image\/.+/.test(imglink)
    );
}

window.onload = function() {
    'use strict';

    var prevlink = "", nextlink = "";
    if (document.location.href != "https://prnt.sc/") {
        var ht = (parseInt(document.location.href.split("/").slice(-1)[0], 36) - 1).toString(36);
        prevlink = "https://prnt.sc/" + (ht.startsWith("0") ? "1" + ht.slice(1) : ht) + "#prev";
        ht = (parseInt(document.location.href.split("/").slice(-1)[0], 36) + 1).toString(36);
        nextlink = "https://prnt.sc/" + (ht.startsWith("0") ? "1" + ht.slice(1) : ht) + "#next";
        if (notFound()) {
            if (window.location.hash == "#prev") {
                window.location.replace(prevlink);
                return 0;
            }
            else if (window.location.hash == "#next") {
                window.location.replace(nextlink);
                return 0;
            }
        }
    }
    $(".header-downloads.js-download-last-home").remove();
    document.getElementsByClassName("header-logo")[0].target = "_self";
    if (document.location.href == "https://prnt.sc/") {}
    else {
        document.title = "ID: " + document.location.href.split("/").slice(-1)[0];
        $(`
            <a href="javascript:void(0)" style="font-size: x-large;" target="_self" id="previmage">⬅️</a>
            <a href="javascript:void(0)" style="font-size: x-large;" target="_self" id="nextimage">➡️</a>
            <a href="javascript:void(0)" style="font-size: x-large;" target="_self" id="addfav">➕</a>
            <a href="javascript:void(0)" style="font-size: x-large;" target="_self" id="seefav">👁️</a>
        `).appendTo( ".header-social" );
        $('#previmage').attr('href', prevlink);
        $('#nextimage').attr('href', nextlink);
        var imgursrc = document.getElementsByClassName("no-click screenshot-image")[0].src;
        $('#addfav').text(GM_getValue("favs", []).includes(imgursrc) ? "➖" : "➕");
        var onclminus;
        var onclplus = function(){
            this.onclick = onclminus;
            GM_setValue("favs", GM_getValue("favs", []).concat(imgursrc));
            this.innerHTML = "➖";
            return false;
        }
        onclminus = function(){
            this.onclick = onclplus;
            GM_setValue("favs", GM_getValue("favs", []).filter(item => item !== imgursrc));
            this.innerHTML = "➕";
            return false;
        }
        $('#addfav')[0].onclick = (GM_getValue("favs", []).includes(imgursrc) ? onclminus : onclplus);
        ht = "Link list:<br>";
        for (let link of GM_getValue("favs", ["No links"])) {
            ht = ht + `<a href="${link}"><img src="${link}"></a><br>`;
        }
        $('#seefav').attr('href', "https://tampermonkeykostyl.dacoconutnut.repl.co/#" + encodeURI(ht));
        $(`
            <h2 style="color:red;">WARNING:</h2>
            <style>
            blockquote {
                padding: 15px;
                background: #eee;
                border-radius: 5px;
                width: 50%;
                margin:auto;
            }
            blockquote::before { content: '"'; }
            blockquote::after { content: '"'; }
            </style>
            <blockquote>If you use prnt.sc to illegally access [cryptocurrency] accounts that are not your own and then try to steal money from those accounts then you may be making yourself the victim of a more elaborate fraud/honey pot.
            So basically "Attention thieving assholes, there might be other thieving assholes out there looking to thieve your asshole".</blockquote>
            <a href="https://linustechtips.com/topic/1370961-attention-prntsc-browsers/#comment-14973952">- CerealExperimentsLain from LTT forums</a>
        `).insertAfter( ".image-constrain.js-image-wrap" );
    }
}
