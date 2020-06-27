const sanitizeInput = (rawInput: string): string | null => {
    let sanitizedInput = rawInput.trim()

    if (sanitizedInput[0] !== "!") {
        return null
    }

    return sanitizedInput
}

export {
    sanitizeInput
}