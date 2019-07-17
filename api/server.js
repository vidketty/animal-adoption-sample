const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/images/')
  },
  filename: function (req, file, cb) {
    const { id } = req.params;
    const { originalname } = file;
    const splitedFileName = originalname.split('.');
    const name = `${id}.${splitedFileName[splitedFileName.length - 1]}`;
    cb(null, name);
  }
})

const upload = multer({ storage: storage })

// init the project.
const init = require('./init');

// create admin user if not exist.
init();

// connect with database.
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Cannot connect to the database' + err) }
);


const animalRoute = require('./routes/animal.route');
const authRoute = require('./routes/auth.route');
const authCheckMiddleware = require('./midlewares/auth-check');
const uploadAvatar = require('./routes/upload-avatar');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/animal-adoption')));
app.use(express.static(path.join(__dirname, 'uploads')));

// added routes
app.use('/api/animal', authCheckMiddleware, animalRoute);
app.post('/api/animal/upload-avtar/:id', upload.single('avatar'), uploadAvatar);

app.use('/auth', authRoute);
app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/animal-adoption', 'index.html'))
});

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});