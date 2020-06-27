import tmi from 'tmi.js'
import config from './config'

const client = tmi.Client(config)


const onMessageHandler = (channel: string, _: any, msg: string, self: boolean) => {
    if (self) {
        return
    }
}

const onConnectedHandler = (address: string, port: number) => {
    console.log(`* Connected to ${address}:${port}`);
}

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();