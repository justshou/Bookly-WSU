-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2026 at 11:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookly_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `access_id` varchar(50) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `book_image_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `author`, `access_id`, `isbn`, `book_image_url`) VALUES
(1, 'The Hobbit', 'J.R.R. Tolkien', 'hk2501', '9780547928227', 'https://cdng.europosters.eu/pod_public/1300/116136.jpg'),
(2, 'Percy Jackson & The Lightning Thief', 'Rick Riordan', 'hk2501', '9780786838653', 'https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg'),
(3, 'Campbell Biology (12th Edition)', 'Lisa Urry, Michael Cain, Steven Wasserman, Peter Minorsky, Jane Reece', NULL, '9780135988046', 'https://scienceshepherd.com/cdn/shop/products/science-shepherd-homeschooling-chemistry-curriculum-textbook-cover-min_1200x.jpg?v=1689907604'),
(4, 'The Catcher in the Rye', 'J. D. Salinger', NULL, '9780316769488', 'https://npr.brightspotcdn.com/legacy/sites/wkar/files/catcher_in_the_rye_cover.png'),
(5, 'Introduction to Algorithms (3rd Edition)', 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', NULL, '9780262033848', 'https://m.media-amazon.com/images/I/81ZnMSwkQwL._UF1000,1000_QL80_.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
