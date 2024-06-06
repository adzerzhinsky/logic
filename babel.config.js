const plugins = [];
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

export default {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins,
};