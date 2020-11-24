const fetch = require('node-fetch');

async function send(message) {
    const baseURL = 'http://localhost:3000/subscribe'
    let master = {
        subscription : {
            endpoint: 'https://fcm.googleapis.com/fcm/send/es7Jy-hk_Bg:APA91bHaKFzHn7Fyqw5sEApN1xqQx7n8QxEtBENnfe1uQTDkyMX01RxxhzchtgC5VRnA82hI2_uau6EgXnk6pNTkjRaKlL3jxvqDy2Tn0L378iF3hI5n8wVOZAhssPrWeKfvLWu7RFYk',
            keys: {
                auth: 'YKTNYQcfW0Fq2BPgWYEflw',
                p256dh: 'BNtGO1x_A7YSwTPjoEr3s0gk43NAddDbdPhrFj8Z0cuMhL6FBWOKrfI3rZUoi-ACd9nNtsKUgzAd1y25a8iuHts'
            }
        },
        message: message
    }
    let substring = JSON.stringify(master)
    await fetch(baseURL, optiions = {
        method: 'POST',
        body: substring,
        headers: {
            "content-type": "application/json"
        },
    },
    ).then(console.log('boop'))
}
module.exports = send