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

    const commandArguments = { userState, command, message, channel }
    switch (command as ValidCommands) {
        case '!hello':
            commands.hello(client, commandArguments)
            break
        case '!showandtell':
            commands.showAndTell(client, commandArguments)
            break
        case '!officehours':
            commands.officeHours(client, commandArguments)
            break
    }
}

const advertise = () => {
    const now = new Date()
    if (now.getMinutes() === 30) {
        client.say(
            config.channels[0],
            "Need help on a project? Type \"!officehours your message\" to get help live!"
        )
    } else if (now.getMinutes() === 0) {
        client.say(
            config.channels[0],
            "Have a project to share? Type \"!showandtell your project\" to share it live!"
        )
    }
}

const onConnectedHandler = (address: string, port: number) => {
    console.log(`* Connected to ${address}: ${port} `);
    setInterval(advertise, 1000 * 60)
}

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

