## Focused Pointers :
```
1. More focused on creating test-architecture rather than adding individual TCs 
2. Added Automated PR & Merge requests validations using travis.yml & action.yml
3. Dependency Management : to manage the dependencies of project : renovate.json file can be used 
3. Considering donation process importance,added headless browser for speedy execution as part of SANITY MUST-DO test suite & to remove dependencies / maintainance of localStorage scenarios
4. CI/CD : Added circleCI pipeline,reporting can be included in this setup using mochawesome node module
5. For left shift testing type : added developement env & build process which anyone can run on their local system
6. Task Runner : Added Gruntfile for unit testing,execution and linting

```

 ## Important

 ```
 For security reasons : sensitive data in env file is replaced by env.example file.
 QA needs to create env.json file seperatly in fixtures folder after cloning this repo.
 ```

## Installing

```bash
## install the node_modules
npm install
```

## Development

```bash
## build the app files (once)
npm run build

## start the local webserver
npm start

## if you modify the app source files and
## want the files to auto build (optional)
npm run watch
```
## Run test suite

```
Refer package.json > Scripts or
npm test
```

```yml
name: cruk
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@2a1baeb
```

## navigate your browser to for left shit testing type
http://localhost:8080

## Running Tests in Cypress

- [Install Cypress](https://on.cypress.io/guides/installing-and-running#section-installing)
- [Add the `cruk` folder as a project](https://on.cypress.io/guides/installing-and-running#section-adding-projects) in Cypress.
- Click `app_spec.js` or `Run All Tests` in the Cypress runner.
- [Read how to setup Continous Integration in CircleCI](https://on.cypress.io/guides/continuous-integration).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
