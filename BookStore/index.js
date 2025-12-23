import express from "express";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Bookstore API running on port ${PORT}`);
});
