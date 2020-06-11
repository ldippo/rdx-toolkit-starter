/// <reference types="cypress" />
function goHome() {
    cy.visit('localhost:3000')
}

function getElementFactory(tag) {
    return (id) => {
        return cy.get(`${tag}[data-test-id="${id}"]`)
    }
}

const getButton = getElementFactory('button');
const getInput = getElementFactory('input');
function findAndClickButton(id) {
    getButton(id).click();
}

function typeInInput(id, message) {
    getInput(id).type(message)
}

context('Actions', () => {
    
    it('can get all posts', () => {
        goHome()
       findAndClickButton('get all')
    })

    it('can delete all posts', () => {
       findAndClickButton('delete all')
    })

    it('can get one post', () => {
        typeInInput('post id', 5)
        findAndClickButton('get')
    })

    it('can update post', () => {
        typeInInput('update text', 'this is a great new post');
        findAndClickButton('update')
    })
})
  