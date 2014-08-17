var ToDoApp = (function() {

    var nTaskId = 0,
        oTaskInput = document.getElementById("newTaskText"),
        oTaskList = document.getElementById("taskList");

    function init() {
        addListeners();
    }

    function addListeners() {
        oTaskInput.addEventListener('keypress', function(oEvent) {
            var sKey = oEvent.which || oEvent.keyCode;
            if(sKey === 13) { // 13 is enter
                addTask();
            }
        })
    }

    function addTask() {
        var sText = oTaskInput.value,
            oTask;
        if(sText === "") {
            return;
        }
        oTask = new Task(sText, nTaskId++);
        oTaskList.appendChild(oTask.getElement());
        oTaskInput.value = "";
    }

    // init app
    init();
});

// start app
ToDoApp();