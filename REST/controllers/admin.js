const path = require('path');
const fs = require('fs');

module.exports = function(formidable, Uni){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile',  this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },

        adminPage: function(req, res){
            res.render('admin/dashboard');
        },

        adminPostPage: function(req, res){
            const newUni = new Uni();
            newUni.name = req.body.Uni;
            newUni.country = req.body.country;
            newUni.image = req.body.upload;
            newUni.save((err) => {
                res.render('admin/dashboard');
            })
        },

        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname,'../public/files');

            form.on('file',(field, file) => {
              fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
              if(err) throw err;
              console.log("renamed");
            })
          })

            form.on('error', (err) => {
            });

            form.on('end', () => {
              console.log("success");

            });

            form.parse(req);
        }
    }
}
