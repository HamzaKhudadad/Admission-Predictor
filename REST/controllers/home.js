
module.exports = function(async, Uni, _, Users, Message){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
            router.post('/home', this.postHomePage);
            router.get('/logout', this.logout);
        },

        homePage: function(req, res){
            async.parallel([

                function(callback){
                  console.log("hello");
                    Uni.find({}, (err, result) => {
                        callback(err, result);
                        console.log(result+"1st function");
                    })
                },

                function(callback){

                    Uni.aggregate([{
                        $group: {
                            _id: "$country"
                        }
                    }], (err, newResult) => {
                       callback(err, newResult) ;
                       console.log(newResult+"Aggre");
                    });
                },

            ], (err, results) => {
                const res1 = results[0];
                const res2 = results[1];
 //divide into chunks of 3 to display on home homePage
                const dataChunk  = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }

                const countrySort = _.sortBy(res2, '_id');

                res.send( {title: 'StudentCenter - Home', user:req.user, chunks: dataChunk, country: countrySort});
            })
        },



        postHomePage: function(req, res){
            async.parallel([
                function(callback){
                    Uni.updateOne({
                        '_id':req.body.id,
                        'fans.username': {$ne: req.user.username}
                    }, {
                        $push: {fans: {
                            username: req.user.username,
                            email: req.user.email
                        }}
                      });
                    Users.updateOne( {
                        $push: {favUni: {
                            UniName: req.body.UniName,



                        }}
                    }, (err, count) => {
                        callback(err, count);
                    });


                    console.log(req.body.UniName);





                },
            ], (err, results) => {
              //  res.redirect('/home');
            });


        },


        logout: function(req, res){
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/');
            });
        }
    }
}
