/*!
 * mo-sequencer ☜(ﾟヮﾟ☜)
 * https://github.com/garmoshka-mo/mo-sequencer
 *
 * Copyright 2015 garmoshka-mo
 * Released under the MIT license
 */
module.exports = sequencer;

var async = require('async');

// (°ロ°)☝
// Function inside [sequencer] parsed as a string.
// All function calls prefixed with ~~ and ~! are executed first,
// and substituted by resulting value. Prefix types:
//   ~~ for traditional callback(err, result)
//   ~! for promises

function sequencer(executor, func) {
  var raiseRejection, lastError;

  var source = func.toString();
  // remove new lines to make work with regexp easy:
  source = source.replace(/\n/gm, '');
  // extract root function body:
  source = /{(.*)}/g.exec(source)[1];
  // break to lines:
  var lines = source.match(/([^;]*);/g);

  var asyncSignature = /(~[~!][\w\.]*\([^)]*\))/g;
  var paramsSignature = /~[~!][\w\.]*\(([^)]*)\)/;

  async.mapSeries(lines, processLine, processError);

  function processLine(line, done) {
    // get async functions signatures:
    var asyncFunctions = line.match(asyncSignature);

    if (!asyncFunctions)
      return runSyncLine(line, [], done);

    asyncFunctions = asyncFunctions.map(function (func) {
      // inject callback processor - __0 used for callback

      if (func.substring(0,2) == '~~') {
        // standard callback:
        var params = paramsSignature.exec(func.trim());
        if (params[1].trim().length > 0 )
          return func.replace(/\)$/, ', __0)');
        else
          return func.replace(/\)$/, '__0)');
      } else {
        // promises:
        return func + '.then(__0.bind(null, null), __0)';
      }
    });

    async.map(asyncFunctions, runAsyncFunction, function (err, results) {
      if (processError(err)) return;
      runSyncLine(line, results, done);
    });
  }

  function processError(err) {
    if (err) {
      if (raiseRejection) raiseRejection(err);
      else {
        console.error('sequencer ERROR:', err);
        lastError = err;
      }
      return true;
    }
  }

  function runAsyncFunction(asyncFunction, callback) {
    execute(asyncFunction, callback);
  }

  function runSyncLine(line, results, done) {
    var i = 0;
    line = line.replace(asyncSignature, function () {
        return '__0['+(i++)+']';
    });
    execute(line, results);
    done();
  }

  function execute(line, param) {
    try {
      executor(line, param);
    } catch(e) {
      e.message = '(ノಠ益ಠ)ノ彡┻━┻ ' + e + '; sequencer line: ' + line;
      throw(e)
    }
  }

  return {
    catch: function (callback) {
      raiseRejection = callback;
      if (lastError) callback(lastError);
    }
  };

}

