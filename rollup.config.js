import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonJS from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'
// import externals from 'rollup-plugin-node-externals'
import del from 'rollup-plugin-delete'
// import visualizer from 'rollup-plugin-visualizer'
// import replace from '@rollup/plugin-replace'";
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
// const babelConfig = { extensions }
// const resolveConfig = { extensions, jsnext: true }

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

const input = 'src/index.tsx'
export default {
  input,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  external: Object.keys(globals),
  plugins: [
    del({ targets: 'dist/*' }),
    externalDeps(),
    nodeResolve({ extensions }),
    commonJS(),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      extensions
    }),
    size()
  ]
}
