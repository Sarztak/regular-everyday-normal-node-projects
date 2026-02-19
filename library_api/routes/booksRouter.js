import { Router } from "express";
import Book from "../models/book.js"
const booksRouter = Router();

// put is to update the user and post is to create new user
booksRouter.put("/:id", async (req, res, next) => {
    const {id} = req.params;
    const {title, author} = req.body;
    try {
        const book = await Book.update({title, author}, {where: {id}});
        res.json(book);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

booksRouter.delete("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        const book = await Book.destroy({where: {id}});
        res.json(book);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

booksRouter.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        const book = await Book.findByPk(id);
        res.json(book);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

// post is used to create new records, post is used to create new records
// post is used to create new records, post is used to create new records
// post is used to create new records, post is used to create new records
booksRouter.post("/", async (req, res, next) => {
    const {title, author} = req.body;
    try {
        const book = await Book.create({title, author});
        res.json(book);
    } catch (error) {
        console.log(error.message);
        next(error)
    }
})
export default booksRouter;
