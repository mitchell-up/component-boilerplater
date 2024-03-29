import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'main.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [typescript()],
  },
]
