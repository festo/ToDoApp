var _ = require('underscore'),
    lastId = 1, // starter index
    aTasks = [
        {
            "id": 1,
            "done": false,
            "text": "Do the trial work"
        }
    ];


exports.findAll = function (req, res) {
    res.json({ tasks: aTasks });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    for (var i = 0; i < aTasks.length; i++) {
        if (aTasks[i].id == id) {
            res.json(aTasks[i]);
            return;
        }
    }
    res.json({});
};

exports.addTask = function (req, res) {
    var sText = req.body.text,
        oTask = {id: 0, done: false, text: ""};

    console.log("Adding new task");
    if (!_.isEmpty(sText)) {
        oTask.id = ++lastId;
        oTask.text = sText;
        aTasks.push(oTask);
        res.json(oTask);
        console.log("Succes: " + JSON.stringify(oTask));
    } else {
        res.send({ error: "Can not create task with text:" + sText});
        console.log("Can not create task with text:" + sText);
    }

};

exports.updateTask = function (req, res) {
    var id = req.params.id,
        sText = req.body.text,
        bDone = req.body.done,
        nTaskId = null;

    console.log("Update task: " + id);

    for (var i = 0; i < aTasks.length; i++) {
        if (aTasks[i].id == id) {
            nTaskId = i;
        }
    }

    if (_.isNull(nTaskId)) {
        console.log("There is no task with id: " + id);
        res.send({ error: "There is no task with id: " + id});
    }

    if (!_.isEmpty(sText)) {
        aTasks[nTaskId].text = sText;
    }

    if (!_.isEmpty(bDone)) {
        if (bDone === "true") {
            aTasks[nTaskId].done = true;
        } else {
            aTasks[nTaskId].done = false;
        }
    }

    res.json(aTasks[nTaskId]);

};

exports.deleteTask = function (req, res) {
    var id = req.params.id,
        nIndex = -1;

    for (var i = 0; i < aTasks.length; i++) {
        if (aTasks[i].id == id) {
            nIndex = i;
        }
    }

    if (nIndex != -1) {
        console.log('Task ' + JSON.stringify(aTasks[nIndex]) + ' deleted');
        aTasks = _.without(aTasks, aTasks[nIndex]);
        res.json({});
    } else {
        res.send({ error: "There is no task with id: " + id});
        console.log('There is no task with id: ' + id);
    }
};