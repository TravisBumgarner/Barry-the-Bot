require('dotenv').config()

if (!(process.env.USERNAME && process.env.PASSWORD && process.env.CHANNEL)) {
    throw new Error(".env variable(s) are missing")
}

const config = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: [process.env.CHANNEL]
}

export default config