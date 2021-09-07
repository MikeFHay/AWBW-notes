// ==UserScript==
// @name         AWBW Notepad
// @namespace    https://github.com/MikeFHay/
// @version      0.8
// @description  Adds per-game notes to Advance Wars By Web
// @author       https://github.com/MikeFHay
// @match        https://awbw.amarriner.com/2030.php?games_id=*
// @match        https://awbw.amarriner.com/moveplanner.php?*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    if(!gameId) {
        return;
    }

    $("head").append (
        '<link href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" '
      + 'rel="stylesheet" type="text/css">'
    );

    'use strict';
    const key = "notes_" + gameId;
    var text = localStorage.getItem(key) || "";

    var initialWidth = localStorage.getItem("notes_size_w") || 200;
    var initialHeight = localStorage.getItem("notes_size_h") || 100;

    var textBox = document.createElement("textarea");
    textBox.setAttribute("id", "notesTextArea");
    textBox.setAttribute("class", "notesClosable");
    textBox.setAttribute("style", "position:inline;width:" + initialWidth + "px;height:" + initialHeight + "px;");
    textBox.value = text;

    var closeButton = document.createElement("div");
    closeButton.innerHTML = "&#9660;"
    closeButton.setAttribute("id", "notesClose");

    var divBox = document.createElement("div");
    divBox.innerHTML = "<span class='notesAbs'>&#8689</span><header class='notesClosable'>Notes:</header>";
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

    $("#notesTextArea").resizable({
        handles: "nw",
        stop: function(event, ui) {
            localStorage.setItem("notes_size_w", ui.size.width);
            localStorage.setItem("notes_size_h", ui.size.height);
        }
    });
    $("#notesTextArea").parent().addClass("notesClosable"); //Make the 'parent' resizing div disappear on click too.
    $("#notesTextArea").parent()[0].style.position = null; //HACK: Move the resizable() handle to the top-left, ignoring header.

    var isOpen = true;
    closeButton.addEventListener("click", function(event) {
        if(isOpen) {
            $(".notesClosable").css("display", "none");
            closeButton.innerHTML = "&#9650;"
            isOpen = false;
        } else {
            $(".notesClosable").css("display", "block");
            closeButton.innerHTML = "&#9660;"
            isOpen = true;
        }
     });

    window.addEventListener('storage', () => {
        var text = localStorage.getItem(key) || "";
        textBox.value = text;
    });

    GM_addStyle(`
        #playerNotesArea {
           position: fixed;
           bottom: 0px;
           right: 0px;
           border: 1px solid black;
           background-color: white;
           z-index: 800;
        }

        #notesClose {
            position: absolute;
            right: 0px;
            top: -20px;
            border: 1px solid black;
            background-color: white;
        }

        #notesTextArea {
            resize: none;
        }

        .notesClosable {
            display: block;
        }

        .notesAbs {
            position: absolute;
            top: -5px;
            left: -1px;
        }

        .ui-resizable-handle {
            width: 20px;
            height: 20px;
        }
    `);
})();

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
