import bcrypt from "bcrypt";
import promptModule from "prompt-sync";
import db from "./db.js";

const prompt = promptModule();

function saveNewPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(`
        INSERT OR REPLACE INTO master (id, hash)
        VALUES (1, ?)
    `);

    stmt.run(hash);
    console.log("Password has been saved!");
    showMenu();
}

function showMenu() {
    console.log(`
        1. View passwords
        2. Manage new password
        3. Verify master password
        4. Exit`);
    const response = prompt(">");
    
    if (response === '1') viewPasswords();
    else if (response === '2') promptManageNewPassword();
    else if (response === '3') promptOldPassword();
    else if (response === '4') process.exit();
    else {
        console.log("That's an invalid response");
        showMenu();
    }
}

function viewPasswords() {
    const rows = db.prepare(`
        select name, password from passwords`).all();
    
    rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.name} => ${row.password}`);
    });

    showMenu();
}
function promptManageNewPassword() {
    const name = prompt("Enter name for password: ");
    const password = prompt("Enter password to save: ");
    const stmt = db.prepare(`
        insert or replace into passwords (name, password)
        values (?, ?)
    `);
    stmt.run(name, password);
    showMenu();
}

async function compareHashedPassword(password) {
    const row = db.prepare(`select hash from master where id = 1`).get();
    return await bcrypt.compare(password, row.hash);
}

function promptNewPassword() {
    const response = prompt("Enter a master Password: ");
    saveNewPassword(response)
}

async function promptOldPassword() {
    const response = prompt("Enter your master Password: ");
    const result = await compareHashedPassword(response);
    if (result) {
        console.log("Password Verified.");
        showMenu();
    } else {
        console.log("Password incorrect. ");
        promptOldPassword();
    }
}

const masterExists = db.prepare(`select hash from master where id = 1`).get()
if (!masterExists) promptNewPassword();
else promptOldPassword();