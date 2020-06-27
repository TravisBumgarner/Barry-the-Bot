import { sanitizeInput } from './utilities'

[
    ["!hello", "!hello"]
].forEach(([input, output]) => {
    test(
        `sanitizeInput given ${input} should give ${output}`,
        () => expect(sanitizeInput(input)).toBe(output)
    )

})
