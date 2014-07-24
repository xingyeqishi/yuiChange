var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var Q = require('q');
var fse = require('fs.extra');
var conf = require('config.json');
var yuiPath = path.resolve(cwd, conf.yuiPath);
fs.readdir(yuiPath, function(error, files) {
    files.forEach(function(item) {
        var filePath = path.join(yuiPath, item);
        fs.readFile(filePath, null, function(err, data) {
            var strData;
            if (err) {
                console.error(err);
                return;
            }
            strData = data.toString();
            strData = strData.substring(0, strData.indexOf(conf.oldVersion) + 6); 
            var len = strData.split('No changes').length - 1;
            if (len < 7) {
                fse.copy(filePath, path.join('./dist',item), function(err) {
                    if (err) {
                        throw err;
                    }
                });
            }

        });
    });
});
function rmDist() {
    var deferred = Q.defer();
    fse.rmrf('/dist', function(err) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve(true);
    });
    return deferred.promise;
}
function createDist() {
    var deferred = Q.defer();
    fs.mkdir('/dist', null, function(err){
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve(true);
    });
    return deferred.promise;
}
function deleteFiles() {
    fs.readdir('./', function(err, files) {
        files.forEach(function(item) {
            var filePath = path.join('./', item);
            fs.stat(filePath, function(err, stat) {
                if (err) {
                    return;
                }
                if (stat.isFile()) {
                    if (item.indexOf('HISTORY') != -1) {
                        console.log(filePath);
                        fs.unlink(filePath, function(err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log('删除成功');
                        });
                    }
                }
            });

        });
    });
}
