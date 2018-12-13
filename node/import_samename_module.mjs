import {cube} from './modules/my_moduleA';
import {cube as rectangular} from './modules/my_moduleB';
// * を使う時は {} で囲むとエラーになる
import * as mc from './modules/my_moduleC';

console.log( 'moduleA cube 5 = ', cube(5) );
console.log( 'moduleB cube x5 y5 x10 = ', rectangular(5, 5, 10) );
console.log( 'moduleC cube w5 h10 = ', mc.cube(5, 10) );

console.log( mc.hi('星宮いちご') );

/*
note
```sh
node -v
v10.4.0
```

```javascript
import {cube} from './modules/my_moduleA.js';
```
```sh
// main.mjs
$ node main.js
```
(function (exports, require, module, __filename, __dirname) { import { cube } from './modules/my_moduleA.js';
                                                                     ^
SyntaxError: Unexpected toke

nodeでは`.js`という拡張子だと`import/export`は使えない。
`.mjs`という拡張子にする必要がある


```javascript
// main.mjs
import {cube} from './modules/my_moduleA.mjs';
```
```sh
$ node main.mjs
(function (exports, require, module, __filename, __dirname) { import {cube} from './modules/my_moduleA.mjs';
                                                                     ^
SyntaxError: Unexpected token
```

`-experimental-modules`オプションを使わないとダメっぽい
```javascript
// main.mjs
import {cube} from './modules/my_moduleA';
```
```sh
$ node -experimental-modules main.mjs
(node:49180) ExperimentalWarning: The ESM module loader is experimental.
moduleA cube 5 =  125
```

インポートする関数名が`{}`で囲まれてないとエラー
```javascript
// main.mjs
import cube from './modules/my_moduleA';
```
```sh
$ node -experimental-modules main.mjs
import cube from './modules/my_moduleA';
       ^^^^
SyntaxError: The requested module './modules/my_moduleA' does not provide an export named 'default'
```
*/
