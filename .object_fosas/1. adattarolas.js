import input from './input.js'

class Person {
    constructor(name, email) {
        this.name = name
        this.email = email
    }
}

let numberOfPeople = parseInt(await input("Hány embert szeretnél felvenni? > "))
let people = []
let name, email;

for (let i = 0; i < numberOfPeople; i++) {
    name = await input(`Add meg a(z) ${i+1}. ember nevét > `)
    email = await input(`Add meg a(z) ${i+1}. email címet > `)
    people.push(new Person(name, email))
}

for (let i = 0; i < people.length; i++) {
    console.log(`Az ${i+1}. ember neve: ${people[i].name}, email címe: ${people[i].email}`)
}