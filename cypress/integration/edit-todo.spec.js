const { TodoPage } = require("../pages/todo-page");

describe('For checking editing the test', function() {

    const todoPage = new TodoPage();

    beforeEach(() => {
        cy.createTodosInLocalStorage();
    });

    let newName = "Edit todo during the test";

    it('edits uncompleted todo by name', function() {

        todoPage.getTodosList().then(todos => {
            this.totalItems = todos.length;
        })

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        cy.returnFirstNotCompletedTodo().then(json => {
            todoPage.getTodoCountFromStrong()
                .then(notCompletedCount => {
                    todoPage.editTodoByName(json._title, newName);

                    todoPage.validateTodoByNameNotExists(json._title);
                    todoPage.validateTodoByNameExists(newName);
                    todoPage.validateTodosListSize(this.totalItems);
                    todoPage.validateTodosListCompletedSize(this.completed);
                    todoPage.validateTodosCount(notCompletedCount);
            
            })
        })
   })

    it('edits completed todo by name', function(){

        todoPage.getTodosList().then(todos => {
            this.totalItems = todos.length;
        })

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        cy.returnFirstCompletedTodo().then(json => {
            todoPage.getTodoCountFromStrong()
            .then(notCompletedCount => {
                todoPage.editTodoByName(json._title, newName);

                todoPage.validateTodoByNameNotExists(json._title);
                todoPage.validateTodoByNameExists(newName);
                todoPage.validateTodosListSize(this.totalItems);
                todoPage.validateTodosListCompletedSize(this.completed);
                todoPage.validateTodosCount(notCompletedCount);
            });

        });
    })

    it('makes uncompleted todo completed', function(){

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        cy.returnFirstNotCompletedTodo().then(json => {
            todoPage.getTodoCountFromStrong()
            .then(notCompletedCount => {
                todoPage.makeTodoCompletedOrUncompleted(json._title);

                todoPage.validateTodosListCompletedSize(this.completed+1);
                todoPage.validateTodosCount(notCompletedCount-1);

            });

        });
    })

    it('makes completed todo uncompleted', function(){

        todoPage.getTodosListCompleted().then(todos => {
            this.completed = todos.length;
        })

        todoPage.getTodosList().then(todos => {
            this.totalItems = todos.length;
        })

        cy.returnFirstCompletedTodo().then(json => {
        todoPage.makeTodoCompletedOrUncompleted(json._title);
        todoPage.validateTodosListCompletedSize(this.completed-1);
        todoPage.validateTodosCount(this.totalItems-this.completed+1);

        });
    })

});