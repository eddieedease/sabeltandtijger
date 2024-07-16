module.exports = {
    apps: [{
      name: "my-app",
      script: "./server/main.js",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
    }]
  }