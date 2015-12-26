var async = require('async');

sequencer(function() {
    console.log('Square of 3', ~~someAsyncFunction(3).square);
    console.log('Just a line');
    console.log('Now square of 9', ~~someAsyncFunction(9).square);
});


function someAsyncFunction(number, done) {
    setTimeout(() => {
        done(null, { square: number * number });
    }, 100)
}


// Library prototype:

function sequencer(func) {
    var source = func.toString();
    // remove new lines to make work with regexp easy:
    source = source.replace(/\n/gm, '');
    // extract root function body:
    source = /{(.*)}/g.exec(source)[1];
    // break to lines:
    var lines = source.match(/([^;]*);/g);
    
    var asyncSignature = /(~~\w*\([^)]*\))/g;

    async.mapSeries(
        lines, 
        function (line, done) {
            // get async functions signatures:
            var asyncFunctions = asyncSignature.exec(line);
            if (!asyncFunctions) {
                return runLine(line, [], done);
            }
            
            asyncFunctions.shift();
            async.map(asyncFunctions, runAsyncFunction, function (err, results) {
                if (err) return console.error(err);
                runLine(line, results, done);
            });
        },
        function (err, results) {
            if (err) return console.error(err);
            
            //console.log(results);
        }
    );

    function runAsyncFunction(asyncFunction, __callback) {
        // inject callback processor:
        asyncFunction = asyncFunction.replace(/\)$/, ', __callback)');
        eval(asyncFunction);
    }

    function runLine(__line, __results, __done) {
        var i = 0;
        __line = __line.replace(asyncSignature, function () {
            return '__results['+(i++)+']';
        });
        eval(__line);
        __done();
    }
    
}