var arff = require('node-arff');
var weka = require('node-weka');
const express = require('express');
var exec = require('child_process').exec;
var formidable = require('formidable');
var fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

})

app.post('/upload', (req, res) => {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./dataupload"
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err)
            res.status(200).send('Error on save file');
            throw err;
            return;
        }
        if (!files.filetoupload || !files.filetoupload.name) {
            res.status(404).send('File not found');
            return;
        }

        fs.rename(files.filetoupload.path, './dataupload/' + files.filetoupload.name, () => {
            /*
            // SMOer
            var command = 'java -classpath ./bin/weka.jar weka.Run weka.classifiers.timeseries.WekaForecaster -t ./dataupload/' +
                files.filetoupload.name + ' -prime 7 -F avg -horizon 3 -future';
            */

            // weka.classifiers.functions.LinearRegression -S 0 -R 1.0E-8 -num-decimal-places 4
            var command = 'java -classpath ./bin/weka.jar weka.Run weka.classifiers.timeseries.WekaForecaster -t ./dataupload/' +
                files.filetoupload.name + ' -prime 7 -F avg -horizon 3 -future -W "weka.classifiers.functions.LinearRegression -S 0 -R 1.0E-8 -num-decimal-places 4"';


            child = exec(command, function(error, stdout, stderr) {
                if (error) {
                    console.log(error)
                    res.send('Error');
                    return;
                }

                res.send('<pre>' + stdout + '</pre>');
                return;
            });
        });
        return;
        var oldpath = files.filetoupload.path;




    })



});



app.listen(3000, () => console.log('Example app listening on port 3000!'))