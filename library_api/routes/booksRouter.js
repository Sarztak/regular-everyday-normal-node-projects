import { Router } from "express";
const booksRouter = Router();

booksRouter.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        const book = {id};
        res.json(book);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

export default booksRouter;
