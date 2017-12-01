var arff = require('node-arff');
var weka = require('node-weka');
const express = require('express');
var exec = require('child_process').exec;
var formidable = require('formidable');
var fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

});

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

        var content = fs.readFileSync(files.filetoupload.path, "utf8");


        var lines = content.split("\n");
        var totalLine = lines.length;
        var dataToFile = [];
        var lastValue = '';
        lines.forEach((line, index) => {
            if (index <= 1) {
                return;
            }

            var values = line.split(/,/g);
            if (!values[0] || !values[0].trim()) {
                return;
            }
            var stt = totalLine - index;
            var value = values[9];
            if (value) {
                lastValue = value.trim();
            } else {
                value = lastValue;
            }
            dataToFile.push(stt + ',' + value);
        })
        dataToFile = dataToFile.reverse();

        // generate arff file

        var textContent = "@relation dataconsume\n\n";
        textContent += "@attribute STT numeric\n";
        textContent += "@attribute avg numeric\n";
        textContent += "\n";
        textContent += "@data\n";
        textContent += dataToFile.join("\n");

        fs.writeFileSync('./data/dataconsume.arff', textContent, "utf8");


        // SMOer
        var command = 'java -classpath ./bin/weka.jar weka.Run weka.classifiers.timeseries.WekaForecaster ' +
            '-t ./data/dataconsume.arff -prime 5 -F avg -horizon 3 -future';

        /*
        var command = 'java -classpath ./bin/weka.jar weka.Run weka.classifiers.timeseries.WekaForecaster -t ./data/dataconsume.arff -prime 5 -F avg -horizon 3 -future -W "GaussianProcesses -L 1.0 -N 0 -K \"weka.classifiers.functions.supportVector.PolyKernel -E 1.0 -C 250007\" -S 1"';
        */
        // weka.classifiers.functions.LinearRegression -S 0 -R 1.0E-8 -num-decimal-places 4
        /*var command = 'java -classpath ./bin/weka.jar weka.Run weka.classifiers.timeseries.WekaForecaster -t ./data/dataconsume.arff' +
            ' -prime 5 -F avg -horizon 3 -future -W "weka.classifiers.functions.LinearRegression -S 0 -R 1.0E-8 -num-decimal-places 4"';*/


        child = exec(command, function(error, stdout, stderr) {
            if (error) {
                console.log(error);
                fs.unlinkSync(files.filetoupload.path);
                res.send('Error');
                return;
            }
            fs.unlinkSync(files.filetoupload.path);
            if(stdout){
                res.send('<pre>' + stdout + '</pre>');
            } else {
                res.send('<pre>' + stderr + '</pre>');
            }

            return;
        });

        return;
    })
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))