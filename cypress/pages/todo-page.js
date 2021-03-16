export class TodoPage {

    newTodo = '.new-todo';
    todoList = '.todo-list li';
    todoListCompleted = '.todo-list li.completed';
    todoListEditing = '.todo-list li.editing';
    todoCount = '.todo-count';
    todoCountStrong = '.todo-count strong';
    todoClearCompletedButton = '.clear-completed';

    addNewTodo(todoName) {
        cy.get(this.newTodo).type(`${todoName}{enter}`)
    }

    getTodosList() {
        return cy.get(this.todoList);
    }

    getTodosListCompleted() {
        return cy.get(this.todoListCompleted);
    }

    getTodosListEditing() {
        return cy.get(this.todoListEditing);
    }

    getTodoCount() {
        return cy.get(this.todoCount);
    }

    getTodoByName(todoName) {
        return cy.get('.todo-list')
                .find('li div')
                .filter(`:contains("${todoName}")`);
    }

    getTodoCountFromStrong() {
        return cy.get(this.todoCountStrong)
                .invoke('html');
    }

    getClearCompletedButton() {
        return cy.get(this.todoClearCompletedButton);
    }

    clearCompletedButtonClick() {
        this.getClearCompletedButton().click();
    }

    makeTodoCompletedOrUncompleted(todoName) {
        this.getTodoByName(todoName)
            .find('.toggle')
            .click();
    }

    editTodoByName(todoName, newName) {
        this.getTodoByName(todoName)
            .dblclick();
        this.getTodosListEditing()
            .type(`{selectall}${newName}{enter}`);
    }

    deleteCompletedTodos() {
        this.getTodosListCompleted()
            .find('.destroy')
            .click({ force: true, multiple: true});
    }

    deleteTodoByName(todoName) {
        this.getTodoByName(todoName)
            .find('.destroy')
            .click({ force: true}, { multiple: true });
    }

    deleteAllTodos() {
        this.getTodosList()
            .find('.destroy')
            .click({ force: true, multiple: true});
    }

    validateTodosListSize(size) {
        this.getTodosList().should('have.length', size);
    }

    validateTodosListCompletedSize(size) {
        this.getTodosListCompleted().should('have.length', size);
    }

    validateTodosCount(size) {
        this.getTodoCount().should('contain', size);
    }

    validateTodoByNameExists(todoName) {
        this.getTodoByName(todoName).should('exist');
    }

    validateTodoByNameNotExists(todoName) {
        this.getTodoByName(todoName).should('not.exist');
    }

    validateTodosCountNotExist() {
        this.getTodoCount().should('not.exist');
    }

    validateTodoNotExist() {
        this.getTodosList().should('not.exist');
    }

    validateTodoCompletedExist() {
        this.getTodosListCompleted().should('exist');
    }

    validateTodoCompletedNotExist() {
        this.getTodosListCompleted().should('not.exist');
    }

}