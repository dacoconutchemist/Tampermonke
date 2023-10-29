// ==UserScript==
// @name         MapartCraft Additional Utils
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the map art making world!
// @author       dacoconutchemist
// @match        https://rebane2001.com/mapartcraft/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rebane2001.com
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @grant        none
// ==/UserScript==

setTimeout(() => {
    'use strict';
    $('head').append(`
    <style>
        @font-face {
            font-family: ukrminecraft;
            src: url(https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/minecraftfontukr.ttf);
        }
        .tooltipText, .greenButton, .greenButton_text_dummy, .greenButton_text, .greenButton_large_text_dummy, .greenButton_large_text {
            font-family: ukrminecraft !important;
        }
    </style>
    `);
    $(`
    <button onclick="rotateCanvas();">Rotate</button>
    <button onclick="resetRotateCanvas();">Reset rotation</button>
    <script>
        function rotateCanvas(){
            var angle = ($('.mapCanvas').first().data('angle') + 90) || 90;
            $('.mapCanvas').first().css({'transform': 'rotate(' + angle + 'deg)'});
            $('.mapCanvas').first().data('angle', angle);
        }
        function resetRotateCanvas(){
            $('.mapCanvas').first().css({'transform': 'rotate(0deg)'});
            $('.mapCanvas').first().data('angle', 0);
        }
    </script>
    `).insertAfter(".progress");
    $(`
    <style>
        .mau_calcinput {
            width: 50px;
            display: inline;
        }
    </style>
    <input placeholder="SB" width="50px" id="mau_sb" class="mau_calcinput">
    <p style="display:inline;">&nbsp;SB +&nbsp;</p>
    <input placeholder="st" width="50px" id="mau_st" class="mau_calcinput">
    <p style="display:inline;">&nbsp;stacks +&nbsp;</p>
    <input placeholder="leftover" width="50px" id="mau_leftover" class="mau_calcinput">
    <p style="display:inline;">&nbsp;=&nbsp;</p>
    <input placeholder="num" width="50px" id="mau_num" class="mau_calcinput">
    <br>
    <button onclick="calcNum();">Calculate number</button>
    <button onclick="calcStacks();">Calculate SB + st + leftover</button>
    <br>
    <button onclick="manipulateTooltipText();">Make into list</button>
    <script>
        function stacksEvent(event) {
            if (event.key === "Enter") calcNum();
        }
        function numEvent(event) {
            if (event.key === "Enter") calcStacks();
        }
        document.getElementById("mau_sb").addEventListener("keyup", stacksEvent);
        document.getElementById("mau_st").addEventListener("keyup", stacksEvent);
        document.getElementById("mau_leftover").addEventListener("keyup", stacksEvent);
        document.getElementById("mau_num").addEventListener("keyup", numEvent);
        function calcStacks() {
            var num = eval(document.getElementById("mau_num").value || 0);
            $("#mau_sb").val( Math.floor(num / (27 * 64)) .toString());
            $("#mau_st").val( (Math.floor(num / 64) % 27) .toString());
            $("#mau_leftover").val( (num % 64) .toString());
        }
        function calcNum() {
            var sb = parseInt(document.getElementById("mau_sb").value || 0);
            var st = parseInt(document.getElementById("mau_st").value || 0);
            var leftover = parseInt(document.getElementById("mau_leftover").value || 0);
            $("#mau_num").val( (27 * 64 * sb + 64 * st + leftover) .toString());
        }
        function manipulateTooltipText() {
            $('.tooltipText').each(function() {
                var $tooltipText = $(this);
                if ($tooltipText.parent().first().first().prop("tagName") == "IMG") {
                   var $parent = $tooltipText.parent().parent();
                   $parent.css({
                      display: 'flex',
                      flexDirection: 'row'
                   });
                   var $clone = $tooltipText.clone();
                   $tooltipText.remove();
                   $clone.appendTo($parent.first());
                }
            });
         }
    </script>
    `).insertBefore("#materialtable");
}, 2000);
