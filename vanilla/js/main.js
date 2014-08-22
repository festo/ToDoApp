var ToDoApp = (function() {

    var nTaskId = 0,
        oTaskInput = document.getElementById("newTaskText"),
        oTaskList = document.getElementById("taskList");

    function init() {
        addListeners();
        addFirstTask();
    }

    function addListeners() {
        oTaskInput.addEventListener('keypress', function(oEvent) {
            var sKey = oEvent.which || oEvent.keyCode;
            if(sKey === 13) { // 13 is enter
                addTask();
            }
        });
    }

    function addTask(sTextParam) {
        var sText = sTextParam || oTaskInput.value,
            oTask;
        if(sText === "") {
            return;
        }
        oTask = new Task(sText, nTaskId++);
        oTaskList.appendChild(oTask.getElement());
        oTaskInput.value = "";
    }

    function addFirstTask() {
        addTask("First task");
    }

    // init app
    init();
});

// start app
ToDoApp();