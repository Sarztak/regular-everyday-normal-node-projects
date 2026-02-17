import bcrypt from "bcrypt";
import promptModule from "prompt-sync";

const prompt = promptModule();
const mockDB = {passwords: {}};

function saveNewPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    mockDB.hash = hash;
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
    const { passwords } = mockDB;
    Object.entries(passwords).forEach(([key, value], index) => {
        console.log(`${index + 1}. ${key} => ${value}`);
    });
    showMenu();
}
function promptManageNewPassword() {
    const name = prompt("Enter name for password: ");
    const password = prompt("Enter password to save: ");
    mockDB.passwords[name] = password;
    showMenu();
}

async function compareHashedPassword(password) {
    const { hash } = mockDB;
    return await bcrypt.compare(password, hash);
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

if (!mockDB.hash) promptNewPassword();
else promptOldPassword();
