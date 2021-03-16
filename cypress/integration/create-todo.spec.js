const { TodoPage } = require("../pages/todo-page");
const { generateRandomString } = require("../support/utils");

describe('For checking creation the test', function() {

    const todoPage = new TodoPage();

    beforeEach(() => {
        cy.visit('/');
    })

    it('creates a todo with random name', function(){
        const todoName = generateRandomString(10, ['a', 'A', '#']);

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosListSize(1);
        todoPage.validateTodosCount(1);
        todoPage.validateTodoByNameExists(todoName);

    })

    it('creates a todo with empty name', function(){
        const todoName = "";

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosCountNotExist();
        todoPage.validateTodoNotExist();
    
    })

    it('creates a todo with only spaces in name', function(){
        const todoName = "             ";

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosCountNotExist();
        todoPage.validateTodoNotExist();
    
    })

    it('creates a todo with name which contains symbols', function(){
        const todoName = generateRandomString(10, ['!']);

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosListSize(1);
        todoPage.validateTodosCount(1);
        todoPage.validateTodoByNameExists(todoName);

    })

    it('creates a todo with name which contains symbols and emoji', function(){
        const todoName = "♣ ♡ ﷼ ☏ ⌨ ✁ 😂";

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosListSize(1);
        todoPage.validateTodosCount(1);
        todoPage.validateTodoByNameExists(todoName);

    })

    it('creates a todo with XSS injection', function(){
        const todoName = "<script>alert('xss')</script>";

        todoPage.addNewTodo(todoName);

        todoPage.validateTodosListSize(1);
        todoPage.validateTodosCount(1);
        todoPage.validateTodoByNameExists(todoName);

    })

})
