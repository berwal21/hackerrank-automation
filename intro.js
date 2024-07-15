const puppeteer = require('puppeteer');
const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = ''
const password = ''

let browserOpen  = puppeteer.launch({
    headless: false,

    args:['--start-maximized'], // full screen 

    defaultViewport:null
});

let page;

browserOpen.then(function(browserObj){
    let newPage = browserObj.newPage();
    return newPage;
}).then(function(newTab){
    page = newTab;
    return page.goto(loginLink);
}).then(function(){
    let emailIsEntered = page.type("input[type = 'text']",email,{delay:50})
    return emailIsEntered

}).then(function(){
    let passwordIsEntered = page.type("input[type = 'password']",password,{delay:50})
    return passwordIsEntered
}).then(function(){
    let loginButton = page.click("button[data-hr-focus-item = 'private']",{delay:50})
    return loginButton
}).then(function(){
    let clickOnAlgorithm = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgorithm
}).then(function(){
    let getToWarmup = waitAndClick('input[value="warmup"]',page)
    return getToWarmup
}).then(function(){
    let allProblems = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allProblems
}).then(function(questionsArray){
//let allProblemsLength = questionsArray.length
console.log(questionsArray.length)

let questionSolved = questionSolver(page,questionsArray[0],codeObj.answers[0])
return questionSolved
})





function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}


function questionSolver(page, question, answer)
{
    return new Promise(function(resolve, reject){
        let questionClicked = question.click()
         questionClicked.then(function(){
            let editorInFocus = waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page)
            return editorInFocus
         }).then(function(){
            return waitAndClick('.checkbox-input',page)
         }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
         }).then(function(){
            return page.type('textarea.custominput',answer,{delay:50})
         }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
         }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})
            return AIsPressed
         }).then(function(){
            let XIsPressed = page.keyboard.press('X',{delay:100})
            return XIsPressed
         }).then(function(){
            let ctrlIsReleased = page.keyboard.up('Control')
            return ctrlIsReleased
         }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page)
            return mainEditorInFocus
         }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
         }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})
            return AIsPressed
         }).then(function(){
            let VIsPressed = page.keyboard.press('V',{delay:100})
            return VIsPressed
         }).then(function(){
            let ctrlIsReleased = page.keyboard.up('Control')
            return ctrlIsReleased
         }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:50})
         }).then(function(){
            resolve()
         }).catch(function(){
            reject();
         })
    })
}
