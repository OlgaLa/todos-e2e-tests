# todos-e2e-tests

The project contains e2e tests for https://todomvc.com/examples/angular2/

## How to run tests with cypress:
1. Clone the project
2. Go to the project folder
3. Run the command in terminal to install dependencies:

`npm install`

4. Run the command in terminal to run tests: 

`npm run cypress:run`

The tests results will be in the folder `/videos`

## How to run tests in Docker:

If you don't want to install cypress you can run tests in Docker.

1. [Install Docker](https://docs.docker.com/get-docker/) on your local machine 
2. Clone the project 
3. Go to the project folder
4. Run the command in terminal:

Linux/Mac: 
```bash
docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.7.1
```

Windows in PowerShell: 
```powershell
docker run -it -v "$(PWD):/e2e" -w /e2e cypress/included:6.7.1
```

## View the test report produced by CI 

This repository contains a GitHub Actions build pipeline which is triggered on every push. It executes tests in a docker container, and then uploads the videos as build artifacts. 

You can find and download them by navigating to https://github.com/OlgaLa/todos-e2e-tests/actions and selecting the latest run log. The artifacts would be located in **Artifacts** section at the bottom of the page.

## Test cases

The test cases are documented in the folder `test-cases`. Every test case has an ID. This ID is used as a reference to the relevant e2e test.

