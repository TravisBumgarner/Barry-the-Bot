import tmi, { ChatUserstate } from 'tmi.js'
import config from './config'
import { sanitizeInput } from './utilities'
import * as commands from './commands'

const VALID_COMMANDS = ['!hello', '!showandtell', '!officehours'] as const
type ValidCommands = typeof VALID_COMMANDS[number]

const client = tmi.Client(config)

const onMessageHandler = (channel: string, userState: ChatUserstate, rawInput: string, self: boolean) => {
    if (self) {
        return
    }

    const { command, message } = sanitizeInput(rawInput)

    if (command === null || command in VALID_COMMANDS) {
        return null
    }

    let response
    switch (command as ValidCommands) {
        case '!hello':
            response = commands.hello({ userState, command, message })
            break
        case '!showandtell':
            response = commands.showAndTell({ userState, command, message })
            break
        case '!officehours':
            response = commands.officeHours({ userState, command, message })
            break
    }
    client.say(channel, response)
}

const onConnectedHandler = (address: string, port: number) => {
    console.log(`* Connected to ${address}: ${port} `);
}

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

