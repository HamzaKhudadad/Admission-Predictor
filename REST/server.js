const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const {Users} = require('./helpers/UsersClass');
const {Global} = require('./helpers/Global');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');


const container = require('./container');

container.resolve(function(users, _, admin, home, group, results, profile, news, Prediction){

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/webproject', {useNewUrlParser: true});

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
    
        server.listen(process.env.PORT || 3000, function(){
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

       
        //Setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        group.SetRouting(router);
        results.SetRouting(router);
        profile.SetRouting(router);
        news.SetRouting(router);
        Prediction.SetRouting(router);

        app.use(cors());


        app.use(router);

        app.use(function(req, res){
            res.render('404');
        });
    }

    function ConfigureExpress(app){
        app.use(compression());
        app.use(helmet());

        require('./passport/passport-local');


        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(session({
            secret: 'thisissecretkey',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());


        app.locals._ = _;

    }

});
