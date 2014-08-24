var Task = (function(oTask) {
    var bDone = oTask.done,
        sText = oTask.text,
        nId = oTask.id,
        oRemoveBtn,
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
        oElement.addEventListener("mouseenter", hoverInEvent);
        oElement.addEventListener("mouseleave", hoverOutEvent);
        oTextContainer.addEventListener("dblclick", editEvent);

    }

    function checkboxEvent() {
        if(oCheckBox.checked) {
            oTextContainer.classList.add("done");
            bDone = true;
        } else {
            oTextContainer.classList.remove("done");
            bDone = false;
        }
        change();
    }

    function removeEvent() {
        oElement.parentNode.removeChild(oElement);
        change(true);
    }

    function hoverInEvent() {
        oRemoveBtn.classList.add("hover");
    }

    function hoverOutEvent() {
        oRemoveBtn.classList.remove("hover");
    }

    function editEvent() {
        oTextContainer.setAttribute("contenteditable", true);
        oTextContainer.focus();

        editEndEvent();
    }

    function editEndEvent() {
        oTextContainer.addEventListener('keypress', function(oEvent) {
            var sKey = oEvent.which || oEvent.keyCode;
            if(sKey === 13) { // 13 is enter
                editEnd();
            }
        });

        oTextContainer.addEventListener("blur", editEnd);
    }

    function editEnd() {
        oTextContainer.setAttribute("contenteditable", false);
        setText(oTextContainer.text);
    }

    function setText(sNewText) {
        sText = sNewText;
        change();
    }

    function change(bDelete) {
        console.log("Task changed");
    }

    init();
    return {
        getElement: function() {
            return oElement;
        }
    };
});