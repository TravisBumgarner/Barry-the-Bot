import { sanitizeInput } from './utilities'

[
    { input: "!hello", output: { command: "!hello", message: "" } },
    { input: "!hello world", output: { command: "!hello", message: "world" } },
    { input: "!HELLO world", output: { command: "!hello", message: "world" } },
    { input: "  !hello world  ", output: { command: "!hello", message: "world" } },
    { input: "  !hello      world  ", output: { command: "!hello", message: "world" } },
].forEach(({ input, output }) => {
    test(
        `sanitizeInput given ${input}`,
        () => {
            expect(sanitizeInput(input).command).toBe(output.command)
        }
    )

})
