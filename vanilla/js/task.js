var Task = (function(sNewText, nId) {
    var bDone = false,
        oRemoveBtn,
        sText = sNewText,
        oTextContainer,
        oCheckBox,
        oElement;

    function init() {
        createElements();
        addListeners();
    }

    function createElements() {
        // task container
        oElement = document.createElement("li");
        oElement.setAttribute("data-task-id", nId);
        // chcekbox
        oCheckBox = document.createElement("input");
        oCheckBox.type = "checkbox";
        oElement.appendChild(oCheckBox);
        // text container
        oTextContainer = document.createElement("div");
        oTextContainer.className = "text";
        oTextContainer.innerText = sText;
        oElement.appendChild(oTextContainer);
        // remove button
        oRemoveBtn = document.createElement("div");
        oRemoveBtn.className = "remove";
        oRemoveBtn.innerText = "X";
        oElement.appendChild(oRemoveBtn);
    }

    function addListeners() {
        oCheckBox.addEventListener("click", checkboxEvent);
        oRemoveBtn.addEventListener("click", removeEvent);
    }

    function checkboxEvent() {
        if(oCheckBox.checked) {
            oTextContainer.classList.add("done");
            bDone = true;
        } else {
            oTextContainer.classList.remove("done");
            bDone = false;
        }
    }

    function removeEvent() {
        oElement.parentNode.removeChild(oElement);
    }

    init();
    return {
        isDone: function() {
            return bDone;
        },
        getElement: function() {
            return oElement;
        }
    };
});