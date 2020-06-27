import { ChatUserstate } from 'tmi.js'

type CommandArguments = {
    userState: ChatUserstate,
    command: string,
    message: string | null
}

const hello = ({ userState }: CommandArguments): string => {
    return `Hello to you too, ${userState["display-name"]}`
}



export {
    hello
}