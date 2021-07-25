// ==UserScript==
// @name         AWBW Notepad
// @namespace    https://github.com/MikeFHay/
// @version      0.1
// @description  Adds per-game notes to Advance Wars By Web
// @author       https://github.com/MikeFHay
// @match        https://awbw.amarriner.com/2030.php?games_id=*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const key = "notes_" + gameId;
    var text = localStorage.getItem(key) || "";

    var textBox = document.createElement("textarea");
    textBox.setAttribute("class", "playerNotes");
    textBox.setAttribute("style", "width:200px;height:100px;");
    textBox.value = text;

    var divBox = document.createElement("div");
    divBox.setAttribute("id", "playerNotesArea");
    divBox.setAttribute("style", "position:fixed;bottom:0px;right:0px;");
    divBox.appendChild(textBox)

    var mapControls = document.querySelector("#map-controls-container");
    insertAfter(divBox, mapControls);

    textBox.addEventListener("change", function(event) {
        localStorage.setItem(key, textBox.value);
    });
    
    textBox.addEventListener("keydown", function(event) {
        event.stopPropagation();
    });

})();

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
