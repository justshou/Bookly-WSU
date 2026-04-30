import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dbService from "./dbService.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPublic = path.join(__dirname, "../public");

// Parse incoming JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPublic));

// Use index.html as our default page
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPublic, "index.html"));
});

// Endpoint to receive JSON at /newBook, right now it doesn't store it anywhere but eventually it'll be sent to our MySQL database
// CREATE
app.post("/insert", (req, res) => {
  console.log("POST /insert body:", req.body);

  const db = dbService.getDbServiceInstance();

  const { book_name, author, isbn, book_image_url } = req.body;

  db.insertBook({
    book_name,
    author,
    access_id: null,
    isbn,
    book_image_url,
  })
    .then((result) => {
      res.json({ status: "ok", insertedId: result.insertId });
    })
    .catch((err) => {
      console.error("Insert error:", err);
      res.status(500).json({ status: "error", error: err.message });
    });
});

//app.use("/routes/databaseRoute.js");

// READ
app.get("/getAllBooks", (req, res) => {
  const db = dbService.getDbServiceInstance();

  // Query the database and return JSON
  db.getAllBooks()
    .then((result) => {
      // result should be an array of book objects
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Failed to fetch books" });
    });
});

// for user saving
app.post("/reserveBook", (req, res) => {
  const db = dbService.getDbServiceInstance();
  const { id, access_id } = req.body;

  db.reserveBook(id, access_id)
    .then((result) => {
      if (result.success) {
        res.json({ status: "ok", message: "Book reserved successfully" });
      } else {
        res.json({ status: "reserved", message: "Book is already reserved" });
      }
    })
    .catch((err) => {
      console.error("Reserve error:", err);
      res.status(500).json({ status: "error", error: err.message });
    });
});

// Print whenever we start the server
app.listen(process.env.PORT, () =>
  console.log(`Server listening on http://localhost:${process.env.PORT}`),
);
