// ==UserScript==
// @name         Savefrom / 320YTMP3.info Download + Hide Video Time + Share Playlist
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  download yt videos easily
// @author       dacoconutchemist
// @match        https://www.youtube.com/*
// @match        https://www.youtube.com/shorts/*
// @match        https://320ytmp3.info/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

setTimeout(() => {
    if (document.location.href.includes("320ytmp3.info")) {
        // paste the youtube link into YTMP3 and downlooad
        const url = new URLSearchParams(window.location.search);
        if (url.has("link")) {
            var link = decodeURIComponent(url.get("link"));
            $('input').val(link);
            document.evaluate(
                '//*[@id="go"]/div/button',          // The XPath expression
                document,                // The context node (usually document)
                null,                    // A namespace resolver (not used here, set to null)
                XPathResult.FIRST_ORDERED_NODE_TYPE, // The result type (we want the first matching element)
                null                     // A result object (not used here, set to null)
            ).singleNodeValue.click();

        }
    } else {
        $(document).on("keypress", function (e) {
            if(["h", "H", "р", "Р"].includes(e.key)) {
                var el = document.getElementsByClassName("ytp-time-display")[0];
                if(el.style.display == "none") el.style.display = "inline-block";
                else el.style.display = "none";
            }
        });

        // add YouTube or YouTube Shorts download link
        // get element where the link is added with XPath
        var path = "";
        if(document.location.href.includes("youtube.com/shorts"))
            path = "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-shorts/div[2]/div[2]/ytd-reel-video-renderer[46]/div[2]/ytd-reel-player-overlay-renderer/div[1]/ytd-reel-player-header-renderer/h2/yt-formatted-string";
        else
            path = "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[2]/ytd-watch-metadata/div/div[1]/h1";
        var download = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        // add link and attach event listener
        const url = new URLSearchParams(window.location.search);
        var playlisturl = "";
        if (url.has("list")) {
            var list = decodeURIComponent(url.get("list"));
            playlisturl = `https://youtube.com/playlist?list=${list}`;
        }
        download.insertAdjacentHTML('beforeend', `
            <a href="javascript:void(0)" id="downloaddaco1">DOWNLOAD-MP4</a>
            <a href="javascript:void(0)" id="downloaddaco2">DOWNLOAD-MP3</a>
            <style>
                #downloaddaco2, #playlistdaco {
                    margin-left: 10px;
                }
            </style>
        ` + (playlisturl ? `<a href="javascript:void(0)" id="playlistdaco">COPY PLAYLIST</a>` : ""));
        $("#downloaddaco1").on("click", e => {
            //window.open(`https://yt2mp3.info/?l=en&link=${encodeURIComponent(document.location.href)}`, '_blank').focus();
            window.open(document.location.href.replace("https://www.youtube.com/", "https://www.ssyoutube.com/"), '_blank').focus();
        });
        $("#downloaddaco2").on("click", e => {
            window.open(`https://320ytmp3.info/?link=${encodeURIComponent(document.location.href)}`, '_blank').focus();
        });
        $("#playlistdaco").on("click", e => {
            navigator.clipboard.writeText(playlisturl).then(
                () => alert('Скопійовано успішно'),
                () => alert('Не вдалось скопіювати')
            );
        });
    }

}, 1000);
