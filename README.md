# Bookly

Bookly is a University Application used for checking out copies of books for students.

## Prerequisites

- **Node.js** (v14 or later) and npm (Node Package Manager)
- **MySQL** (Ensure that you have MySQL installed and running)

## Installation & Setup

Clone the repository

```bash
git clone https://github.com/justshou/bookly-wsu.git
```

Inside the newly cloned directory, run the following to install dependencies

```bash
npm install
```

Next, download and install [XAMPP](https://www.apachefriends.org/) to set up a MySQL Database

After installation, run XAMPP and start Apache and MySQL.

Click "Admin" for MySQL, and run the following under "SQL" at the top

```sql
CREATE DATABASE bookly_db;

USE bookly_db;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    access_id TEXT,
    isbn VARCHAR(20),
    book_image_url TEXT
);

```

Finally, rename the provided `dotenv` to `.env`

## Usage

To start the frontend application, run the following

```bash
npm run dev
```

The first will insert just one book. The next SQL query will insert another 4.

```sql
INSERT INTO books (book_name, author, access_id, isbn, book_image_url)
VALUES (
    'The Hobbit',
    'J.R.R. Tolkien',
    NULL,
    '9780547928227',
    'https://example.com/hobbit.jpg'
);

INSERT INTO `books` (`id`, `book_name`, `author`, `access_id`, `isbn`, `book_image_url`) VALUES
(2, 'Percy Jackson & The Lightning Thief', 'Rick Riordan', 'hk2501', '9780786838653', 'https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg'),
(3, 'Campbell Biology (12th Edition)', 'Lisa Urry, Michael Cain, Steven Wasserman, Peter Minorsky, Jane Reece', NULL, '9780135988046', 'https://scienceshepherd.com/cdn/shop/products/science-shepherd-homeschooling-chemistry-curriculum-textbook-cover-min_1200x.jpg?v=1689907604'),
(4, 'The Catcher in the Rye', 'J. D. Salinger', NULL, '9780316769488', 'https://npr.brightspotcdn.com/legacy/sites/wkar/files/catcher_in_the_rye_cover.png'),
(5, 'Introduction to Algorithms (3rd Edition)', 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', NULL, '9780262033848', 'https://m.media-amazon.com/images/I/81ZnMSwkQwL._UF1000,1000_QL80_.jpg');
```

If you know how to use phpMyAdmin, you can use the provided "books_db.sql" file and import this entire database directly.

## Development Team

Anthony Mashou\
Vincent Nguyen
