// Import required modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// MongoDB connection URL
const mongourl = 'mongodb://localhost:27017/healthtracker';

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Create a MongoDB session store
const store = new MongoDBStore({
    uri: mongourl,
    collection: 'sessions'
});

// Import route handlers
const indexRoute = require('./routes/index');
const registerRoute = require('./routes/register');
const forgotPasswordRoute = require('./routes/forgotPassword');
const securityQuestionRoute = require('./routes/securityQuestion');
const resetPasswordRoute = require('./routes/resetPassword');
const resetSuccessRoute = require('./routes/resetSuccess');
const tablesRoute = require('./routes/tables');
const dataRoute = require('./routes/data');

// Set up view engine and layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// Set up session management
app.use(session({
    secret: 'bao123456789',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Set up flash messaging
app.use(flash());

// Set up routes
app.use('/index', indexRoute);
app.use('/register', registerRoute);
app.use('/tables', tablesRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/securityQuestion', securityQuestionRoute);
app.use('/resetPassword', resetPasswordRoute);
app.use('/resetSuccess', resetSuccessRoute);
app.use('/data', dataRoute);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));

// Connect to MongoDB
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection success");
}).catch(err => {
    console.error('ERROR CRASHING', err);
});

// Start the Express server
const server = app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
