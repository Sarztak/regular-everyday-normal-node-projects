import { writeFileSync, appendFileSync} from "fs";
import { createInterface } from "readline";

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

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

function readLineAsync(message) {
    return new Promise(resolve => {
        readline.question(message, response => {
            resolve(response)
        })    
    })
}

async function startApp() {
   const person = new Person();
   person.name = await readLineAsync("name")
   person.email = await readLineAsync("email")
   person.number = await readLineAsync("number")
   person.saveToCSV()

   const response = await readLineAsync("continue [y for yes]");
   if (response === 'y') {
        await startApp()
   } else {
        readline.close()
   }
}

startApp();