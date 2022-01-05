import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonJS from '@rollup/plugin-commonjs'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']

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
