
const { TodoPage } = require("../pages/todo-page");

describe('For checking deletion the test', function() {

    const todoPage = new TodoPage();

    beforeEach(() => {
        cy.createTodosInLocalStorage();
    })

    it('deletes all completed todos by clicking delete icon [D-1]', function(){
        
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

    it('deletes all completed todos by clicking "Clear completed" button [D-2]', function(){
        
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

    it('deletes todo by name [D-3]', function(){

        cy.returnFirstNotCompletedTodo().then(json => {

            todoPage.getTodosList().then(todos => {
                this.totalItems = todos.length;
            })
    
            todoPage.getTodoByName(json._title).then(todos => {
                this.deleted = todos.length;
            })

            todoPage.getTodosListCompleted().then(todos => {
                this.completed = todos.length;
            })
    
            todoPage.getTodoCountFromStrong()
            .then(initialCount => {
                todoPage.deleteTodoByName(json._title);

                todoPage.validateTodosListSize(this.totalItems-this.deleted);
                todoPage.validateTodosListCompletedSize(this.completed)
                todoPage.validateTodosCount(initialCount-this.deleted);
                todoPage.validateTodoByNameNotExists(json._title);
            });

        });
    })

    it('deletes all todos [D-4]', function(){

        todoPage.deleteAllTodos();
        todoPage.validateTodoNotExist();
        todoPage.validateTodosCountNotExist();

    })

});


