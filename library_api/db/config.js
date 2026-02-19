import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db/database.sqlite"
});

try {
    db.authenticate();
} catch (error) {
    console.error(error);
}

export default {
    Sequelize,
    db
};