/// <reference types="cypress" />
import { Html } from 'cypress-composed'

const { clickButton } = Html.Utility
const { enterInput } = Html.InputCommands
const { keyThroughSelect, selectSelect } = Html.SelectCommands


function goHome() {
    cy.visit('localhost:3000')
}

function getAllPosts() {
    goHome()
    clickButton('get all')
}

function deleteAllPosts() {
    clickButton('delete all')
}

function getPostFromInput(id) {
    enterInput('post id', id)
    clickButton('get')
}

function updatePostFromInput(id, message) {
    getPostFromInput(id)
    cy.wait(500)
    enterInput('update text', message);
    clickButton('update')
} 

function deleteAPostFromInput(id) {
    enterInput('post id', id);
    clickButton('delete');
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
    updatePostFromInput(5, 'hello world');
    cy.wait(500)
    deleteAPostFromInput(4);
}

function getStateContent() {
    return cy.get('pre[data-test-id="selected post"]');
}

function contentShouldHaveInnerText(text) {
    const stateContent = getStateContent()
    stateContent.contains(text)
}

function updateStateWithKeydown () {
    goHome()
    getAllPosts()
    keyThroughSelect('post select', 20)
}

function canGetAndSelectAPost(postNum) {
    goHome()
    getPostFromInput(postNum)
    selectSelect('post select', `${postNum}`)
}

function getAndSelectAPostAndEnsureVisible() {
    canGetAndSelectAPost(33)
    contentShouldHaveInnerText("\"id\": 33")
}
context('Actions', () => {
    it('can get all posts', getAllPosts)
    it('can delete all posts', deleteAllPosts)
    it('can get one post, select it, have its content visible', getAndSelectAPostAndEnsureVisible);
    it('keydown updates state', updateStateWithKeydown)
    it('can engage with all crud actions', playWithAllCrudButtons)
    it.skip('can update post', () => {
        updatePostFromInput(54, 'this is your new post')
    })
})
  