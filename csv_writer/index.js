import { writeFileSync, appendFileSync} from "fs";
import { createInterface } from "readline/promises";

class Person {
    constructor(name = "", number = "", email = "") {
        this.name = name;
        this.number = number;
        this.email = email;
    }

    saveToCSV() {
        const content = `${this.name},${this.number},${this.email}\n`;
        try {
            appendFileSync("./contacts.csv", content);
            console.log(`${this.name} Saved!`);
        } catch (error) {
            console.error(error);
        }
    }
}

async function readLineAsync(message) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const answer = await readline.question(message);
    readline.close();
    return answer
}

async function startApp() {
    const person = new Person();
    person.name = await readLineAsync("Contact name: ");
    person.email = await readLineAsync("Contact Email: ");
    person.number = await readLineAsync("Contact Number: ");
    person.saveToCSV();
    const response  = await readLineAsync("Continue? [y to continue]");
    if (response === 'y') {
        await startApp();
    }
}

startApp();