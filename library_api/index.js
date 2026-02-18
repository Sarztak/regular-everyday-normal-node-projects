import express from "express";
import router from "./routes/index.js";

const app = express();
const PORT = `3000`;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_req, res) => {
  res.json({message: 'ok'});
});

app.use("/api", router);

app.use((err, _req, res) => {
  const {message, stack, statusCode} = err;
  console.error(message, stack);
  res.status(statusCode || 500).json({message});
});

