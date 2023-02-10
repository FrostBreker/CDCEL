require('dotenv').config({path: './config/.env'});
const app = require('express')();

const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const userRoutes = require('./routes/user.routes');
const cdcRoutes = require('./routes/cdc.routes');

const corsOptions = {
	origin: [
		`${process.env.CLIENT_URL}`,
		'http://localhost:3000',
		'http://192.168.1.30:3000',
	],
	credentials: true,
	allowedHeaders: [
		'sessionId',
		'Content-Type',
		'Authorization',
		'authorization',
		'baggage',
		'sentry-trace',
	],
	exposedHeaders: [ 'sessionId' ],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
};
app.use(cors(corsOptions));
db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/cdc', cdcRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server started http://localhost:${process.env.PORT}`);
});

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({tracing: true}),
		// enable Express.js middleware tracing
		new Tracing.Integrations.Express({app}),
	],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next){
	// The error id is attached to `res.sentry` to be returned
	// and optionally displayed to the user for support.
	res.statusCode = 500;
	res.end(res.sentry + '\n');
});

//Check error
process.on('exit', (code) => {
	console.log(
		`${new Date(Date.now())
			.toLocaleString('fr-FR', {
				timeZone: 'Europe/Paris',
			})
			.toString()} --> Le processus s'est arrêté avec le code: ${code}!`,
	);
});
process.on('uncaughtException', (err, origin) => {
	console.log(
		`${new Date(Date.now())
			.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'})
			.toString()} --> [uncaughtException] ${err}\n------------------------------------------\n${origin}\n------------------------------------------`,
	);
});
process.on('unhandledRejection', (reason, promise) => {
	console.log(
		`${new Date(Date.now())
			.toLocaleString('fr-FR', {timeZone: 'Europe/Paris'})
			.toString()} --> [UNHANDLED_REJECTION] ${reason}\n------------------------------------------\n${promise}\n------------------------------------------`,
	);
	console.log(promise);
});
process.on('warning', (...args) => {
	console.log(
		`${new Date(Date.now())
			.toLocaleString('fr-FR', {
				timeZone: 'Europe/Paris',
			})
			.toString()} --> [WARNING]\n------------------------------------------\n`,
		...args,
	);
});
