import { ChatUserstate } from 'tmi.js'

type CommandArguments = {
    userState: ChatUserstate,
    command: string,
    message: string | null
}

const hello = ({ userState }: CommandArguments): string => {
    return `Hello to you too, ${userState["display-name"]}`
}

const showAndTell = ({ userState }: CommandArguments): string => {
    return ``
}

const officeHours = ({ userState }: CommandArguments): string => {
    return ``
}

export {
    hello,
    showAndTell,
    officeHours
}