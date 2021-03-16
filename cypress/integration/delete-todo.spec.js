
const { TodoPage } = require("../pages/todo-page");

describe('For checking deletion the test', function() {

    const todoPage = new TodoPage();

    beforeEach(() => {
        cy.createTodosInLocalStorage();
    })

    it('deletes all completed todos by clicking delete icon', function(){
        
        todoPage.getTodosList().then(todos => {
                this.totalItems = todos.length;
        })

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        todoPage.getTodoCountFromStrong()
        .then(notCompletedCount => {
            todoPage.deleteCompletedTodos();

            todoPage.validateTodosCount(notCompletedCount);
            todoPage.validateTodosListSize(this.totalItems-this.completed);
            todoPage.validateTodoCompletedNotExist();
        });
    })

    it('deletes all completed todos by clicking "Clear completed" button', function(){
        
        todoPage.getTodosList().then(todos => {
                this.totalItems = todos.length;
        })

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        todoPage.getTodoCountFromStrong()
        .then(notCompletedCount => {
            todoPage.getClearCompletedButton().should('exist');

            todoPage.clearCompletedButtonClick();

            todoPage.validateTodosCount(notCompletedCount);
            todoPage.validateTodosListSize(this.totalItems-this.completed);
            todoPage.validateTodoCompletedNotExist();
            todoPage.getClearCompletedButton().should('not.exist');
        });
    })

    it('deletes todo by name', function(){

        cy.returnFirstNotCompletedTodo().then(json => {

            todoPage.getTodosList().then(todos => {
                this.totalItems = todos.length;
            })
    
            todoPage.getTodoByName(json._title).then(todos => {
                this.deleted = todos.length;
            })
    
            todoPage.getTodoCountFromStrong()
            .then(initialCount => {
                todoPage.deleteTodoByName(json._title);

                todoPage.validateTodosListSize(this.totalItems-this.deleted);
                todoPage.validateTodoCompletedExist();
                todoPage.validateTodosCount(initialCount-this.deleted);
                todoPage.validateTodoByNameNotExists(json._title);
            });

        });
    })

    it('deletes all todos', function(){

        todoPage.deleteAllTodos();
        todoPage.validateTodoNotExist();
        todoPage.validateTodosCountNotExist();

    })

});


