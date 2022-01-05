const production = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    ['@babel/preset-env'],
    [
      '@babel/preset-react',
      {
        runtime: production ? 'automatic' : 'classic'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-transform-runtime']
}
