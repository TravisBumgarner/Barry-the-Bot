type UserMessage = {
    command: string | null
    message: string | null
}

const sanitizeInput = (rawInput: string): UserMessage => {
    let sanitizedInput = rawInput.trim()

    if (sanitizedInput[0] !== "!") {
        return {
            command: null,
            message: null
        }
    }

    let command
    let message

    const firstSpaceIndex = sanitizedInput.indexOf(' ')
    if (firstSpaceIndex === -1) {
        command = sanitizedInput
        message = ""
    } else {
        command = sanitizedInput.slice(0, firstSpaceIndex)
        message = sanitizedInput.slice(firstSpaceIndex + 1)
    }

    return {
        command: command.toLowerCase(),
        message
    }
}

export {
    sanitizeInput
}