import {colorIsLight, formatDate, formatReplyString} from "../utils/formatters";

test('formatDate testing', () => {
    const dateString = '2021-02-18T19:30:04.109082'
    expect(formatDate(dateString)).toBe('19:30 18.02.2021')
})

test('formatReplyString testing', () => {
    const reply = 'hello, this is mock reply for testing'
    const len = 17
    expect(formatReplyString(reply, len)).toBe('hello, this is mo...')
})

test('colorIsLight testing', () => {
    const rgb = {r: 200, g: 100, b: 200}
    expect(colorIsLight(rgb.r, rgb.g, rgb.b)).toBeTruthy()
})