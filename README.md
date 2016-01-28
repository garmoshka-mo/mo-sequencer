# (~˘▾˘)~ mo-sequencer

Library for javascript which allows to write **inline** async calls

Comparison to `async` style:

![Comparison to async](https://cloud.githubusercontent.com/assets/2452269/12379888/a3ba947e-bd6c-11e5-9c29-7c86e7639aaf.jpg)

## How it works

Function inside `sequencer` parsed as a string.
All function calls prefixed with `~~` and `~!` are executed first,
and substituted by resulting value. Prefix types are:
* `~~` for traditional callback(err, result)
* `~!` for promises

## Install

```
npm i mo-sequencer --save
```
or for client-side projects:
```
bower i async --save
bower i mo-sequencer --save

<script type="text/javascript" src="/bower_components/async/dist/async.js"></script>
<script type="text/javascript" src="/bower_components/mo-sequencer/mo-sequencer.js"></script>
```

## Copy-paste template

Please, copy comment when use sequencer, because `~~` and `~!` - it's new "coordinate system" which may confuse your colleagues.

```js
    var sequencer = require('mo-sequencer');

    // (~˘▾˘)~ mo-sequencer: ~~ is call of async function; ~! is call of promise
    sequencer((__o, __0) => { eval(__o)}, () => {
        
    });
```

## Explanation

Let's see explanation of what happens on example:

![Explanation](https://cloud.githubusercontent.com/assets/2452269/12378921/fb44610a-bd55-11e5-9db3-1b9574d73aa3.png)


## Test on your machine

Download repo and check if `example.js` looks cool in your favorite IDE.
```
git clone https://github.com/mojects/mo-sequencer.git
cd mo-sequencer
npm i
node example.js
```

## Current implementation - is prototype

Examples above work well on node and browser.
Though there is list of limitations ([see how to facilitate for their elimination](https://github.com/mojects/mo-sequencer/wiki/Contribution-guide))
In current prototype following is **not** supported:
- Not supported: declarations of `var`. (need to declare outside of sequencer, like in [Explanation example](https://github.com/mojects/mo-sequencer#explanation))
- Not supported: sub-functions in body of sequencer
- Not supported: async call inside of another async call (as argument)
- Not supported: if-conditions/switches/loops

## Contribution

[Contribution page](https://github.com/mojects/mo-sequencer/wiki/Contribution-guide).

# License 

MIT
