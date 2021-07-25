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
    textBox.setAttribute("class", "notesClosable");
    textBox.setAttribute("style", "position:inline;width:200px;height:100px;");
    textBox.value = text;

    var closeButton = document.createElement("div");
    closeButton.innerHTML = "&#9660;"
    closeButton.setAttribute("id", "notesClose");

    var divBox = document.createElement("div");
    divBox.innerHTML = "<header class='notesClosable'>Notes:</header>";
    divBox.setAttribute("id", "playerNotesArea");
    divBox.prepend(closeButton);
    divBox.appendChild(textBox);

    var mapControls = document.querySelector("#map-controls-container");
    insertAfter(divBox, mapControls);

    textBox.addEventListener("change", function(event) {
        localStorage.setItem(key, textBox.value);
    });

    textBox.addEventListener("keydown", function(event) {
        event.stopPropagation();
    });

    var isOpen = true;
    closeButton.addEventListener("click", function(event) {
        if(isOpen) {
            var closableThings = document.getElementsByClassName("notesClosable");
            for (var i = 0; i < closableThings.length; i++) {
                closableThings[i].style.display = "none";
            }
            closeButton.innerHTML = "&#9650;"
            isOpen = false;
        } else {
            var closableThings = document.getElementsByClassName("notesClosable");
            for (var i = 0; i < closableThings.length; i++) {
                closableThings[i].style.display = "block";
            }
            closeButton.innerHTML = "&#9660;"
            isOpen = true;
        }
     });

    GM_addStyle(`
        .playerNotes {
            width: 90%
        }

        #playerNotesArea {
           position:fixed;
           bottom: 0px;
           right: 0px;
           border: 1px solid black;
        }

        #notesClose {
            position:absolute;
            right:0px;
            top: -20px;
            border: 1px solid black;
            background-color: white;
        }

        .notesClosable {
            display: block;
        }
    `);
})();

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
