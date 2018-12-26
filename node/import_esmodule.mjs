import foo from './modules/my_moduleD';

console.log(foo.name);

/*
node -v
v11.4.0

CommonJS
`module.export=` でエクスポートされているファイルは`.js`でインポートできるが、
インポートしている側は`.mjs`でないとエラーになる
*/
