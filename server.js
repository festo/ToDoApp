var express = require('express');
var tasks = require('./routes/tasks');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(process.cwd() + '/public'));

router.get('/tasks', tasks.findAll);
router.get('/tasks/:id', tasks.findById);
router.post('/tasks', tasks.addTask);
router.put('/tasks/:id', tasks.updateTask);
router.delete('/tasks/:id', tasks.deleteTask);

app.use('/api', router);
app.listen(port);
console.log('Server listening on port: ' + port);