import { writeFileSync } from "fs";
import { createInterface } from "readline";

const content = "test content !";

async function readLineAsync(message) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const answer = await readline.question(message);
    return answer
}


try {
    writeFileSync("./test.txt", content);
    console.log("success");
} catch (error) {
    console.error(error);
}