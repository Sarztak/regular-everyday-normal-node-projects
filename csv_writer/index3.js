import prompt from "prompt"
import { createObjectCsvWriter } from "csv-writer";

const csvWriter = createObjectCsvWriter({
    path: "./contacts.csv",
    append: true,
    header: [
        {id: "name", title: "NAME" },
        {id: "number", title: "NUMBER" },
        {id: "email", title: "EMAIL"},
    ],
});

class Person {
    constructor(name = "", number = "", email = "") {
        this.name = name;
        this.number = number;
        this.email = email;
    }

    saveToCSV() {
        try {
            const {name, number, email} = this;
            csvWriter.writeRecords([{name, number, email}]);
            console.log(`${name} Saved!`);
        } catch (error) {
            console.error(error);
        }
    }
}

prompt.start();
prompt.message = "";

async function startApp() {
   const person = new Person() 
   const responses = await prompt.get([
    {
        name: "name",
        description: "Contact name: "
    },
    {
        name: "email",
        description: "Contact email: "
    },
    {
        name: "number",
        description: "Contact number: "
    }
   ]);

   Object.assign(person, responses);
   person.saveToCSV();

   const {again} = await prompt.get([
    {
        name: "again",
        description: "Continue? [y to continue]"
    }
   ]);
   
   if (again === 'y') await startApp();
};

startApp()