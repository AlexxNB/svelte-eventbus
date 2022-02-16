const { build } = require('esbuild');
const sveltePlugin = require("esbuild-svelte");
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');

// common settings
const common = {
  entryPoints: ['./src/index.js'],
  minify: !DEV,
  sourcemap: DEV && 'inline',
  bundle: true,
  external: ['svelte'],
  plugins: [sveltePlugin()],
}


const builds = {
  // CJS module
  cjs: {
      outfile: pkg.main,
      
  },
  // ES6 module
  esm: {
      outfile: pkg.module
  }
};

Object.keys(builds).forEach(key => {
  const options = {
      ...common,
      ...builds[key],
      format: key
  }
  build(options);
});