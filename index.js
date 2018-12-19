/*
    Node has an event loop which is single threaded. The event loop is responsible for executing your JS script. 
    
    Ever wondered what happens when you execute your js script in your terminal with:
    node index.js

    Work through the script below, hopefully it will provide a picture of what is happening
*/

/*
    Node runs through your script file and categorises all functions it should execute in the following three categories:
    
    1) Timer functions

    2) OS functions

    3) Operation functions

    It can almost be visualised as if node creates 3 arrays, and loads the functions within them like below & then tuns the file
*/

const pendingTimers     = []
const pendingOSTasks    = []
const pendingOperations = []

myScript.runContents()

/*
    After this step, node has an event loop. That ticks every time the entire body within the event loop is executed. 
    After which it performs a check if it should continue or not. It can almost be visualised as a while loop, 
    that has a shouldContinue value. If it is true, the event loop executes and ticks again. If not it exits the program.
*/

function shouldContinue () {
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

while(shouldContinue) {
    /*
        There are a few steps that the event loop goes through before it ticks.
    */

    // Step 1):
    // Node looks at pendingTimers and checks any functions are ready to be called. Specifically setTimeout & setInterval

    // Step 2):
    // Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

    // Step 3):
    // Node pauses execution, for a brief moment. And continues when:
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    // Step 4):
    // Node looks at pendingTimers again. But this time specifically setImmediate

    // Step 5):
    // Node handles any 'close' events. Also seen as clean-up code.
    // eg.
    // readStream.on('close', () => {
    //   fileConnection.close()
    //})
    // the above callback is an example of clean-up code
}

// And that is the just of it. The underlying anatomy of when you execute your .js script file