// ==UserScript==
// @name         кдордни
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://maps-main.gummercraft.fun/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gummercraft.fun
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// ==/UserScript==

setTimeout(()=>{
    'use strict';
    // основні значення
    var spawnCoords = {
        x: -4,
        z: -816
    };
    var southBorderZ = 9184;

    function xpath(xp) { return document.evaluate(xp,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }
    function calculatePolygonCentroid(vertices) {
        let cx = 0;
        let cy = 0;
        let A = 0;
        for (let i = 0; i < vertices.length; i++) {
            const x1 = vertices[i][0];
            const y1 = vertices[i][1];
            const x2 = vertices[(i + 1) % vertices.length][0];
            const y2 = vertices[(i + 1) % vertices.length][1];
            const crossProduct = x1 * y2 - x2 * y1;
            A += crossProduct;
            cx += (x1 + x2) * crossProduct;
            cy += (y1 + y2) * crossProduct;
        }
        // чатгпт пішов нахуй, не треба доділювати
        //A /= 2; // The area should be halved
        cx /= (3 * A);
        cy /= (3 * A);
        return [cx, cy];
    }

    // створюєм канвас без pointer-events щоб був прозорим для мишки і задаємо розмір
    $(document.body).append('<canvas style="width:100%; height:100%; pointer-events:none; position: absolute; top: 0; left: 0;" id="daco_canvas"></canvas>');
    const $canv = $("#daco_canvas");
    const canv = $canv[0];
    setInterval(()=>{
        var bounds = canv.getBoundingClientRect();
        canv.setAttribute("width", bounds.width);
        canv.setAttribute("height", bounds.height);
        updateDrawing();
    }, 500);
    // scaleElem - якийсь leaflet-proxy leaflet-zoom-animated
    // translateElem - значок спавну
    var scaleElem = xpath('//*[@id="app"]/div[1]/div[1]/div[6]');
    var translateElem = xpath('//*[@id="app"]/div[1]/div[1]/div[10]/div');
    var rightClickMenu = xpath('//*[@id="map-context-menu"]/ul');
    // обновляєм канвас тільки якщо щось змінилось в DOM (позиція спавну чи масштаб)
    var observer1 = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (scaleElem.style.transform.includes('scale')) updateDrawing();
            }
        }
    });
    observer1.observe(scaleElem, { attributes: true });
    var observer2 = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (translateElem.style.transform.includes('translate')) updateDrawing();
            }
        }
    });
    observer2.observe(translateElem, { attributes: true });
    // штуки з правою кнопкою
    var pointsArray = [];
    $(rightClickMenu).prepend(`
        <li role="none"><button type="button" role="menuitem" id="daco_add">Додати точку</button></li>
        <li role="none"><button type="button" role="menuitem" id="daco_print">Console.logнути точки</button></li>
    `);
    var coordsItem = xpath('//*[@id="map-context-menu"]/ul/li[3]/button');
    $('#daco_add').on('click', () => {
        pointsArray.push(coordsItem.innerText.match(/-?\d+/g).map(Number));
    });
    $('#daco_print').on('click', () => {
        console.log(pointsArray);
    });
    // меню зверху
    $(xpath('//*[@id="app"]/section[2]/header/button[2]')).after(`
        <button class="button--markers" data-section="markers" title="Markers" aria-label="Markers" aria-expanded="false" style="text-align:center; display: flex; align-items: center; justify-content: center;" id="daco_settings">DACO&ZeroWidthSpace;MAP</button>
    `);
    $(xpath('//*[@id="app"]/section[2]/div')).append(`
    <section class="sidebar__section section--collapsible" data-section="maps" id="daco_mapmenu" hidden>
        <h2 class="section__heading">
            <button id="dacomaps-heading" type="button" title="Click to toggle this section" aria-expanded="true" aria-controls="dacomaps-content">
                <span>Daco Map</span>
                <svg class="svg-icon svg-icon--arrow" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <use xlink:href="#icon--arrow"></use>
                </svg>
            </button>
        </h2>
        <div id="dacomaps-content" class="section__content" aria-hidden="false">
            <fieldset class="menu" role="radiogroup" aria-labelledby="dacomaps-heading">
                <div style="margin: 10px;"></div>
                <label class="layer checkbox">
                    <input type="checkbox" checked id="daco_mapmenu_show">
		            <svg class="svg-icon" aria-hidden="true">
	  		            <use xlink:href="#icon--checkbox"></use>
		            </svg>
                    <span>Показувати</span>
                </label>
                <div style="margin: 10px;"></div>
                <label class="layer checkbox">
                    <input type="checkbox" checked id="daco_mapmenu_labels">
		            <svg class="svg-icon" aria-hidden="true">
	  		            <use xlink:href="#icon--checkbox"></use>
		            </svg>
                    <span>Надписи</span>
                </label>
                <div style="margin: 10px;"></div>
                <label class="layer checkbox">
                    <input type="checkbox" checked id="daco_mapmenu_fill">
		            <svg class="svg-icon" aria-hidden="true">
	  		            <use xlink:href="#icon--checkbox"></use>
		            </svg>
                    <span>Заливка</span>
                </label>
            </fieldset>
        </div>
    </section>
    `);
    $('#daco_settings').on('click', ()=>{$('#daco_mapmenu').toggle();})
    // занулена спочатку хуня
    var scale = 0;
    var spawnOnScreen = {};
    var settings = {};
    var mapJSON = {};
    // матеша яку я придумав
    function mineToMap2D(targetCoords) {
        //var calibrateBorderZ = canv.getBoundingClientRect().bottom;
        //console.log(`at scale ${scale}, ${calibrateBorderZ - spawnOnScreen.y}px = ${southBorderZ - spawnCoords.z} blocks`)
        // at scale 32, 80000px = 10000 blocks
        // відповідно at scale 1, 2500px = 10000 blocks
        // відповідно at scale 1, 0.25px = 1 block
        //                  vvvv
        var transformCoef = 0.25 * scale;
        return {
            x: (targetCoords[0] - spawnCoords.x) * transformCoef + spawnOnScreen.x,
            y: (targetCoords[1] - spawnCoords.z) * transformCoef + spawnOnScreen.y
        };
    }
    // обновляєм масштаб та позицію спавну
    function updateValues() {
        scale = parseFloat(scaleElem.style.transform.match(/scale\(([^)]+)\)/)[1]);
        var spawnBounds = translateElem.getBoundingClientRect();
        spawnOnScreen = {
            x: (spawnBounds.left + spawnBounds.right) / 2,
            y: (spawnBounds.top + spawnBounds.bottom) / 2
        };
        settings = {
            show: $('#daco_mapmenu_show').is(":checked"),
            labels: $('#daco_mapmenu_labels').is(":checked"),
            fill: $('#daco_mapmenu_fill').is(":checked")
        };
    }
    function updateDrawing() {
        updateValues();
        if ($.isEmptyObject(mapJSON)) {
            fetch("https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/GCMap.json")
                .then(r => r.json())
                .then(data => {
                    mapJSON = data;
                    //console.log(data);
                    for (let i = 0; i < mapJSON.polygons.length; i++) {
                        mapJSON.polygons[i].center = calculatePolygonCentroid(mapJSON.polygons[i].path);
                        //console.log(mapJSON.polygons[i].center);
                    }
                });
        } else {
            var context = canv.getContext("2d");
            context.clearRect(0, 0, canv.width, canv.height);
            context.lineWidth = 3;
            if (settings.show) {
                for (let p of mapJSON.polygons) {
                    var screenCoords = p.path.map(mineToMap2D);
                    context.fillStyle = `rgba(${p.color}, 0.5)`;
                    context.strokeStyle = `rgb(${p.color})`;
                    context.beginPath();
                    context.moveTo(screenCoords[0].x, screenCoords[0].y);
                    for (var i = 1; i < screenCoords.length; ++i) context.lineTo(screenCoords[i].x, screenCoords[i].y);
                    context.closePath();
                    if (settings.fill) context.fill();
                    context.stroke();
                    if (settings.labels) {
                        var centerScreenCoords = mineToMap2D(p.center);
                        context.font = "24px Arial";
                        context.textAlign = "center";
                        context.textBaseline = "middle";
                        context.fillStyle = "black";
                        context.fillText(p.name, centerScreenCoords.x, centerScreenCoords.y);
                    }
                }
            }
        }
    }
    updateDrawing();
}, 1000);
