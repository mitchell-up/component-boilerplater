import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import analyze from 'rollup-plugin-analyzer'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'main.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [commonjs(), resolve(), typescript(), json(), terser(), analyze()],
  },
  {
    input: 'bin/cli',
    output: {
      dir: 'dist/bin',
    },
  },
]
