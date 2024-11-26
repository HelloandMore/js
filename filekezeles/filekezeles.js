import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, 'data.json')

const users = [
    { id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }, { id: 3, name: 'Alice' }, { id: 4, name: 'Bob' }, { id: 5, name: 'Eve' }, { id: 6, name: 'Mallory' }, { id: 7, name: 'Trent' }, { id: 8, name: 'Carol' }, { id: 9, name: 'Dave' }, { id: 10, name: 'Frank' }, { id: 11, name: 'Grace' }, { id: 12, name: 'Heidi' }, { id: 13, name: 'Ivan' }, { id: 14, name: 'Judy' }, { id: 15, name: 'Mallory' }, { id: 16, name: 'Oscar' }, { id: 17, name: 'Peggy' }, { id: 18, name: 'Randy' }, { id: 19, name: 'Sybil' }, { id: 20, name: 'Walter' }, { id: 21, name: 'Zoe' }
]

try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
} catch (err) {
    console.error(err)
}

let content = ''
try {
    content = fs.readFileSync(filePath, 'utf8')
} catch (err) {
    console.error(err)
}

// console.log(content)

const newData = JSON.parse(content)
console.log(newData)