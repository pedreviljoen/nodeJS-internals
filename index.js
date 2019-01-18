const crypto = require('crypto')

/*
    We will discuss two different classes within the crypto lib for cryptographic purposes.

    The first is Hash, it is used to create Hash digests of data. NB to note, hash.digest()
    is used to compute the hash whereafter the Hash object created cannot be used again.

    Hash can be used in two ways:
    1) As a stream that is both readable and writeable
    2) Without streams - 
        Using hash.update() and hash.digest() to produce the computed hash

    crypto.createHash(<algorithm>) is used to create Hash instances.

    The algorithms that is available is dependent on algorithms supported by OpenSSL
*/

// Using Hash as streams

const hash = crypto.createHash('sha256')

hash.on('readable', () => {
    const data = hash.read()
    if (data) {
        console.log('[LOG]: Hash with streams - ', data.toString('hex'))
    }
})

hash.write('Some streamed data to hash')        // this will trigger the hash.on('readable') event
hash.end()

// Using Hash without streams

const hash2 = crypto.createHash('sha256')
hash2.update('Some data to hash')

console.log('[LOG]: Hash without streams - ', hash2.digest('hex'))                // hash.digest() can either be 'hex', 'latin1', 'base64' encoded

/*
    The second is HMAC, which returns a Hmac object given an algorithm & key.

    After Hmac.digest() the Hmac object cannot be used again

    Hmac can also be used in two ways:
    1) With streams
    2) Without streams

    crypto.createHmc(<algorithm>, <key>) is used to create Hmac instances.

    The algorithms that is available is dependent on algorithms supported by OpenSSL
*/

// Example with streams

const hmac = crypto.createHmac('sha256', 'some key')

hmac.on('readable', () => {
    const data = hmac.read()
    if (data) {
        console.log('[LOG]: Hmac with streams - ', data.toString('hex'))
    }
})

hmac.write('Some data to hash to hash with the key')
hmac.end()

// Example without streams

const hmac2 = crypto.createHmac('sha256', 'some other key')

hmac2.update('Some data to hash with the key')
console.log('[LOG]: Hmac without streams', hmac2.digest('hex'))