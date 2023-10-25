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
// @require      https://cdn.jsdelivr.net/npm/polybooljs@1.2.0/dist/polybool.min.js
// @require      https://raw.githubusercontent.com/dacoconutchemist/Tampermonke/main/-/-.js
// ==/UserScript==
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
var TSH=s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9};


setTimeout(()=>{
    'use strict';
    // основні значення
    var spawnCoords = {
        x: -4,
        z: -816
    };
    var southBorderZ = 9184;


    var mapJSON = {};
    var scaleCrutch = true;
    $(document.body).append('<canvas style="width:100%; height:100%; pointer-events:none; position: absolute; top: 0; left: 0;" id="daco_canvas"></canvas>');
    const $canv = $("#daco_canvas");
    const canv = $canv[0];
    setInterval(()=>{
        var bounds = canv.getBoundingClientRect();
        canv.setAttribute("width", bounds.width);
        canv.setAttribute("height", bounds.height);
        if (scaleCrutch) updateDrawing();
    }, 33);
    //PolyBool.epsilon(1);
    // scaleElem - якийсь leaflet-proxy leaflet-zoom-animated
    // translateElem - значок спавну
    var scaleElem = xpath('//*[@id="app"]/div[1]/div[1]/div[6]');
    var scaleAnimElem = xpath('//*[@id="app"]/div[1]/div[1]');
    var translateElem = xpath('//*[@id="app"]/div[1]/div[1]/div[10]/div');
    var rightClickMenu = xpath('//*[@id="map-context-menu"]/ul');
    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (scaleAnimElem.classList.contains('leaflet-zoom-anim')) {
                    scaleCrutch = false;
                } else {
                    scaleCrutch = true;
                }
            }
        }
    });

    observer.observe(scaleAnimElem, { attributes: true });
    /*var observer2 = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (translateElem.style.transform.includes('translate')) {
                    updateDrawing();
                    console.log(" triggered");
                }
            }
        }
    });
    observer2.observe(translateElem, { attributes: true });*/

    var newPolygonArray = [];
    $(rightClickMenu).prepend(`
        <li role="none"><button type="button" role="menuitem" id="daco_add">Додати точку</button></li>
        <li role="none"><button type="button" role="menuitem" id="daco_ctrlz">Відмінити останню точку</button></li>
    `);
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
                <div id="daco_generaloperations" hidden>
                    <div style="margin: 10px;"></div>
                    <button id="daco_clearregion">Очистити виділене</button>
                </div>
                <div id="daco_pointoperations" hidden>
                    <button id="daco_addpoint">Додати точку (WIP)</button>
                </div>
                <style>
                    #daco_regionoperations > button {
                        font-size: 12px;
                    }
                </style>
                <div id="daco_regionoperations" hidden>
                    <button id="daco_addregion">Додати виділений регіон</button>
                    <hr>
                    <button id="daco_union">Додати виділення до регіону:</button>
                    <button id="daco_cut">Відрізати виділення від регіону:</button>
                    <button id="daco_union_unoreversecard">Додати регіон до виділення:</button>
                    <button id="daco_cut_unoreversecard">Відрізати регіон від виділення:</button>
                    <select id="daco_regionlist"></select>
                </div>
            </fieldset>
        </div>
    </section>
    `);
    var coordsItem = xpath('//*[@id="map-context-menu"]/ul/li[3]/button');
    function updateMenu() {
        var region_op = $("#daco_regionoperations");
        var general_op = $("#daco_generaloperations");
        var point_op = $("#daco_pointoperations");
        var pointNum = newPolygonArray.length;
        if (pointNum == 0) {
            general_op.hide();
            region_op.hide();
            point_op.hide();
        }
        else if (pointNum == 1) {
            general_op.show();
            region_op.hide();
            point_op.show();
        }
        else if (pointNum == 2) {
            general_op.show();
            region_op.hide();
            point_op.hide();
        }
        else if (pointNum >= 3) {
            general_op.show();
            region_op.show();
            point_op.hide();
        }
    }
    function updateRegionList() {
        var childIDs = Array.from($("#daco_mapmenu").children()).map(e => e.id).filter(s => s.length > 0);
        for (let i of mapJSON.polygons) {
            var assumedID = `daco_polygonitem_${TSH(i.name)}`;
            if (!childIDs.includes(assumedID)) {
                $('#daco_regionlist').append(`<option id="${assumedID}">${i.name}</option>`);
            }
        }
    }
    function getSelectedRegionIndex() {
        var selectedID = $('#daco_regionlist').find(":selected")[0].id;
        for (let i = 0; i < mapJSON.polygons.length; i++) {
            if (selectedID == `daco_polygonitem_${TSH(mapJSON.polygons[i].name)}`) return i;
        }
    }
    $('#daco_add').on('click', () => {
        newPolygonArray.push(coordsItem.innerText.match(/-?\d+/g).map(Number));
        updateMenu();
    });
    $('#daco_ctrlz').on('click', () => {
        newPolygonArray.pop();
        updateMenu();
    });
    $('#daco_settings').on('click', ()=>{$('#daco_mapmenu').toggle();})
    $('#daco_addregion').on('click', ()=>{
        var name = prompt("Введіть ім'я регіону:");
        var existingnames = mapJSON.polygons.map(polygon => polygon.name);
        while (existingnames.includes(name)) name = prompt("Таке ім'я регіону вже існує. Введіть унікальне ім'я регіону:");
        if (!name) return 0;
        var color = prompt("Введіть колір в форматі \"r, g, b\":");
        while (!color.match(/\d+?,\s*\d+?,\s*\d+/)) color = prompt("Неправильно. Введіть колір в форматі \"r, g, b\":");
        if (!color) return 0;
        console.log(JSON.parse(JSON.stringify(newPolygonArray)));
        mapJSON.polygons.push({
            name: name,
            color: color,
            path: [JSON.parse(JSON.stringify(newPolygonArray))],
            center: calculatePolygonCentroid(newPolygonArray)
        });
        updateRegionList();
    });
    $('#daco_clearregion').on('click', ()=>{
        if (confirm("Точно очистити виділене? Відмінити не вийде")) {
            newPolygonArray = [];
            updateMenu();
        }
    });
    $('#daco_union_unoreversecard').on('click', () => {
        var polygon = mapJSON.polygons[getSelectedRegionIndex()].path;
        var union = PolyBool.union({ regions: polygon }, { regions: [newPolygonArray] }).regions;
        if (union.length > 1) {
            alert("Ця операція утворює декілька різних регіонів або дірки в регіоні, так нізя!");
            return 0;
        }
        newPolygonArray = union[0];
    });
    $('#daco_cut_unoreversecard').on('click', () => {
        var polygon = mapJSON.polygons[getSelectedRegionIndex()].path;
        var union = PolyBool.differenceRev({ regions: polygon }, { regions: [newPolygonArray] }).regions;
        if (union.length > 1) {
            alert("Ця операція утворює декілька різних регіонів або дірки в регіоні, так нізя!");
            return 0;
        }
        newPolygonArray = union[0];
    });
    // занулена спочатку хуня
    var scale = 0;
    var spawnOnScreen = {};
    var settings = {};
    // матеша яку я придумав
    function mineToMap2D(targetCoords) {
        //var calibrateBorderZ = canv.getBoundingClientRect().bottom;
        //console.log(`at scale ${scale}, ${calibrateBorderZ - spawnOnScreen.y}px = ${southBorderZ - spawnCoords.z} blocks`)
        // at scale 32, 80000.шосьтам px = 10000 blocks
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
        //console.log
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
                        mapJSON.polygons[i].center = calculatePolygonCentroid(mapJSON.polygons[i].path[0]);
                        //console.log(mapJSON.polygons[i].center);
                    }
                    updateRegionList();
                });//.catch(error => alert(error.message));
        } else {
            var screenCoords = [];
            var context = canv.getContext("2d");
            context.clearRect(0, 0, canv.width, canv.height);
            context.lineWidth = 3;
            if (settings.show) {
                for (let p of mapJSON.polygons) {
                    context.fillStyle = `rgba(${p.color}, 0.5)`;
                    context.strokeStyle = `rgb(${p.color})`;
                    for (let pp of p.path) {
                        screenCoords = pp.map(mineToMap2D);
                        context.beginPath();
                        context.moveTo(screenCoords[0].x, screenCoords[0].y);
                        for (var i = 1; i < screenCoords.length; ++i) context.lineTo(screenCoords[i].x, screenCoords[i].y);
                        context.closePath();
                        if (settings.fill) context.fill();
                        context.stroke();
                    }
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
            if (newPolygonArray.length > 1) {
                screenCoords = newPolygonArray.map(mineToMap2D);
                context.strokeStyle = `rgb(255, 0, 0)`;

                context.beginPath();
                context.moveTo(screenCoords[0].x, screenCoords[0].y);
                for (var j = 1; j < screenCoords.length; j++) context.lineTo(screenCoords[j].x, screenCoords[j].y);
                context.stroke();

                context.setLineDash([5, 5]);
                context.beginPath();
                context.moveTo(screenCoords[0].x, screenCoords[0].y);
                context.lineTo(screenCoords[screenCoords.length - 1].x, screenCoords[screenCoords.length - 1].y);
                context.stroke();
                context.setLineDash([]);
            } else if (newPolygonArray.length == 1) {
                screenCoords = mineToMap2D(newPolygonArray[0]);
                context.fillStyle = `rgb(255, 0, 0)`;
                context.beginPath();
                context.arc(screenCoords.x, screenCoords.y, 4.5, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }
    updateDrawing();
    //console.log(PolyBool);
}, 1000);
