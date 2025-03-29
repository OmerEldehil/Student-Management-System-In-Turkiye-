-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2025 at 11:21 AM
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
-- Database: `student_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `grublar`
--

CREATE TABLE `grublar` (
  `id` int(11) NOT NULL,
  `il_id` varchar(30) NOT NULL,
  `il_ad` varchar(30) NOT NULL,
  `grub_ismi` varchar(50) NOT NULL,
  `grub_baskani` varchar(50) NOT NULL,
  `baskan_tel` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grublar`
--

INSERT INTO `grublar` (`id`, `il_id`, `il_ad`, `grub_ismi`, `grub_baskani`, `baskan_tel`) VALUES
(1, 'antalya', 'Antalya', 'Omer Kral Grubuuu', 'Omer Eldehil', '5312345678');

-- --------------------------------------------------------

--
-- Table structure for table `iller`
--

CREATE TABLE `iller` (
  `id` int(11) NOT NULL,
  `il_id` varchar(30) NOT NULL,
  `ad` varchar(30) NOT NULL,
  `sube_varmi` varchar(10) NOT NULL,
  `temsilcilik_varmi` varchar(10) NOT NULL,
  `grub_varmi` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `iller`
--

INSERT INTO `iller` (`id`, `il_id`, `ad`, `sube_varmi`, `temsilcilik_varmi`, `grub_varmi`) VALUES
(1, 'adana', 'Adana', 'yok', 'var', 'yok'),
(2, 'adiyaman', 'Adıyaman', 'yok', 'yok', 'yok'),
(3, 'afyonkarahisar', 'Afyonkarahisar', 'var', 'yok', 'yok'),
(4, 'agri', 'Ağrı', 'var', 'yok', 'yok'),
(5, 'aksaray', 'Aksaray', 'yok', 'yok', 'yok'),
(6, 'amasya', 'Amasya', 'yok', 'yok', 'yok'),
(7, 'ankara', 'Ankara', 'yok', 'yok', 'yok'),
(8, 'antalya', 'Antalya', 'yok', 'yok', 'var'),
(9, 'ardahan', 'Ardahan', 'yok', 'yok', 'yok'),
(10, 'artvin', 'Artvin', 'yok', 'yok', 'yok'),
(11, 'aydin', 'Aydın', 'yok', 'yok', 'yok'),
(12, 'balikesir', 'Balıkesir', 'yok', 'yok', 'yok'),
(13, 'batman', 'Batman', 'yok', 'yok', 'var'),
(14, 'bartin', 'Bartın', 'yok', 'yok', 'yok'),
(15, 'bayburt', 'Bayburt', 'yok', 'yok', 'yok'),
(16, 'bilecik', 'Bilecik', 'yok', 'yok', 'yok'),
(17, 'bingol', 'Bingöl', 'yok', 'yok', 'yok'),
(18, 'bitlis', 'Bitlis', 'yok', 'yok', 'yok'),
(19, 'bolu', 'Bolu', 'yok', 'yok', 'yok'),
(20, 'burdur', 'Burdur', 'yok', 'yok', 'yok'),
(21, 'bursa', 'Bursa', 'var', 'yok', 'yok'),
(22, 'canakkale', 'Çanakkale', 'yok', 'yok', 'yok'),
(23, 'cankiri', 'Çankırı', 'yok', 'var', 'yok'),
(24, 'corum', 'Çorum', 'yok', 'yok', 'yok'),
(25, 'denizli', 'Denizli', 'yok', 'yok', 'yok'),
(26, 'diyarbakir', 'Diyarbakır', 'yok', 'yok', 'yok'),
(27, 'duzce', 'Düzce', 'yok', 'yok', 'yok'),
(28, 'edirne', 'Edirne', 'yok', 'yok', 'yok'),
(29, 'elazig', 'Elazığ', 'var', 'yok', 'yok'),
(30, 'erzincan', 'Erzincan', 'yok', 'yok', 'yok'),
(31, 'erzurum', 'Erzurum', 'yok', 'yok', 'yok'),
(32, 'eskisehir', 'Eskişehir', 'yok', 'yok', 'yok'),
(33, 'gaziantep', 'Gaziantep', 'yok', 'yok', 'yok'),
(34, 'giresun', 'Giresun', 'yok', 'yok', 'yok'),
(35, 'gumushane', 'Gümüşhane', 'yok', 'yok', 'yok'),
(36, 'hakkari', 'Hakkâri', 'yok', 'yok', 'yok'),
(37, 'hatay', 'Hatay', 'yok', 'yok', 'yok'),
(38, 'isparta', 'Isparta', 'yok', 'yok', 'yok'),
(39, 'istanbul', 'İstanbul', 'var', 'yok', 'yok'),
(40, 'izmir', 'İzmir', 'yok', 'yok', 'yok'),
(41, 'igdir', 'Iğdır', 'yok', 'yok', 'yok'),
(42, 'kahramanmaras', 'Kahramanmaraş', 'yok', 'yok', 'yok'),
(43, 'karabuk', 'Karabük', 'yok', 'var', 'yok'),
(44, 'karaman', 'Karaman', 'yok', 'yok', 'yok'),
(45, 'kars', 'Kars', 'yok', 'yok', 'yok'),
(46, 'kastamonu', 'Kastamonu', 'yok', 'yok', 'yok'),
(47, 'kayseri', 'Kayseri', 'yok', 'yok', 'yok'),
(48, 'kilis', 'Kilis', 'yok', 'yok', 'yok'),
(49, 'kirikkale', 'Kırıkkale', 'yok', 'yok', 'yok'),
(50, 'kirklareli', 'Kırklareli', 'yok', 'yok', 'yok'),
(51, 'kirsehir', 'Kırşehir', 'yok', 'yok', 'yok'),
(52, 'kocaeli', 'Kocaeli', 'var', 'yok', 'yok'),
(53, 'konya', 'Konya', 'yok', 'yok', 'yok'),
(54, 'kutahya', 'Kütahya', 'yok', 'yok', 'yok'),
(55, 'malatya', 'Malatya', 'yok', 'yok', 'yok'),
(56, 'manisa', 'Manisa', 'yok', 'yok', 'yok'),
(57, 'mardin', 'Mardin', 'yok', 'yok', 'yok'),
(58, 'mersin', 'Mersin', 'var', 'yok', 'yok'),
(59, 'mugla', 'Muğla', 'yok', 'yok', 'yok'),
(60, 'mus', 'Muş', 'yok', 'yok', 'yok'),
(61, 'nevsehir', 'Nevşehir', 'yok', 'yok', 'yok'),
(62, 'nigde', 'Niğde', 'yok', 'yok', 'yok'),
(63, 'osmaniye', 'Osmaniye', 'yok', 'yok', 'yok'),
(64, 'ordu', 'Ordu', 'yok', 'yok', 'yok'),
(65, 'rize', 'Rize', 'yok', 'yok', 'yok'),
(66, 'sakarya', 'Sakarya', 'yok', 'yok', 'yok'),
(67, 'samsun', 'Samsun', 'var', 'yok', 'yok'),
(68, 'siirt', 'Siirt', 'yok', 'yok', 'yok'),
(69, 'sinop', 'Sinop', 'yok', 'yok', 'yok'),
(70, 'sivas', 'Sivas', 'yok', 'yok', 'yok'),
(71, 'sanliurfa', 'Şanlıurfa', 'var', 'yok', 'yok'),
(72, 'sirnak', 'Şırnak', 'yok', 'yok', 'yok'),
(73, 'tekirdag', 'Tekirdağ', 'yok', 'yok', 'yok'),
(74, 'tokat', 'Tokat', 'yok', 'yok', 'yok'),
(75, 'trabzon', 'Trabzon', 'yok', 'yok', 'yok'),
(76, 'tunceli', 'Tunceli', 'yok', 'yok', 'yok'),
(77, 'usak', 'Uşak', 'yok', 'yok', 'yok'),
(78, 'van', 'Van', 'yok', 'var', 'yok'),
(79, 'yalova', 'Yalova', 'yok', 'yok', 'yok'),
(80, 'yozgat', 'Yozgat', 'yok', 'yok', 'yok'),
(81, 'zonguldak', 'Zonguldak', 'yok', 'yok', 'yok'),
(82, 'kuzey-kibris', 'Kuzey Kıbrıs', 'yok', 'yok', 'yok'),
(83, 'guney-kibris', 'Güney Kıbrıs', 'yok', 'yok', 'yok');

-- --------------------------------------------------------

--
-- Table structure for table `ogrenciler`
--

CREATE TABLE `ogrenciler` (
  `id` int(11) NOT NULL,
  `adsoyad` varchar(40) NOT NULL,
  `universite` varchar(50) NOT NULL,
  `bolum` varchar(40) NOT NULL,
  `sinif` enum('Hazırlık','1','2','3','4','5','6','Mezun') NOT NULL,
  `tel` varchar(15) NOT NULL,
  `memleket` varchar(30) NOT NULL,
  `akademik` enum('Evet','Hayır') NOT NULL,
  `burs` enum('Evet','Hayır') NOT NULL,
  `note` varchar(100) DEFAULT NULL,
  `il` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ogrenciler`
--

INSERT INTO `ogrenciler` (`id`, `adsoyad`, `universite`, `bolum`, `sinif`, `tel`, `memleket`, `akademik`, `burs`, `note`, `il`) VALUES
(1, 'Ömer Eldehil', 'Fırat Üniversitesi', 'Adli Bilişim Mühendisliği', '3', '0531 234 56 78', 'Şanlıurfa', 'Hayır', 'Hayır', NULL, 'elazig'),
(4, 'Ahmet Koç', 'Fırat Üniversitesi', 'Bilgisayar Mühendisliği', '2', '0531 234 56 78', 'Ankara', 'Hayır', 'Evet', NULL, 'elazig'),
(5, 'Socrates', 'Harran Üniversitesi', 'Felsefe', 'Hazırlık', '0531 234 56 78', 'Şanlıurfa', 'Evet', 'Evet', '&ccedil;ok zeki biri', 'sanliurfa'),
(6, 'Emre Can', 'Ankara Yıldirım Beyazit Üniversitesi', 'Bilgisayar Mühendisliği', '4', '0531 234 56 78', 'İstanbul', 'Hayır', 'Hayır', NULL, 'ankara'),
(7, 'Enes', 'İstanbul Rumeli Üniversitesi', 'Eczacılık', '2', '0531 234 56 78', 'Gaziantep', 'Evet', 'Hayır', 'dddddd', 'istanbul'),
(8, 'Kemal', 'Van Yüzüncü Yıl Üniversitesi', 'Diş Hekimliği', '5', '0531 234 56 78', 'Ağrı', 'Hayır', 'Hayır', NULL, 'van'),
(9, 'Ömer Eldehil', 'Harran Üniversitesi', 'Eczacılık', '1', '0531 234 56 78', 'Diyarbakır', 'Hayır', 'Hayır', NULL, 'sanliurfa'),
(10, 'A', 'Ahi Evran Üniversitesi', 'Bilgisayar Mühendisliği', '3', '0531 234 56 78', 'Bartın', 'Evet', 'Evet', NULL, 'sivas');

-- --------------------------------------------------------

--
-- Table structure for table `registration_requests`
--

CREATE TABLE `registration_requests` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `md5_pass` varchar(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `email` varchar(30) NOT NULL,
  `md5_pass` varchar(32) NOT NULL,
  `accepted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `role`, `email`, `md5_pass`, `accepted_at`) VALUES
(1, 'omereldehil', 'admin', 'hsabiltani@gmail.com', '7ca01686de577e95c22e2036ffd01598', '2024-05-21 02:28:31'),
(5, 'deneme333', 'user', '', '7ca01686de577e95c22e2036ffd01598', '2025-03-27 15:55:10'),
(6, 'kullaniiiiiiii', 'user', '', '7ca01686de577e95c22e2036ffd01598', '2025-03-27 16:19:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grublar`
--
ALTER TABLE `grublar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iller`
--
ALTER TABLE `iller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ogrenciler`
--
ALTER TABLE `ogrenciler`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration_requests`
--
ALTER TABLE `registration_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grublar`
--
ALTER TABLE `grublar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `iller`
--
ALTER TABLE `iller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `ogrenciler`
--
ALTER TABLE `ogrenciler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `registration_requests`
--
ALTER TABLE `registration_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
