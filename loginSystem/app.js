const express       = require('express');
const session       = require('express-session');
const hbs           = require('express-handlebars');
const mongoose      = require('mongoose');
const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const app           = express();


//? Conexion a la base de datos
try {
  mongoose.connect('mongodb+srv://eduardor9:W0DqlDCnIzUvQWyu@datosdb.vd8qp1i.mongodb.net/datosDB', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});    
  console.log('Conectado a la base de datos');
} catch (error) {
  console.log(error);
  throw new Error('Error al iniciar la BD revisar el backend');
}

//? Modelos
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

//? Middlewares
app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'secretos',
	resave: false,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//? Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err);
    });
});

passport.use(new localStrategy(async function (username, password, done) {
  try {
    const user = await User.findOne({username: username});
    if (!user) return done(null, false, {message: 'Usuario incorrecto.'});
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return done(null, false, {message: 'Password incorrecto.'});
    return done(null, user);

  } catch (err) {
    return done(err);
  }
}));


//? Funciones
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}

//? Rutas
app.get('/', isLoggedIn, (req, res) => {
	res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
	res.render("index", { title: "About" });
});

app.get('/login', isLoggedOut, (req, res) => {

	const response = {
		title: 'Login',
		error: req.query.error
	};

	res.render('login', response);
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}))


app.get('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    return res.redirect('/');
  });
});


//? Configura la cuenta de administrador
app.get('/setup', async (req, res) => {
	const exists = await User.exists({username: 'admin'});

	if (exists) {
		res.redirect('/login');
		return;
	}

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash('pass', salt, function (err, hash) {
			if (err) return next(err);
			const newAdmin = new User({
				username: 'admin',
				password: hash
			});		
			newAdmin.save();
			res.redirect('/login');
		});
	});

});

//? Puerto donde se ejecuta el servidor
app.listen(3000, () => {
	console.log("Listening on port 3000");
});