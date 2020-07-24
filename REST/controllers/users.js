'use strict';

module.exports = function(_, passport, User, validator){

    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);




            // router.post('/', User.LoginValidation, this.postLogin);
            router.post('/', [
                validator.check('email').not().isEmpty().isEmail()
                    .withMessage('Email is invalid'),
                validator.check('password').not().isEmpty()
                    .withMessage('Password is required and must be at least 5 characters.'),
            ], this.postValidation,this.postLogin, function(req,res,next){
              console.log(req.user);
              console.log("done");
              res.send({es:"Exist",user:req.user});

            });
            // router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.post('/signup', [
                validator.check('username').not().isEmpty().withMessage('Username is required '),
                validator.check('email').not().isEmpty().isEmail()
                    .withMessage('Email is invalid'),
                validator.check('password').not().isEmpty()
                    .withMessage('Password is required and must be at least 5 characters.'),
            ], this.postValidation, this.postSignUp);
        },

        indexPage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'StudentCenter | Login', messages: errors, hasErrors: errors.length > 0});
        },

        postLogin: passport.authenticate('local.login',
       {} ),

        getSignUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'StudentCenter | SignUp', messages: errors, hasErrors: errors.length > 0});
        },

        postValidation: function(req, res, next) {
            const err = validator.validationResult(req);
            const reqErrors = err.array();
            const errors = reqErrors.filter(e => e.msg !== 'Invalid value');
            let messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            // req.flash('error', messages);
            if (messages.length > 0) {
                req.flash('error', messages);
                if (req.url === '/signup') {
                    res.redirect('/signup');
                } else if(req.url === '/') {
                    res.redirect('/');
                }
            }
            return next();
        },

        postSignUp: passport.authenticate('local.signup', {

        }),








    }

}
