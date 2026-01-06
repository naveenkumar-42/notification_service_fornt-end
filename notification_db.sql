-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 05, 2026 at 05:38 PM
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
-- Database: `notification_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `id` bigint(20) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `event_id` bigint(20) NOT NULL,
  `timestamp` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_log`
--

INSERT INTO `audit_log` (`id`, `action`, `details`, `event_id`, `timestamp`) VALUES
(1, 'CREATED', 'Notification created', 34, '2025-12-16 06:27:44.000000'),
(2, 'PENDING', 'Will retry: Failed to send HTML email: Illegal address', 34, '2025-12-16 06:27:44.000000'),
(3, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 34, '2025-12-16 06:27:44.000000'),
(4, 'CREATED', 'Notification created', 35, '2025-12-16 06:31:14.000000'),
(5, 'PENDING', 'Will retry: Failed to send HTML email: Illegal address', 35, '2025-12-16 06:31:14.000000'),
(6, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 35, '2025-12-16 06:31:14.000000'),
(7, 'CREATED', 'Notification created', 36, '2025-12-16 06:34:45.000000'),
(8, 'DELIVERED', 'Notification delivered successfully via EMAIL', 36, '2025-12-16 06:34:49.000000'),
(9, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 36, '2025-12-16 06:34:51.000000'),
(10, 'CREATED', 'Notification created', 37, '2025-12-16 06:41:12.000000'),
(11, 'DELIVERED', 'Notification delivered successfully via EMAIL', 37, '2025-12-16 06:41:16.000000'),
(12, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 37, '2025-12-16 06:41:17.000000'),
(13, 'CREATED', 'Notification created', 38, '2025-12-16 08:36:03.000000'),
(14, 'PENDING', 'Will retry: Unsupported channel: ORDER_CONFIRMATION', 38, '2025-12-16 08:36:03.000000'),
(15, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 38, '2025-12-16 08:36:03.000000'),
(16, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 38, '2025-12-16 08:36:03.000000'),
(17, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 38, '2025-12-16 08:36:03.000000'),
(18, 'FAILED', 'Max retries (3) exceeded: Unknown channel: ORDER_CONFIRMATION', 38, '2025-12-16 08:36:03.000000'),
(19, 'CREATED', 'Notification created', 39, '2025-12-16 08:37:31.000000'),
(20, 'PENDING', 'Will retry: Unsupported channel: PROMOTIONAL', 39, '2025-12-16 08:37:31.000000'),
(21, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 39, '2025-12-16 08:37:36.000000'),
(22, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 39, '2025-12-16 08:37:36.000000'),
(23, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 39, '2025-12-16 08:37:36.000000'),
(24, 'FAILED', 'Max retries (3) exceeded: Unknown channel: PROMOTIONAL', 39, '2025-12-16 08:37:36.000000'),
(25, 'CREATED', 'Notification created', 40, '2025-12-16 08:42:16.000000'),
(26, 'DELIVERED', 'Notification delivered successfully via EMAIL', 40, '2025-12-16 08:42:20.000000'),
(27, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 40, '2025-12-16 08:42:21.000000'),
(28, 'CREATED', 'Notification created', 41, '2025-12-16 09:02:06.000000'),
(29, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 41, '2025-12-16 09:02:08.000000'),
(30, 'SENT', 'Notification sent successfully to +919361954896', 41, '2025-12-16 09:02:11.000000'),
(31, 'CREATED', 'Notification created', 42, '2025-12-16 09:13:10.000000'),
(32, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 42, '2025-12-16 09:13:12.000000'),
(33, 'SENT', 'Notification sent successfully to +919361954896', 42, '2025-12-16 09:13:16.000000'),
(34, 'CREATED', 'Notification created', 43, '2025-12-16 09:16:50.000000'),
(35, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 43, '2025-12-16 09:16:53.000000'),
(36, 'SENT', 'Notification sent successfully to 9361954896@gmail.com', 43, '2025-12-16 09:16:56.000000'),
(37, 'CREATED', 'Notification created', 44, '2025-12-16 09:18:01.000000'),
(38, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 44, '2025-12-16 09:18:02.000000'),
(39, 'SENT', 'Notification sent successfully to +919361954896', 44, '2025-12-16 09:18:06.000000'),
(40, 'CREATED', 'Notification created', 45, '2025-12-16 09:24:05.000000'),
(41, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 45, '2025-12-16 09:24:06.000000'),
(42, 'SENT', 'Notification sent successfully to +919361954896', 45, '2025-12-16 09:24:10.000000'),
(43, 'CREATED', 'Notification created', 46, '2025-12-16 09:27:40.000000'),
(44, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 46, '2025-12-16 09:27:41.000000'),
(45, 'SENT', 'Notification sent successfully to +919361954896', 46, '2025-12-16 09:27:45.000000'),
(46, 'CREATED', 'Notification created', 47, '2025-12-16 09:34:38.000000'),
(47, 'PENDING', 'Will retry: Failed to send SMS: Authenticate', 47, '2025-12-16 09:34:39.000000'),
(48, 'SENT', 'Notification sent successfully to +919361954896', 47, '2025-12-16 09:34:43.000000'),
(49, 'CREATED', 'Notification created', 48, '2025-12-16 09:38:32.000000'),
(50, 'DELIVERED', 'Notification delivered successfully via SMS', 48, '2025-12-16 09:38:33.000000'),
(51, 'SENT', 'Notification sent successfully to +919361954896', 48, '2025-12-16 09:38:37.000000'),
(52, 'CREATED', 'Notification created', 49, '2025-12-16 09:40:39.000000'),
(53, 'PENDING', 'Will retry: Unsupported channel: USER_SIGNUP', 49, '2025-12-16 09:40:39.000000'),
(54, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 49, '2025-12-16 09:40:44.000000'),
(55, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 49, '2025-12-16 09:40:44.000000'),
(56, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 49, '2025-12-16 09:40:44.000000'),
(57, 'FAILED', 'Max retries (3) exceeded: Unknown channel: USER_SIGNUP', 49, '2025-12-16 09:40:44.000000'),
(58, 'CREATED', 'Notification created', 50, '2025-12-16 09:41:06.000000'),
(59, 'PENDING', 'Will retry: Failed to send SMS: Invalid \'To\' Phone Number: +1936195XXXX', 50, '2025-12-16 09:41:07.000000'),
(60, 'SENT', 'Notification sent successfully to 9361954896', 50, '2025-12-16 09:41:11.000000'),
(61, 'CREATED', 'Notification created', 51, '2025-12-16 09:42:32.000000'),
(62, 'PENDING', 'Will retry: Unsupported channel: USER_SIGNUP', 51, '2025-12-16 09:42:32.000000'),
(63, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 51, '2025-12-16 09:42:32.000000'),
(64, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 51, '2025-12-16 09:42:32.000000'),
(65, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 51, '2025-12-16 09:42:32.000000'),
(66, 'FAILED', 'Max retries (3) exceeded: Unknown channel: USER_SIGNUP', 51, '2025-12-16 09:42:32.000000'),
(67, 'CREATED', 'Notification created', 52, '2025-12-16 09:42:52.000000'),
(68, 'DELIVERED', 'Notification delivered successfully via SMS', 52, '2025-12-16 09:42:53.000000'),
(69, 'SENT', 'Notification sent successfully to +919361954896', 52, '2025-12-16 09:42:58.000000'),
(70, 'CREATED', 'Notification created', 53, '2025-12-16 09:44:09.000000'),
(71, 'PENDING', 'Will retry: Failed to send SMS: The number +91944499XXXX is unverified. Trial accounts cannot send messages to unverified numbers; verify +91944499XXXX at twilio.com/user/account/phone-numbers/verified, or purchase a Twilio number to send messages to unverified numbers', 53, '2025-12-16 09:44:09.000000'),
(72, 'SENT', 'Notification sent successfully to +919444991878', 53, '2025-12-16 09:44:14.000000'),
(73, 'CREATED', 'Notification created', 54, '2025-12-16 09:47:57.000000'),
(74, 'DELIVERED', 'Notification delivered successfully via EMAIL', 54, '2025-12-16 09:48:02.000000'),
(75, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 54, '2025-12-16 09:48:02.000000'),
(76, 'CREATED', 'Notification created', 55, '2025-12-16 09:48:33.000000'),
(77, 'DELIVERED', 'Notification delivered successfully via EMAIL', 55, '2025-12-16 09:48:38.000000'),
(78, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 55, '2025-12-16 09:48:38.000000'),
(79, 'CREATED', 'Notification created', 56, '2025-12-16 10:18:21.000000'),
(80, 'DELIVERED', 'Notification delivered successfully via EMAIL', 56, '2025-12-16 10:18:27.000000'),
(81, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 56, '2025-12-16 10:18:32.000000'),
(82, 'CREATED', 'Notification created', 57, '2025-12-16 10:29:39.000000'),
(83, 'DELIVERED', 'Notification delivered successfully via EMAIL', 57, '2025-12-16 10:29:44.000000'),
(84, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 57, '2025-12-16 10:29:44.000000'),
(85, 'CREATED', 'Notification created', 58, '2025-12-16 10:31:07.000000'),
(86, 'PENDING', 'Will retry: Failed to send SMS: The number +91936135XXXX is unverified. Trial accounts cannot send messages to unverified numbers; verify +91936135XXXX at twilio.com/user/account/phone-numbers/verified, or purchase a Twilio number to send messages to unverified numbers', 58, '2025-12-16 10:31:09.000000'),
(87, 'SENT', 'Notification sent successfully to +919361354896', 58, '2025-12-16 10:31:12.000000'),
(88, 'CREATED', 'Notification created', 59, '2025-12-17 04:24:51.000000'),
(89, 'DELIVERED', 'Notification delivered successfully via EMAIL', 59, '2025-12-17 04:24:57.000000'),
(90, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 59, '2025-12-17 04:25:02.000000'),
(91, 'CREATED', 'Notification created', 60, '2025-12-17 04:25:26.000000'),
(92, 'DELIVERED', 'Notification delivered successfully via EMAIL', 60, '2025-12-17 04:25:30.000000'),
(93, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 60, '2025-12-17 04:25:31.000000'),
(94, 'CREATED', 'Notification created', 61, '2025-12-17 04:26:46.000000'),
(95, 'PENDING', 'Will retry: Failed to send SMS: Authentication Error - invalid username', 61, '2025-12-17 04:26:48.000000'),
(96, 'SENT', 'Notification sent successfully to +919361954896', 61, '2025-12-17 04:26:52.000000'),
(97, 'CREATED', 'Notification created', 62, '2025-12-17 04:31:08.000000'),
(98, 'PENDING', 'Will retry: Failed to send SMS: Authentication Error - invalid username', 62, '2025-12-17 04:31:09.000000'),
(99, 'SENT', 'Notification sent successfully to +919361954896', 62, '2025-12-17 04:31:13.000000'),
(100, 'CREATED', 'Notification created', 63, '2025-12-17 04:32:30.000000'),
(101, 'DELIVERED', 'Notification delivered successfully via SMS', 63, '2025-12-17 04:32:32.000000'),
(102, 'SENT', 'Notification sent successfully to +919361954896', 63, '2025-12-17 04:32:35.000000'),
(103, 'CREATED', 'Notification created', 64, '2025-12-17 04:35:23.000000'),
(104, 'DELIVERED', 'Notification delivered successfully via SMS', 64, '2025-12-17 04:35:24.000000'),
(105, 'SENT', 'Notification sent successfully to +919361954896', 64, '2025-12-17 04:35:28.000000'),
(106, 'CREATED', 'Notification created and queued', 65, '2025-12-17 08:42:32.000000'),
(107, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 65, '2025-12-17 08:42:37.000000'),
(108, 'CREATED', 'Notification created and queued', 66, '2025-12-17 08:54:20.000000'),
(109, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 66, '2025-12-17 08:54:20.000000'),
(110, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 66, '2025-12-17 08:54:20.000000'),
(111, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 66, '2025-12-17 08:54:20.000000'),
(112, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 66, '2025-12-17 08:54:20.000000'),
(113, 'CREATED', 'Notification created and queued', 67, '2025-12-17 08:55:53.000000'),
(114, 'SENT', 'Notification sent successfully to +919361954896', 67, '2025-12-17 08:55:54.000000'),
(115, 'CREATED', 'Notification created and queued', 68, '2025-12-17 09:12:04.000000'),
(116, 'SENT', 'Notification sent successfully to +919361954896', 68, '2025-12-17 09:12:06.000000'),
(117, 'CREATED', 'Notification created and queued', 69, '2025-12-17 09:44:36.000000'),
(118, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 69, '2025-12-17 09:44:41.000000'),
(119, 'CREATED', 'Notification created and queued', 70, '2025-12-18 03:31:29.000000'),
(120, 'SENT', 'Notification sent successfully to +919361954896', 70, '2025-12-18 03:31:32.000000'),
(121, 'CREATED', 'Notification created and queued', 71, '2025-12-18 06:11:19.000000'),
(122, 'DEAD_LETTERED', 'Message moved to DLQ after max retries', 71, '2025-12-18 06:11:54.000000'),
(123, 'CREATED', 'Notification created and queued', 72, '2025-12-18 06:13:26.000000'),
(124, 'SENT', 'Notification sent successfully to +919361954896', 72, '2025-12-18 06:13:26.000000'),
(125, 'CREATED', 'Notification created and queued', 73, '2025-12-18 06:16:08.000000'),
(126, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 73, '2025-12-18 06:16:15.000000'),
(127, 'CREATED', 'Notification created and queued', 74, '2025-12-18 06:24:46.000000'),
(128, 'SENT', 'Notification sent successfully to naveenkumar.p246810@gmail.com', 74, '2025-12-18 06:24:46.000000'),
(129, 'CREATED', 'Notification created and queued', 75, '2025-12-18 08:21:36.000000'),
(130, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 75, '2025-12-18 08:21:43.000000'),
(131, 'CREATED', 'Notification created and queued', 76, '2025-12-18 10:17:27.000000'),
(132, 'SENT', 'Notification sent successfully to naveenkumar.p246810@gmail.com', 76, '2025-12-18 10:17:47.000000'),
(133, 'CREATED', 'Notification created and queued', 77, '2025-12-19 04:14:29.000000'),
(134, 'SENT', 'Notification sent successfully to naveenkumar.p246810@gmail.com', 77, '2025-12-19 04:14:30.000000'),
(135, 'CREATED', 'Notification created and queued', 78, '2025-12-19 04:32:49.000000'),
(136, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 78, '2025-12-19 04:33:00.000000'),
(137, 'CREATED', 'Notification created and queued', 79, '2025-12-19 04:35:08.000000'),
(138, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 79, '2025-12-19 04:35:20.000000'),
(139, 'CREATED', 'Notification created and queued', 80, '2025-12-19 04:44:35.000000'),
(140, 'SENT', 'Notification sent successfully to +919361954896', 80, '2025-12-19 04:44:37.000000'),
(141, 'CREATED', 'Notification created and queued', 81, '2025-12-19 05:51:50.000000'),
(142, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 81, '2025-12-19 05:51:50.000000'),
(143, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 81, '2025-12-19 05:51:50.000000'),
(144, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 81, '2025-12-19 05:51:50.000000'),
(145, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email: Conversion = \'\"\'', 81, '2025-12-19 05:51:50.000000'),
(146, 'CREATED', 'Notification created and queued', 82, '2025-12-19 05:55:37.000000'),
(147, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 82, '2025-12-19 05:55:37.000000'),
(148, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 82, '2025-12-19 05:55:37.000000'),
(149, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 82, '2025-12-19 05:55:37.000000'),
(150, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 82, '2025-12-19 05:55:37.000000'),
(151, 'CREATED', 'Notification created and queued', 83, '2025-12-19 05:58:55.000000'),
(152, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 83, '2025-12-19 05:59:00.000000'),
(153, 'CREATED', 'Notification created and queued', 84, '2025-12-19 06:05:24.000000'),
(154, 'SENT', 'Notification sent successfully to naveenkumar.p246810@gmail.com', 84, '2025-12-19 06:05:34.000000'),
(155, 'CREATED', 'Notification scheduled for 2025-12-19T12:12', 85, '2025-12-19 06:41:03.000000'),
(156, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 85, '2025-12-19 06:42:21.000000'),
(157, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 85, '2025-12-19 06:42:21.000000'),
(158, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 85, '2025-12-19 06:42:21.000000'),
(159, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 85, '2025-12-19 06:42:21.000000'),
(160, 'CREATED', 'Notification scheduled for 2025-12-19T12:16', 86, '2025-12-19 06:45:01.000000'),
(161, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com ', 86, '2025-12-19 06:47:34.000000'),
(162, 'CREATED', 'Notification created and queued', 87, '2025-12-19 10:34:56.000000'),
(163, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 87, '2025-12-19 10:35:08.000000'),
(164, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 87, '2025-12-19 10:35:08.000000'),
(165, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 87, '2025-12-19 10:35:08.000000'),
(166, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 87, '2025-12-19 10:35:08.000000'),
(167, 'CREATED', 'Notification created and queued', 88, '2025-12-19 10:38:25.000000'),
(168, 'SENT', 'Notification sent successfully to kumarvsoffical@gmail.com', 88, '2025-12-19 10:38:31.000000'),
(169, 'CREATED', 'Notification created and queued', 89, '2025-12-19 10:41:33.000000'),
(170, 'SENT', 'Notification sent successfully to kumarvsofficial@gmail.com', 89, '2025-12-19 10:41:39.000000'),
(171, 'CREATED', 'Notification created and queued', 90, '2025-12-19 10:42:20.000000'),
(172, 'SENT', 'Notification sent successfully to +919361954896', 90, '2025-12-19 10:42:21.000000'),
(173, 'CREATED', 'Notification scheduled for 2025-12-20T11:34', 91, '2025-12-20 06:02:24.000000'),
(174, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 91, '2025-12-20 06:04:22.000000'),
(175, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 91, '2025-12-20 06:04:22.000000'),
(176, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 91, '2025-12-20 06:04:22.000000'),
(177, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Invalid phone number format: naveenkumar.it22@bitsathy.ac.in', 91, '2025-12-20 06:04:22.000000'),
(178, 'CREATED', 'Notification scheduled for 2025-12-20T11:39', 92, '2025-12-20 06:07:25.000000'),
(179, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 92, '2025-12-20 06:09:27.000000'),
(180, 'CREATED', 'Notification created and queued', 93, '2025-12-22 08:19:02.000000'),
(181, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 93, '2025-12-22 08:19:03.000000'),
(182, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 93, '2025-12-22 08:19:03.000000'),
(183, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 93, '2025-12-22 08:19:04.000000'),
(184, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Authenticate', 93, '2025-12-22 08:19:04.000000'),
(185, 'CREATED', 'Notification created and queued', 94, '2025-12-22 08:25:01.000000'),
(186, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 94, '2025-12-22 08:25:02.000000'),
(187, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 94, '2025-12-22 08:25:02.000000'),
(188, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 94, '2025-12-22 08:25:03.000000'),
(189, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Authenticate', 94, '2025-12-22 08:25:03.000000'),
(190, 'CREATED', 'Notification created and queued', 95, '2025-12-22 08:35:20.000000'),
(191, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 95, '2025-12-22 08:35:24.000000'),
(192, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 95, '2025-12-22 08:35:28.000000'),
(193, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 95, '2025-12-22 08:35:32.000000'),
(194, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 95, '2025-12-22 08:35:36.000000'),
(195, 'CREATED', 'Notification created and queued', 96, '2025-12-22 08:36:50.000000'),
(196, 'SENT', 'Notification sent successfully to +919361954896', 96, '2025-12-22 08:36:51.000000'),
(197, 'CREATED', 'Notification created and queued', 97, '2025-12-22 08:40:34.000000'),
(198, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 97, '2025-12-22 08:40:39.000000'),
(199, 'CREATED', 'Notification created and queued', 98, '2025-12-23 03:15:53.000000'),
(200, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 98, '2025-12-23 03:15:59.000000'),
(201, 'CREATED', 'Notification created and queued', 99, '2025-12-24 03:55:45.000000'),
(202, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 99, '2025-12-24 03:55:47.000000'),
(203, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 99, '2025-12-24 03:55:47.000000'),
(204, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 99, '2025-12-24 03:55:48.000000'),
(205, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Authenticate', 99, '2025-12-24 03:55:48.000000'),
(206, 'CREATED', 'Notification created and queued', 100, '2025-12-24 05:46:30.000000'),
(207, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 100, '2025-12-24 05:46:36.000000'),
(208, 'CREATED', 'Notification created and queued', 101, '2025-12-29 04:13:42.000000'),
(209, 'SENT', 'Notification sent successfully to +919361954896', 101, '2025-12-29 04:13:44.000000'),
(210, 'CREATED', 'Notification created and queued', 102, '2025-12-29 05:58:51.000000'),
(211, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 102, '2025-12-29 05:58:56.000000'),
(212, 'CREATED', 'Notification created and queued', 103, '2025-12-29 08:36:45.000000'),
(213, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 103, '2025-12-29 08:36:46.000000'),
(214, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 103, '2025-12-29 08:36:46.000000'),
(215, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 103, '2025-12-29 08:36:46.000000'),
(216, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 103, '2025-12-29 08:36:46.000000'),
(217, 'CREATED', 'Notification scheduled for 2025-12-29T14:42', 104, '2025-12-29 09:11:54.000000'),
(218, 'SENT', 'Notification sent successfully to naveenkumar.it22@bitsathy.ac.in', 104, '2025-12-29 09:12:30.000000'),
(219, 'CREATED', 'Notification created and queued', 105, '2025-12-30 06:04:19.000000'),
(220, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 105, '2025-12-30 06:04:31.000000'),
(221, 'CREATED', 'Notification created and queued', 106, '2025-12-30 06:37:49.000000'),
(222, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 106, '2025-12-30 06:37:51.000000'),
(223, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 106, '2025-12-30 06:37:51.000000'),
(224, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 106, '2025-12-30 06:37:52.000000'),
(225, 'FAILED', 'Max retries (3) exceeded: Failed to send SMS: Authenticate', 106, '2025-12-30 06:37:52.000000'),
(226, 'CREATED', 'Notification created and queued', 107, '2025-12-30 06:41:43.000000'),
(227, 'SENT', 'Notification sent successfully to +919361954896', 107, '2025-12-30 06:41:45.000000'),
(228, 'CREATED', 'Notification created and queued', 108, '2025-12-30 10:19:56.000000'),
(229, 'SENT', 'Notification sent successfully to perinbasaravanank06@gmail.com', 108, '2025-12-30 10:20:02.000000'),
(230, 'CREATED', 'Notification created and queued', 109, '2025-12-30 10:30:59.000000'),
(231, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 109, '2025-12-30 10:30:59.000000'),
(232, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 109, '2025-12-30 10:30:59.000000'),
(233, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 109, '2025-12-30 10:30:59.000000'),
(234, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 109, '2025-12-30 10:30:59.000000'),
(235, 'CREATED', 'Notification created and queued', 110, '2025-12-30 10:36:44.000000'),
(236, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 110, '2025-12-30 10:36:49.000000'),
(237, 'CREATED', 'Notification created and queued', 111, '2026-01-02 17:17:37.000000'),
(238, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 111, '2026-01-02 17:17:37.000000'),
(239, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 111, '2026-01-02 17:17:37.000000'),
(240, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 111, '2026-01-02 17:17:37.000000'),
(241, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 111, '2026-01-02 17:17:37.000000'),
(242, 'CREATED', 'Notification created and queued', 112, '2026-01-05 03:56:53.000000'),
(243, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 112, '2026-01-05 03:56:58.000000'),
(244, 'CREATED', 'Notification created and queued', 113, '2026-01-05 04:15:19.000000'),
(245, 'SENT', 'Notification sent successfully to +919361954896', 113, '2026-01-05 04:15:20.000000'),
(246, 'CREATED', 'Notification created and queued', 114, '2026-01-05 06:05:06.000000'),
(247, 'RETRY_SCHEDULED', 'Retrying notification, attempt 1', 114, '2026-01-05 06:05:06.000000'),
(248, 'RETRY_SCHEDULED', 'Retrying notification, attempt 2', 114, '2026-01-05 06:05:06.000000'),
(249, 'RETRY_SCHEDULED', 'Retrying notification, attempt 3', 114, '2026-01-05 06:05:06.000000'),
(250, 'FAILED', 'Max retries (3) exceeded: Failed to send HTML email', 114, '2026-01-05 06:05:06.000000'),
(251, 'CREATED', 'Notification created and queued', 115, '2026-01-05 08:15:17.000000'),
(252, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 115, '2026-01-05 08:15:22.000000'),
(253, 'CREATED', 'Notification created and queued', 116, '2026-01-05 10:12:19.000000'),
(254, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 116, '2026-01-05 10:12:25.000000'),
(255, 'CREATED', 'Notification created and queued', 117, '2026-01-05 16:33:15.000000'),
(256, 'SENT', 'Notification sent successfully to naveenkumarpoff@gmail.com', 117, '2026-01-05 16:33:21.000000');

-- --------------------------------------------------------

--
-- Table structure for table `notification_event`
--

CREATE TABLE `notification_event` (
  `id` bigint(20) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `scheduled_at` datetime(6) DEFAULT NULL,
  `failure_reason` varchar(255) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `recipient` varchar(255) NOT NULL,
  `retry_count` int(11) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `notification_type` varchar(100) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_event`
--

INSERT INTO `notification_event` (`id`, `channel`, `created_at`, `scheduled_at`, `failure_reason`, `message`, `subject`, `recipient`, `retry_count`, `priority`, `notification_type`, `status`, `updated_at`) VALUES
(1, 'EMAIL', '2025-12-13 10:28:27.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-13 10:28:27.000000'),
(2, 'EMAIL', '2025-12-13 10:33:45.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-13 10:33:45.000000'),
(3, 'EMAIL', '2025-12-13 10:48:55.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-13 10:48:55.000000'),
(4, 'EMAIL', '2025-12-13 10:49:54.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-13 10:49:54.000000'),
(5, 'EMAIL', '2025-12-13 10:51:34.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-13 10:51:34.000000'),
(6, 'PUSH', '2025-12-15 04:08:41.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'MEDIUM', 'GENERAL', 'PENDING', '2025-12-15 04:08:41.000000'),
(7, 'EMAIL', '2025-12-15 04:15:02.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 04:15:02.000000'),
(8, 'EMAIL', '2025-12-15 04:17:53.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 04:17:53.000000'),
(9, 'EMAIL', '2025-12-15 04:24:07.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 04:24:07.000000'),
(10, 'PUSH', '2025-12-15 04:24:27.000000', NULL, NULL, 'vanakam da mapala', NULL, 'naveenkumarpoff@gmail.com', 0, 'MEDIUM', 'GENERAL', 'PENDING', '2025-12-15 04:24:27.000000'),
(11, 'EMAIL', '2025-12-15 04:37:23.000000', NULL, NULL, 'test', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 04:37:23.000000'),
(12, 'SMS', '2025-12-15 04:38:10.000000', NULL, NULL, 'hi there', NULL, 'naveenkumar.p246810@gmail.com', 0, 'HIGH', 'PROMOTIONAL', 'PENDING', '2025-12-15 04:38:10.000000'),
(13, 'SMS', '2025-12-15 05:47:22.000000', NULL, NULL, 'notification test\n', NULL, 'naveenkumar.p246810@gmail.com', 0, 'HIGH', 'PROMOTIONAL', 'PENDING', '2025-12-15 05:47:22.000000'),
(14, 'EMAIL', '2025-12-15 06:06:36.000000', NULL, NULL, 'awesome', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 06:06:36.000000'),
(15, 'EMAIL', '2025-12-15 06:06:55.000000', NULL, NULL, 'nk42\n', NULL, 'nk@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 06:06:55.000000'),
(16, 'EMAIL', '2025-12-15 06:07:04.000000', NULL, NULL, '234', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 06:07:04.000000'),
(17, 'EMAIL', '2025-12-15 06:10:53.000000', NULL, NULL, 'hi there', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 06:10:53.000000'),
(18, 'EMAIL', '2025-12-15 09:07:04.000000', NULL, NULL, 'hi there', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 09:07:04.000000'),
(19, 'EMAIL', '2025-12-15 09:24:01.000000', NULL, NULL, 'ads', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 09:24:01.000000'),
(20, 'EMAIL', '2025-12-15 09:31:52.000000', NULL, NULL, 'hi there', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 09:31:52.000000'),
(21, 'EMAIL', '2025-12-15 09:33:41.000000', NULL, NULL, '2w', NULL, 'naveenkumar.p246810@gmail.com', 0, 'LOW', 'GENERAL', 'PENDING', '2025-12-15 09:33:41.000000'),
(23, 'EMAIL', '2025-12-16 04:13:46.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'test@example.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:13:46.000000'),
(24, 'EMAIL', '2025-12-16 04:14:36.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:14:36.000000'),
(25, 'EMAIL', '2025-12-16 04:22:05.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:22:05.000000'),
(26, 'EMAIL', '2025-12-16 04:25:23.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:25:23.000000'),
(27, 'EMAIL', '2025-12-16 04:35:05.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:35:05.000000'),
(28, 'EMAIL', '2025-12-16 04:39:17.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:39:17.000000'),
(29, 'EMAIL', '2025-12-16 04:57:43.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 04:57:43.000000'),
(30, 'EMAIL', '2025-12-16 05:33:21.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 05:33:21.000000'),
(31, 'EMAIL', '2025-12-16 05:38:40.000000', NULL, '', 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 05:38:40.000000'),
(32, 'PUSH', '2025-12-16 05:46:59.000000', NULL, NULL, '1234', NULL, 'naveenkumarpoff@gmail.com', 0, 'MEDIUM', 'GENERAL', 'PENDING', '2025-12-16 05:46:59.000000'),
(33, 'EMAIL', '2025-12-16 05:48:50.000000', NULL, NULL, 'Your order #123 has shipped!', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'PENDING', '2025-12-16 05:48:50.000000'),
(34, 'EMAIL', '2025-12-16 06:27:43.000000', NULL, NULL, 'Your order #12345 shipped! 📦', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'SENT', '2025-12-16 06:27:44.000000'),
(35, 'EMAIL', '2025-12-16 06:31:14.000000', NULL, NULL, 'Email working perfectly now!', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 06:31:14.000000'),
(36, 'EMAIL', '2025-12-16 06:34:45.000000', NULL, NULL, 'Your order #12345 shipped! 📦', NULL, 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'ORDER_SHIPPED', 'SENT', '2025-12-16 06:34:51.000000'),
(37, 'EMAIL', '2025-12-16 06:41:12.000000', NULL, NULL, 'Test Email 2', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 06:41:17.000000'),
(38, 'ORDER_CONFIRMATION', '2025-12-16 08:36:03.000000', NULL, 'Unknown channel: ORDER_CONFIRMATION', 'hi there', NULL, 'naveenkumarpoff@gmail.com', 3, 'LOW', 'GENERAL', 'FAILED', '2025-12-16 08:36:03.000000'),
(39, 'PROMOTIONAL', '2025-12-16 08:37:31.000000', NULL, 'Unknown channel: PROMOTIONAL', '7744', NULL, 'naveenkumarpoff@gmail.com', 3, 'LOW', 'GENERAL', 'FAILED', '2025-12-16 08:37:36.000000'),
(40, 'EMAIL', '2025-12-16 08:42:16.000000', NULL, NULL, 'HI THERE IM NK FROM SPRING BOOT', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 08:42:21.000000'),
(41, 'SMS', '2025-12-16 09:02:06.000000', NULL, NULL, 'Twilio live test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:02:11.000000'),
(42, 'SMS', '2025-12-16 09:13:10.000000', NULL, NULL, 'Twilio live test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:13:16.000000'),
(43, 'SMS', '2025-12-16 09:16:50.000000', NULL, NULL, 'hi there', NULL, '9361954896@gmail.com', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:16:56.000000'),
(44, 'SMS', '2025-12-16 09:18:01.000000', NULL, NULL, 'Twilio test from +14782267222', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:18:06.000000'),
(45, 'SMS', '2025-12-16 09:24:05.000000', NULL, NULL, 'Twilio test from +14782267222', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:24:10.000000'),
(46, 'SMS', '2025-12-16 09:27:40.000000', NULL, NULL, 'Twilio test from +14782267222', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:27:45.000000'),
(47, 'SMS', '2025-12-16 09:34:38.000000', NULL, NULL, 'Twilio live test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:34:43.000000'),
(48, 'SMS', '2025-12-16 09:38:32.000000', NULL, NULL, 'Twilio live test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:38:37.000000'),
(49, 'USER_SIGNUP', '2025-12-16 09:40:39.000000', NULL, 'Unknown channel: USER_SIGNUP', 'vanakam da namatha sms la', NULL, '9361954896', 3, 'LOW', 'GENERAL', 'FAILED', '2025-12-16 09:40:44.000000'),
(50, 'SMS', '2025-12-16 09:41:06.000000', NULL, NULL, 'vanakam da namatha sms la', NULL, '9361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:41:11.000000'),
(51, 'USER_SIGNUP', '2025-12-16 09:42:32.000000', NULL, 'Unknown channel: USER_SIGNUP', 'vanakam da namatha sms la', NULL, '+919361954896', 3, 'LOW', 'GENERAL', 'FAILED', '2025-12-16 09:42:32.000000'),
(52, 'SMS', '2025-12-16 09:42:52.000000', NULL, NULL, 'vanakam da namatha sms la', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:42:58.000000'),
(53, 'SMS', '2025-12-16 09:44:09.000000', NULL, NULL, 'hi there', NULL, '+919444991878', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 09:44:14.000000'),
(54, 'EMAIL', '2025-12-16 09:47:57.000000', NULL, NULL, 'nk vaalga', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 09:48:02.000000'),
(55, 'EMAIL', '2025-12-16 09:48:33.000000', NULL, NULL, 'hi there', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 09:48:38.000000'),
(56, 'EMAIL', '2025-12-16 10:18:21.000000', NULL, NULL, 'hi', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 10:18:32.000000'),
(57, 'EMAIL', '2025-12-16 10:29:39.000000', NULL, NULL, 'nk', NULL, 'naveenkumar.it22@bitsathy.ac.in', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-16 10:29:44.000000'),
(58, 'SMS', '2025-12-16 10:31:07.000000', NULL, NULL, 'vanakam da mapala , nan tha nk thirupur la irrunthu', NULL, '+919361354896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-16 10:31:12.000000'),
(59, 'EMAIL', '2025-12-17 04:24:51.000000', NULL, NULL, 'test 1', NULL, 'naveenkumar.it22@bitsathy.ac.in', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-17 04:25:02.000000'),
(60, 'EMAIL', '2025-12-17 04:25:26.000000', NULL, NULL, 'proper test', NULL, 'naveenkumar.it22@bitsathy.ac.in', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-17 04:25:31.000000'),
(61, 'SMS', '2025-12-17 04:26:46.000000', NULL, NULL, 'unga card mela irrukara 16 number sollunga bhai', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-17 04:26:52.000000'),
(62, 'SMS', '2025-12-17 04:31:08.000000', NULL, NULL, 'Twilio auth fixed test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-17 04:31:13.000000'),
(63, 'SMS', '2025-12-17 04:32:29.000000', NULL, NULL, 'Twilio auth fixed test', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-17 04:32:35.000000'),
(64, 'SMS', '2025-12-17 04:35:23.000000', NULL, NULL, 'test from the react front-end application', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-17 04:35:28.000000'),
(65, 'EMAIL', '2025-12-17 08:42:32.000000', NULL, NULL, 'Welcome!', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-17 08:42:37.000000'),
(66, 'SMS', '2025-12-17 08:54:20.000000', NULL, 'Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 'Welcome!', NULL, 'naveenkumarpoff@gmail.com', 3, 'HIGH', 'PROMOTIONAL', 'FAILED', '2025-12-17 08:54:20.000000'),
(67, 'SMS', '2025-12-17 08:55:53.000000', NULL, NULL, 'Welcome!', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-17 08:55:54.000000'),
(68, 'SMS', '2025-12-17 09:12:04.000000', NULL, NULL, 'test otp verification', NULL, '+919361954896', 0, 'CRITICAL', 'PROMOTIONAL', 'SENT', '2025-12-17 09:12:06.000000'),
(69, 'EMAIL', '2025-12-17 09:44:36.000000', NULL, NULL, 'successfully delivered ', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-17 09:44:41.000000'),
(70, 'SMS', '2025-12-18 03:31:29.000000', NULL, NULL, 'nk', NULL, '+919361954896', 0, 'HIGH', 'PROMOTIONAL', 'SENT', '2025-12-18 03:31:32.000000'),
(71, 'EMAIL', '2025-12-18 06:11:19.000000', NULL, NULL, 'nk test', NULL, '+919361954896', 0, 'LOW', 'GENERAL', 'DEAD_LETTERED', '2025-12-18 06:11:54.000000'),
(72, 'PUSH', '2025-12-18 06:13:26.000000', NULL, NULL, 'hi', NULL, '+919361954896', 0, 'MEDIUM', 'GENERAL', 'SENT', '2025-12-18 06:13:26.000000'),
(73, 'EMAIL', '2025-12-18 06:16:08.000000', NULL, NULL, 'ko', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-18 06:16:15.000000'),
(74, 'PUSH', '2025-12-18 06:24:46.000000', NULL, NULL, 'hi', NULL, 'naveenkumar.p246810@gmail.com', 0, 'MEDIUM', 'GENERAL', 'SENT', '2025-12-18 06:24:46.000000'),
(75, 'EMAIL', '2025-12-18 08:21:36.000000', NULL, NULL, 'vanakam', NULL, 'naveenkumarpoff@gmail.com', 0, 'LOW', 'GENERAL', 'SENT', '2025-12-18 08:21:43.000000'),
(76, 'EMAIL', '2025-12-18 10:17:27.000000', NULL, NULL, 'Message from the user interface', NULL, 'naveenkumar.p246810@gmail.com', 0, 'MEDIUM', 'ORDER_CONFIRMATION', 'SENT', '2025-12-18 10:17:47.000000'),
(77, 'PUSH', '2025-12-19 04:14:29.000000', NULL, NULL, '1234', NULL, 'naveenkumar.p246810@gmail.com', 0, 'CRITICAL', 'ALERT', 'SENT', '2025-12-19 04:14:30.000000'),
(78, 'EMAIL', '2025-12-19 04:32:49.000000', NULL, NULL, 'hi from the user interface with the subject', NULL, 'naveenkumarpoff@gmail.com', 0, 'MEDIUM', 'ORDER_CONFIRMATION', 'SENT', '2025-12-19 04:33:00.000000'),
(79, 'EMAIL', '2025-12-19 04:35:08.000000', NULL, NULL, 'hi from the user Interface to check the subject', 'check for the subject form ui', 'naveenkumarpoff@gmail.com', 0, 'MEDIUM', 'ORDER_CONFIRMATION', 'SENT', '2025-12-19 04:35:20.000000'),
(80, 'SMS', '2025-12-19 04:44:35.000000', NULL, NULL, 'hi there . testing the sms from user Interface', '+919361954896', '+919361954896', 0, 'LOW', 'PROMOTIONAL', 'SENT', '2025-12-19 04:44:37.000000'),
(81, 'EMAIL', '2025-12-19 05:51:50.000000', NULL, 'Failed to send HTML email: Conversion = \'\"\'', 'hi there test from the user interface with new template', 'Test of new template', 'naveenkumarpoff@gmail.com', 3, 'HIGH', 'USER_SIGNUP', 'FAILED', '2025-12-19 05:51:50.000000'),
(82, 'EMAIL', '2025-12-19 05:55:37.000000', NULL, 'Failed to send HTML email', 'test form the user interface to check the new template', 'hi there ', 'naveenkumarpoff@gmail.com', 3, 'HIGH', 'USER_SIGNUP', 'FAILED', '2025-12-19 05:55:37.000000'),
(83, 'EMAIL', '2025-12-19 05:58:54.000000', NULL, NULL, 'Test for the new template form the user interface. check .', 'Test from the User Interface', 'naveenkumar.it22@bitsathy.ac.in', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-19 05:59:00.000000'),
(84, 'EMAIL', '2025-12-19 06:05:24.000000', NULL, NULL, 'wellcome to my world', 'hi there im naveen kumar', 'naveenkumar.p246810@gmail.com', 0, 'MEDIUM', 'ORDER_CONFIRMATION', 'SENT', '2025-12-19 06:05:34.000000'),
(85, 'SMS', '2025-12-19 06:41:03.000000', '2025-12-19 06:42:00.000000', 'Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 'testing the Scheduling from the user interface', 'checking with the schedule', 'naveenkumarpoff@gmail.com', 3, 'LOW', 'PROMOTIONAL', 'FAILED', '2025-12-19 06:42:21.000000'),
(86, 'EMAIL', '2025-12-19 06:45:01.000000', '2025-12-19 06:46:00.000000', NULL, 'test from the user Interface for the scheduling ', 'test for the Scheduling ', 'naveenkumarpoff@gmail.com ', 0, 'MEDIUM', 'ORDER_CONFIRMATION', 'SENT', '2025-12-19 06:47:34.000000'),
(87, 'EMAIL', '2025-12-19 10:34:56.000000', NULL, 'Failed to send HTML email', 'hi da', 'hi kumar', 'kumarvsoffical@gmail.com', 3, 'HIGH', 'USER_SIGNUP', 'FAILED', '2025-12-19 10:35:08.000000'),
(88, 'EMAIL', '2025-12-19 10:38:25.000000', NULL, NULL, 'hi there', 'hi kumar', 'kumarvsoffical@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-19 10:38:31.000000'),
(89, 'EMAIL', '2025-12-19 10:41:33.000000', NULL, NULL, 'hi there', 'hi kumar', 'kumarvsofficial@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-19 10:41:39.000000'),
(90, 'SMS', '2025-12-19 10:42:20.000000', NULL, NULL, 'hi there ', 'naveenkumar.p246810@gmail.com', '+919361954896', 0, 'CRITICAL', 'OTP_VERIFICATION', 'SENT', '2025-12-19 10:42:21.000000'),
(91, 'SMS', '2025-12-20 06:02:24.000000', '2025-12-20 06:04:00.000000', 'Failed to send SMS: Invalid phone number format: naveenkumar.it22@bitsathy.ac.in', 'test from the user interface with scheduling', 'test for the Scheduling ', 'naveenkumar.it22@bitsathy.ac.in', 3, 'CRITICAL', 'PAYMENT_FAILED', 'FAILED', '2025-12-20 06:04:22.000000'),
(92, 'EMAIL', '2025-12-20 06:07:25.000000', '2025-12-20 06:09:00.000000', NULL, 'test from user interface for scheduling', 'hi there im naveen kumar', 'naveenkumar.it22@bitsathy.ac.in', 0, 'HIGH', 'PASSWORD_RESET', 'SENT', '2025-12-20 06:09:27.000000'),
(93, 'SMS', '2025-12-22 08:19:02.000000', NULL, 'Failed to send SMS: Authenticate', 'hi there ', 'test from ui', '+919361954896', 3, 'CRITICAL', 'OTP_VERIFICATION', 'FAILED', '2025-12-22 08:19:04.000000'),
(94, 'SMS', '2025-12-22 08:25:01.000000', NULL, 'Failed to send SMS: Authenticate', 'hi there from the user interface', 'nk', '+919361954896', 3, 'CRITICAL', 'OTP_VERIFICATION', 'FAILED', '2025-12-22 08:25:03.000000'),
(95, 'EMAIL', '2025-12-22 08:35:20.000000', NULL, 'Failed to send HTML email', 'updated tokens in the twilio', 'Test from the user Interface', '+919361954896', 3, 'MEDIUM', 'ORDER_CONFIRMATION', 'FAILED', '2025-12-22 08:35:36.000000'),
(96, 'SMS', '2025-12-22 08:36:50.000000', NULL, NULL, 'hi there im P . Naveen Kumar . just testing the user interface and the sms sender', 'Test from the User Interface', '+919361954896', 0, 'CRITICAL', 'OTP_VERIFICATION', 'SENT', '2025-12-22 08:36:51.000000'),
(97, 'EMAIL', '2025-12-22 08:40:34.000000', NULL, NULL, 'simply testing the user Interface and the smtp', 'changed username', 'naveenkumar.it22@bitsathy.ac.in', 0, 'LOW', 'EMAIL', 'SENT', '2025-12-22 08:40:39.000000'),
(98, 'EMAIL', '2025-12-23 03:15:53.000000', NULL, NULL, 'vanakam', 'hi there', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-23 03:15:59.000000'),
(99, 'SMS', '2025-12-24 03:55:45.000000', NULL, 'Failed to send SMS: Authenticate', '12345', 'otp', '+919361954896', 3, 'CRITICAL', 'OTP_VERIFICATION', 'FAILED', '2025-12-24 03:55:48.000000'),
(100, 'EMAIL', '2025-12-24 05:46:30.000000', NULL, NULL, 'test from ui', 'hi there', 'naveenkumarpoff@gmail.com', 0, 'LOW', 'EMAIL', 'SENT', '2025-12-24 05:46:36.000000'),
(101, 'SMS', '2025-12-29 04:13:41.000000', NULL, NULL, 'test from frontend', 'hello', '+919361954896', 0, 'CRITICAL', 'OTP_VERIFICATION', 'SENT', '2025-12-29 04:13:44.000000'),
(102, 'EMAIL', '2025-12-29 05:58:51.000000', NULL, NULL, 'hi', 'hi there', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-29 05:58:56.000000'),
(103, 'SMS', '2025-12-29 08:36:45.000000', NULL, 'Failed to send SMS: Invalid phone number format: naveenkumarpoff@gmail.com', 'hi from failed', 'failed message', 'naveenkumarpoff@gmail.com', 3, 'CRITICAL', 'OTP_VERIFICATION', 'FAILED', '2025-12-29 08:36:46.000000'),
(104, 'EMAIL', '2025-12-29 09:11:54.000000', '2025-12-29 09:12:00.000000', NULL, 'hi , there this is email test from the user Interface with jwt and the schedule', 'test from the user Interface ', 'naveenkumar.it22@bitsathy.ac.in', 0, 'LOW', 'EMAIL', 'SENT', '2025-12-29 09:12:30.000000'),
(105, 'EMAIL', '2025-12-30 06:04:19.000000', NULL, NULL, 'hi there', 'nil', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-30 06:04:31.000000'),
(106, 'SMS', '2025-12-30 06:37:49.000000', NULL, 'Failed to send SMS: Authenticate', 'hi there', 'asfa', '+919361954896', 3, 'HIGH', 'LOW_BALANCE_ALERT', 'FAILED', '2025-12-30 06:37:52.000000'),
(107, 'SMS', '2025-12-30 06:41:43.000000', NULL, NULL, 'checking sms', 'hi there', '+919361954896', 0, 'HIGH', 'LOW_BALANCE_ALERT', 'SENT', '2025-12-30 06:41:45.000000'),
(108, 'EMAIL', '2025-12-30 10:19:56.000000', NULL, NULL, 'hi saravana', 'Notification test from user Interface', 'perinbasaravanank06@gmail.com', 0, 'LOW', 'EMAIL', 'SENT', '2025-12-30 10:20:02.000000'),
(109, 'EMAIL', '2025-12-30 10:30:58.000000', NULL, 'Failed to send HTML email', 'test for new user template ', 'hi there im naveen kumar', 'naveenkumarpoff@gmail.com', 3, 'HIGH', 'USER_SIGNUP', 'FAILED', '2025-12-30 10:30:59.000000'),
(110, 'EMAIL', '2025-12-30 10:36:44.000000', NULL, NULL, 'hi there this is new test template for email', 'hi there im naveen kumar', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2025-12-30 10:36:49.000000'),
(111, 'EMAIL', '2026-01-02 17:17:37.000000', NULL, 'Failed to send HTML email', 'vanakam', 'test from ui', 'naveenkumarpoff@gmail.com', 3, 'HIGH', 'USER_SIGNUP', 'FAILED', '2026-01-02 17:17:37.000000'),
(112, 'EMAIL', '2026-01-05 03:56:53.000000', NULL, NULL, 'test from user interface', 'nil', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2026-01-05 03:56:58.000000'),
(113, 'SMS', '2026-01-05 04:15:19.000000', NULL, NULL, 'hi there ', 'sdf', '+919361954896', 0, 'CRITICAL', 'OTP_VERIFICATION', 'SENT', '2026-01-05 04:15:20.000000'),
(114, 'EMAIL', '2026-01-05 06:05:06.000000', NULL, 'Failed to send HTML email', 'hi there ', 'hi there im naveen kumar', 'naveenkumarpoff@gmail.com', 3, 'LOW', 'EMAIL', 'FAILED', '2026-01-05 06:05:06.000000'),
(115, 'EMAIL', '2026-01-05 08:15:17.000000', NULL, NULL, 'hi', 'nil', 'naveenkumarpoff@gmail.com', 0, 'HIGH', 'USER_SIGNUP', 'SENT', '2026-01-05 08:15:22.000000'),
(116, 'EMAIL', '2026-01-05 10:12:19.000000', NULL, NULL, 'hi', 'hi there im naveen kumar', 'naveenkumarpoff@gmail.com', 0, 'LOW', 'EMAIL', 'SENT', '2026-01-05 10:12:25.000000'),
(117, 'EMAIL', '2026-01-05 16:33:15.000000', NULL, NULL, 'ggg', 'hi there im naveen kumar', 'naveenkumarpoff@gmail.com', 0, 'LOW', 'EMAIL', 'SENT', '2026-01-05 16:33:21.000000');

-- --------------------------------------------------------

--
-- Table structure for table `notification_rule`
--

CREATE TABLE `notification_rule` (
  `id` bigint(20) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `notification_type` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `retry_limit` int(11) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_rule`
--

INSERT INTO `notification_rule` (`id`, `channel`, `created_at`, `is_active`, `notification_type`, `priority`, `retry_limit`, `updated_at`) VALUES
(1, 'EMAIL', '2025-12-13 15:46:27.000000', b'1', 'USER_SIGNUP', 'HIGH', 5, '2025-12-13 15:46:27.000000'),
(2, 'EMAIL', '2025-12-13 15:46:27.000000', b'1', 'ORDER_CONFIRMATION', 'MEDIUM', 3, '2025-12-13 15:46:27.000000'),
(3, 'SMS', '2025-12-13 15:46:27.000000', b'1', 'PROMOTIONAL', 'LOW', 1, '2025-12-13 15:46:27.000000'),
(4, 'PUSH', '2025-12-13 15:46:27.000000', b'1', 'ALERT', 'CRITICAL', 10, '2025-12-13 15:46:27.000000'),
(5, 'EMAIL', '2025-12-16 04:13:46.000000', b'1', 'EMAIL', 'LOW', 3, '2025-12-16 04:13:46.000000'),
(6, 'SMS', '2025-12-17 09:42:31.000000', b'1', 'PAYMENT_FAILED', 'CRITICAL', 5, '2025-12-17 09:42:31.000000'),
(7, 'EMAIL', '2025-12-17 09:42:31.000000', b'1', 'PAYMENT_SUCCESS', 'HIGH', 3, '2025-12-17 09:42:31.000000'),
(8, 'SMS', '2025-12-17 09:42:31.000000', b'1', 'LOW_BALANCE_ALERT', 'HIGH', 3, '2025-12-17 09:42:31.000000'),
(9, 'SMS', '2025-12-17 09:42:31.000000', b'1', 'OTP_VERIFICATION', 'CRITICAL', 3, '2025-12-17 09:42:31.000000'),
(10, 'EMAIL', '2025-12-17 09:42:31.000000', b'1', 'PASSWORD_RESET', 'HIGH', 3, '2025-12-17 09:42:31.000000'),
(11, 'SMS', '2025-12-17 09:42:31.000000', b'1', 'ORDER_SHIPPED', 'MEDIUM', 3, '2025-12-17 09:42:31.000000'),
(12, 'PUSH', '2025-12-17 09:42:31.000000', b'1', 'DELIVERY_OUT_FOR', 'HIGH', 3, '2025-12-17 09:42:31.000000'),
(13, 'PUSH', '2025-12-17 09:42:31.000000', b'1', 'DELIVERY_DELAYED', 'CRITICAL', 5, '2025-12-17 09:42:31.000000'),
(14, 'EMAIL', '2025-12-17 09:42:31.000000', b'1', 'SYSTEM_ALERT', 'CRITICAL', 5, '2025-12-17 09:42:31.000000'),
(15, 'PUSH', '2025-12-17 09:42:31.000000', b'1', 'PROMO_OFFER', 'LOW', 1, '2025-12-17 09:42:31.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_event`
--
ALTER TABLE `notification_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_rule`
--
ALTER TABLE `notification_rule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKplh97jsalirc5bwfrns8a8yds` (`notification_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `notification_event`
--
ALTER TABLE `notification_event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `notification_rule`
--
ALTER TABLE `notification_rule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
