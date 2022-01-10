// ==UserScript==
// @name         GC Map Name Replacer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  трольна фігня з мапою ГК яка дозволяє міняти ім'я і аву людини на мапі
// @author       dacoconutchemist
// @match        https://maps-main.gummercraft.fun/
// @icon         https://www.google.com/s2/favicons?domain=gummercraft.fun
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// ==/UserScript==

// функція яка по xpath бере елемент, не використовується але вдруг пригодиться
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// головна функція
setTimeout(function() {
    'use strict';
    // функція щоб додавати пункт в меню правої кнопки
    function addRightButton(fnc, text){
        var target = document.getElementsByClassName("menu")[0]; // берем меню правої кнопки
        var guibtnhold = document.createElement("li"); // робим там новий пункт
        var guibtn = document.createElement("button"); // робим в ньому кнопку
        guibtn.innerHTML = text; // даєм їй текст
        guibtn.type = "button"; // не знаю що саме це робить але так кнопка нормально відображається, походу фігня з css якась
        guibtnhold.appendChild(guibtn); // додаєм кнопку в пункт
        target.appendChild(guibtnhold); // додаєм пункт в меню
        guibtn.addEventListener("click", fnc, false); // робим щоб дана функція викликалась при натиску
        return guibtn
    }
    function findPlayerIndex(username){ // функція яка знаходить гравця по імені в списку гравців
        var playerpane = document.getElementsByClassName("leaflet-players-pane")[0]; // берем елемент з списком гравців
        var children = playerpane.children; // берем елементи списка гравців
        for (var i = 0; i < children.length; i++) { // ітеруєм по ним
            var playerelem = children[i];
            if (playerelem.children[1].children[0].innerHTML == username){ // робим провірку чи саме це той гравець
                return i; // повертаєм індекс
            }
        }
        return -1; // інакше повертаєм -1
    }
    addRightButton(function (event){
        // функція яка буде питати що міняти і саме безпосередньо міняти
        // берем ніки
        var username = prompt("Введи нік гравця якого треба замінити");
        var replaceto = prompt("Введи нік гравця на якого треба замінити " + username);

        // шукаєм гравця в списку
        var indx = findPlayerIndex(username);
        if (indx == -1) { // якщо нема гравця з вказаним ніком то попереджуєм і закінчуєм
            alert("Гравця з ніком " + username + " не знайдено");
            return 1;
        }
        var playerpane = document.getElementsByClassName("leaflet-players-pane")[0]; // берем елемент з списком гравців
        var playerelem = playerpane.children[indx]; // берем гравця
        if (confirm('Змінювати зображення?')) playerelem.children[0].src = "https://maps-main.gummercraft.fun/tiles/faces/32x32/" + replaceto + ".png"; // міняєм зображення
        if (confirm('Змінювати нік?')) playerelem.children[1].children[0].innerHTML = replaceto; // міняєм нік
    }, "[MOD] Замінити гравця");
    addRightButton(function (event){
        // функція яка буде питати що міняти і саме безпосередньо міняти
        // берем ніки
        var username = prompt("Введи нік гравця у якого треба замінити зображення");
        var replaceto = prompt("Введи посилання на зображення на яке треба замінити " + username);

        // шукаєм гравця в списку
        var indx = findPlayerIndex(username);
        if (indx == -1) { // якщо нема гравця з вказаним ніком то попереджуєм і закінчуєм
            alert("Гравця з ніком " + username + " не знайдено");
            return 1;
        }
        var playerpane = document.getElementsByClassName("leaflet-players-pane")[0]; // берем елемент з списком гравців
        var playerelem = playerpane.children[indx]; // берем гравця
        playerelem.children[0].src = replaceto; // міняєм зображення
    }, "[MOD] Змінити зображення");
}, 300); // чекаєм 300 мс щоб загрузилася мапа і не вибило помилку
