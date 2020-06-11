/// <reference types="cypress" />

function goHome() {
    cy.visit('localhost:3000')
}

function getElementFactory(tag) {
    return (id) => {
        return cy.get(`${tag}[data-test-id="${id}"]`)
    }
}

const [getDiv, getButton, getInput, getH1, getP] = ['div', 'button', 'input', 'h1', 'p'].map(getElementFactory)

function findAndClickButton(id) {
    getButton(id).click();
}

function typeInInput(id, message) {
    getInput(id)
    .clear()
    .type(message)
}

function getAllPosts() {
    goHome()
    findAndClickButton('get all')
}

function deleteAllPosts() {
    findAndClickButton('delete all')
}

function getPostFromInput(id) {
    typeInInput('post id', id)
    findAndClickButton('get')
}

function updatePostFromInput(id, message) {
    getPostFromInput(id)
    cy.wait(500)
    typeInInput('update text', message);
    findAndClickButton('update')
} 

function deleteAPostFromInput(id) {
    typeInInput('post id', id);
    findAndClickButton('delete');
}

function playWithAllCrudButtons() {
    goHome();
    cy.wait(500)
    getAllPosts();
    cy.wait(500)
    deleteAllPosts();
    cy.wait(500)
    getPostFromInput(4);
    cy.wait(500)
    updatePostFromInput(5, 'hello govna');
    cy.wait(500)
    deleteAPostFromInput(4);
}

function getStateContent() {
    return cy.get('pre[data-test-id="state"]');
}

function contentShouldHaveInnerText(text) {
    const stateContent = getStateContent()
    console.log(stateContent)
    stateContent.contains(text)
}

context('Actions', () => {
    
    it('can get all posts', getAllPosts)
    it('can delete all posts', deleteAllPosts)
    it('can get one post', () => {
        getPostFromInput(33)
        contentShouldHaveInnerText("\"id\": 33")
    });
    it('can update post', () => {
        updatePostFromInput(54, 'this is your new post')
    })
    it('can engage with all crud actions', playWithAllCrudButtons)
})
  