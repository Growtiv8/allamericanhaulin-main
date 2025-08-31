// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'allamericanhaulin',
    script: 'npm',
    args: 'start',
    cwd: './', // Your project directory
    watch: false, // Don't watch for changes in production
    env: {
      NODE_ENV: 'production'
    }
  }]
};