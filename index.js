/*
    Clustering is a module that allows you to create child processes that all share server ports.
    
    A single instance of node is single threaded (the event loop). To take advantage of some multi-core systems,
    you will sometimes want to launch multiple instances of your program. This is called clustering.

    In this example we start up a http server, listening on port 3000. So head over to your localhost:3000/, the server
    should snd back hello world after about 5 seconds.

    Run the following test, inspect the response time of the network request. Hit refresh and check that the request responds
    after about 5 seconds.

    Open up a new tab also at localhost:3000/, so now you should have two tabs open at localhost:3000/. Hit refresh on both
    as quick as you can and monitor how long it takes the second request to return. Notice that it took a bit longer than 5 seconds?

    That is because the event loop (single threaded) is still busy with the first request, before it can start with the second.

    Now uncomment the for loop section of cluster.fork()

    Each child process can share the same http port. Allowing the work to be shared among the children. Do the same test above & notice
    that both requests return in about the same amount of time.
*/

const cluster   = require('cluster')
const http      = require('http')
const numCpus   = require('os').cpus().length
const PORT      = 3000
const TIME      = 5000                          // 5 seconds

function doWork (time, cb) {
    const start = Date.now()

    while (Date.now() - start < time) {}

    cb()
}

if (cluster.isMaster) {
    console.log(`[LOG]: Master is running at ${process.pid}`)

    // for (i = 0; i < numCpus - 2; i++) {
    //     cluster.fork()
    // }

    cluster.fork()

    // on cluster exit
    cluster.on('exit', (worker, code, signal) => {
        console.log(`[LOG]: Worker ${worker.process.pid} died`)
    })
} else {

    http.createServer((req, res) => {
        doWork(TIME, () => {
            res.writeHead(200)
            res.end('Hello World')
        })
    }).listen(PORT)

    console.log(`[LOG]: Child worker at ${process.pid} started`)
}
