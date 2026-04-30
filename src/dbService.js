const mysql = require("mysql2");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database status: " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllBooks() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM books";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertBook({ book_name, author, access_id, isbn, book_image_url }) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO books (book_name, author, access_id, isbn, book_image_url) VALUES (?, ?, ?, ?, ?)`;
        const params = [
          book_name || null,
          author || null,
          access_id || null,
          isbn || null,
          book_image_url || null,
        ];

        connection.query(query, params, (err, result) => {
          if (err) return reject(new Error(err.message));
          resolve({ insertId: result.insertId });
        });
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // function to reserve books by adding a user id
  async reserveBook(id, access_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `
        UPDATE books
        SET access_id = ?
        WHERE id = ? AND access_id IS NULL
      `;

        connection.query(query, [access_id, id], (err, result) => {
          if (err) return reject(new Error(err.message));

          resolve({
            success: result.affectedRows > 0,
          });
        });
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = DbService;
