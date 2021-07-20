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
    textBox.value = text;

    var playerInfoArea = document.querySelector(".game-player-info");
    playerInfoArea.appendChild(textBox);

    textBox.addEventListener("change", function(event) {
        localStorage.setItem(key, textBox.value);
    });

})();
