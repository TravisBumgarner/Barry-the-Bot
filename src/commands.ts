import { ChatUserstate, Client } from 'tmi.js'

type CommandArguments = {
    userState: ChatUserstate,
    command: string,
    message: string | null
    channel: string
}

type CommandResponse = {
    success: boolean
}

type Message = {
    message: string
    username: string
    userId: string
}

const handleMessage = (message: Message) => {
    console.log('\x1b[30m\x1b[43m%s\x1b[0m', JSON.stringify(message))
}

const hello = (client: Client, { userState, channel }: CommandArguments) => {
    const response = `Hello to you too, ${userState.username} we're hot reloading now. It's the future!`
    client.say(channel, response)
}

const help = (client: Client, { userState, channel }: CommandArguments) => {
    const response = `Send a direct message to barry_the_bot. If you want to get help with something you're working on, type !officehours followed by a brief summary of your issue. If you want to show something off that you made or found, type !showandtell followed by a brief summary and a link. If there's time we'll discuss on stream!`
    client.say(channel, response)
}

const handleRequest = (client: Client, { userState, channel, message }: CommandArguments): CommandResponse => {
    let response: string = ''
    let success: boolean

    if (userState["message-type"] === 'chat') {
        response = 'Please whisper your request to barry_the_bot.'
        success = false
    } else if (message && userState["user-id"] && userState.username) {
        handleMessage({ message, userId: userState["user-id"], username: userState.username })
        response = `Thank you ${userState["display-name"]}! Your request has been received.`
        success = true
    } else {
        success = false
    }

    if (userState.username && response.length) {
        client.say(channel, response)
    }

    return {
        success
    }
}

const showAndTell = handleRequest
const officeHours = handleRequest

export {
    hello,
    showAndTell,
    officeHours,
    help
}