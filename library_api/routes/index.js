import {Router} from "express";
import booksRouter from "./booksRouter";


const mainRouter = Router();
mainRouter.use('/books', booksRouter);

export default mainRouter;

