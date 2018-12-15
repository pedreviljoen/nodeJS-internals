/*
    Node has an event loop which is single threaded. The event loop is responsible for executing your JS script. 
    For some info, checkout the event-loop branch.

    Node is built on top of two fundamental pillars. Google's Chrome V8 JS engine & libuv. Although the main event loop is single threaded,
    some of the functions in the libuv library utilises node's Threadpool. The Threadpool by default has 4 threads it can make use of for
    computations.

    Below there is a hash function, that depending on your machine will more or less take about 1 sec to execute. The hash function lies within
    the libuv library & has access to the Threadpool.

    For easy explanation purposes. I'll refer to a cycle, which is the time your machine takes to perform the doHash function.

    Comment out the doHash functions in between each of the commented sections
*/

// Setting the threadpool size, default threads within the pool is 4
process.env.UV_THREADPOOL_SIZE = 5
const crypto = require('crypto')
const start = Date.now()

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('[LOG] Time: ', Date.now() - start)
    })
}

// SECTION 1:
// Both executes in roughly the same cycle
doHash()
doHash()

// SECTION 2:
// The first four executes in one cycle, with the last one executing in one more cycle.

/*
doHash()
doHash()
doHash()
doHash()
doHash()
*/


// SECTION 3:
// With this one, increase the threadpool size at the start of this file to 5. And see the difference

/*
doHash()
doHash()
doHash()
doHash()
doHash()

*/