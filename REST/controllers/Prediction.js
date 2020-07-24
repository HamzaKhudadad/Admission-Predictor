module.exports = function(index){
    return {
        SetRouting: function(router){
            router.get('/UniversityAcceptence', this.getData);
            router.post('/UniversityAcceptence', this.getPrediction);
        },

        getData: function(req, res){
            res.render('UniAcceptence', {title: 'StudentCenter - Latest News', user: req.user});
        },

        getPrediction: function(req, res){
          console.log(req.body);

              index.call(req.body,res);


           }


    }
}
