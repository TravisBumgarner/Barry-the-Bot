import tmi, { ChatUserstate } from 'tmi.js'
import config from './config'
import { sanitizeInput } from './utilities'
import * as commands from './commands'

const client = tmi.Client(config)

const onMessageHandler = (channel: string, userState: ChatUserstate, rawInput: string, self: boolean) => {
    if (self) {
        return
    }

    const { command, message } = sanitizeInput(rawInput)

    switch (command) {
        case null:
            console.log('No command given.')
            break
        case '!hello':
            const response = commands.hello({ userState, command, message })
            client.say(channel, response)
            break
        default:
            console.log(`Invalid command ${command} supplied`)
    }

}

const onConnectedHandler = (address: string, port: number) => {
    console.log(`* Connected to ${address}: ${port} `);
}

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

