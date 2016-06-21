var rollupIncludePaths = require('rollup-plugin-includepaths');
var babel = require('rollup-plugin-babel');
var es2015Rollup = require('babel-preset-es2015-rollup');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
const includePathOptions = {
    paths: ['node_modules','assets/js']
};
export default {
    format: 'iife',
    entry: './index.js',
    plugins: [
        rollupIncludePaths(includePathOptions),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**'  // Default: undefined
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        babel({
            // exclude: 'node_modules/**'
        })
    ]
};