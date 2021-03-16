const fistureFileName = 'todos.json';

Cypress.Commands.add('createTodosInLocalStorage', function () {
    cy.fixture('todos.json')
    .then(todos => {
        cy.visit('/', {
            onBeforeLoad: function (window) {
                window.localStorage.setItem('angular2-todos', JSON.stringify(todos));
            }
        })
    });
})

Cypress.Commands.add('returnFirstNotCompletedTodo', function () {
    return cy.fixture(fistureFileName).then(json => {
        return json.find(item => item.completed==false && item.editing == false);
    })
})

Cypress.Commands.add('returnFirstCompletedTodo', function () {
    return cy.fixture(fistureFileName).then(json => {
        return json.find(item => item.completed==true);
    })
})
