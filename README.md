# Appointment-App-Front

Project tech-stack:
  NodeJs,
  ExpressJs,
  Webpack,
  ReactJs,
  Redux,
  TypeScript,
  EsLint,
  Semantic-UI-React

Project supports module-hot-reload

In order to work with project, first setup environment.

1 Download here https://nodejs.org/en/download/ and install nodejs(desirable v14)
2 After installing node check, if it was installed correctly - check command:
    'node -v' - will display something like v14.17.0
    'npm -v' - will display something like v6.14.3
3 Move to frontend root-folder, where is situated 'package.json'  and execute command:
    'npm install'
  This will install necessary dependencies in node_modules
4 In order to perform first-build execute: 
    'npm run build'
5 If build was performed without errors, execute:
    'npm run dev'
6 After buil, go to browser http://localhost:3000/ (port can be customized in config 'server.js')
