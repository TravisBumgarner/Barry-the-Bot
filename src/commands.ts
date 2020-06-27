import { ChatUserstate, Client } from 'tmi.js'

type CommandArguments = {
    userState: ChatUserstate,
    command: string,
    message: string | null
    channel: string
}

type Message = {
    message: string
    username: string
    userId: string
}

const showAndTellMessages: Message[] = [] // Replace with GCloud
const officeHoursMessages: Message[] = [] // Replace with GCloud

const hello = (client: Client, { userState, channel }: CommandArguments) => {
    console.log(userState)
    const response = `Hello to you too, ${userState.username} we're hot reloading now. It's the future!`
    client.say(channel, response)
}

const showAndTell = (client: Client, { userState, channel, message }: CommandArguments) => {
    let response: string
    if (message && userState["user-id"] && userState.username) {
        showAndTellMessages.push({ message, userId: userState["user-id"], username: userState.username })
        response = `Thank you ${userState["display-name"]}! Your show and tell idea has been received.`
    } else {
        response = 'Sorry, there was an issue with your request. Please suply a message along with your command.'
    }
    client.say(channel, response)
}

const officeHours = (client: Client, { userState, channel, message }: CommandArguments) => {
    let response: string
    if (message && userState["user-id"] && userState.username) {
        officeHoursMessages.push({ message, userId: userState["user-id"], username: userState.username })
        response = `Thank you ${userState["display-name"]}! Your office hours request has been received.`
    } else {
        response = 'Sorry, there was an issue with your request. Please suply a message along with your command.'
    }
    client.say(channel, response)
}

export {
    hello,
    showAndTell,
    officeHours
}