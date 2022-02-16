const { build } = require('esbuild');
const sveltePlugin = require("esbuild-svelte");
const { derver } = require("derver");
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');
const TEST = process.argv.includes('--test');

const output = {
  esm: pkg.module,
  cjs: pkg.main,
  test: 'test/app/public/bundle.js'
}

if(DEV){
  build({
    entryPoints: ['./test/app/main.js'],
    outfile: output.test,
    minify: false,
    sourcemap: true,
    bundle: true,
    incremental: true,
    plugins: [
      sveltePlugin({
        compileOptions:{
            dev: true,
            css: true
        },
      })
    ],
  }).then( bundle => {
    derver({
      dir: 'test/app/public',
      host: 'localhost',
      port: 7000,
      watch:['test/app/public','test/app/components','src'],
      onwatch: async (lr,item)=>{
        if(item !== 'test/app/public'){
          lr.prevent();
          bundle.rebuild().catch(err => lr.error(err.message,'Svelte compile error'));
        }
      }
    })
  });
}else if(TEST){
  build({
    entryPoints: ['./test/app/main.js'],
    outfile: output.test,
    minify: true,
    bundle: true,
    plugins: [
      sveltePlugin({
        compileOptions:{
            dev: false,
            css: true
        },
      })
    ],
  }).then( bundle => {
    derver({
      dir: 'test/app/public',
      host: 'localhost',
      port: 7000,
      watch:false
    })
  });
}else{
  ['esm','cjs'].forEach( type => {
    build({
      entryPoints: ['./src/index.js'],
      outfile: output[type],
      format: type,
      minify: true,
      sourcemap: false,
      bundle: true,
      external: ['svelte'],
      plugins: [sveltePlugin()],
    });
  })
}