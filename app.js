var express = require('express');
var fs = require('fs');
var Q = require('q');
var cons = require('consolidate');
var path = require('path');
var app = express();
var markdown = require("markdown").markdown;

var appRoot = process.cwd();
app.engine('handlebars', cons.handlebars);
app.use('/static', express.static(appRoot + '/public'));
app.set('view engine', '.handlebars');
app.set('views', appRoot + '/views');

app.get('/', function(req, res) {
    getModules().then(function(data) {
        console.log(data);
        res.render('index.handlebars', { title: '第三方资源平台', data: data });
    });
});
app.get('/:name', function(req, res) {
    fs.readFile(path.join('dist', 'HISTORY.' + req.params.name + '.md'), function(err, data) {
        if (err) {
            console.log(err);
            return ;
        }
        res.send(markdown.toHTML(data.toString()));
    });
});
function getModules() {
    var deferred = Q.defer();
    var fileArr = [];
    fs.readdir('dist/', function(err, files) {
        if (err) {
            console.log(err);
            deferred.reject(err);
            return;
        }
        files.forEach(function(file) {
            fileArr.push(file.split('.')[1]);
        });
        deferred.resolve(fileArr);
    });
    return deferred.promise;
}
app.listen(3333);
