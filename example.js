var sequencer = require('./mo-sequencer');

var someObject, someValue;

// (~˘▾˘)~ mo-sequencer: ~~ - Call of async function; ~! - promise
sequencer((__o, __0) => { eval(__o)}, () => {
  someValue = ~~asyncMultiplier(1);
  someObject = {
    value1: ~~asyncMultiplier(10),
    value2: ~~asyncMultiplier(5)
  };
  console.log('(~˘▾˘)~ Result of mo-sequencer code:');
  console.log('someValue=' + someValue, someObject);
  console.log("Don't hesitate to play around with it! ☜(ﾟヮﾟ☜)");
});

function asyncMultiplier(number, callback) {
  setTimeout(function() {
    callback(null, number * 2);
  }, 1);
}