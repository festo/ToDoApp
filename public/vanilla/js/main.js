var ToDoApp = (function() {

    var oTaskInput = document.getElementById("newTaskText"),
        oTaskList = document.getElementById("taskList");

    function init() {
        addListeners();
        getTasksFromServer();
    }

    function addListeners() {
        oTaskInput.addEventListener('keypress', function(oEvent) {
            var sKey = oEvent.which || oEvent.keyCode;
            if(sKey === 13) { // 13 is enter
                addTask();
            }
        });
    }

    function addTask() {
        var sText = oTaskInput.value;
        if(sText === "") {
            return;
        }
        oServer.addTask(sText, function(oTask){
            insertTask(new Task(oTask));
        });
    }

    function insertTask(oTask) {
        oTaskList.appendChild(oTask.getElement());
        oTaskInput.value = "";
    }

    function getTasksFromServer() {
        oServer.getTasks(function(oData, oError){
            if(oError !== undefined) {
                console.log(oError);
                return;
            }
            oData.tasks.forEach(function(oTask){
                insertTask(new Task(oTask));
            });
        })
    }

    // init app
    init();
});

// start app
ToDoApp();