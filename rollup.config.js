import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/vnode/1-node.js',
    output: {
      file: 'dist/vnode/node.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/vnode/2-node-dom.js',
    output: {
      file: 'dist/vnode/node-dom.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/vnode/3-node-update.js',
    output: {
      file: 'dist/vnode/node-update.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/vnode/4-node-props.js',
    output: {
      file: 'dist/vnode/node-props.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/vnode/5-node-events.js',
    output: {
      file: 'dist/vnode/node-events.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  },
  {
    input: 'src/main.js',
    output: {
      file: 'dist/main.js',
      format: 'cjs',
      banner: '/* Cecil0o0 jiegithub@gmail.com */'
    },
    plugins: [
      babel()
    ]
  }
]
