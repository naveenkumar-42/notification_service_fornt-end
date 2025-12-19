-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 18, 2025 at 10:06 AM
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
  `details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_id` bigint(20) NOT NULL,
  `timestamp` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `notification_event`
--

CREATE TABLE `notification_event` (
  `id` bigint(20) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `failure_reason` varchar(255) DEFAULT NULL,
  `message` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient` varchar(255) NOT NULL,
  `retry_count` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notification_event`
--

INSERT INTO `notification_event` (`id`, `channel`, `created_at`, `failure_reason`, `message`, `recipient`, `retry_count`, `status`, `updated_at`) VALUES
(1, 'EMAIL', '2025-12-13 10:28:27.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-13 10:28:27.000000'),
(2, 'EMAIL', '2025-12-13 10:33:45.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-13 10:33:45.000000'),
(3, 'EMAIL', '2025-12-13 10:48:55.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-13 10:48:55.000000'),
(4, 'EMAIL', '2025-12-13 10:49:54.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-13 10:49:54.000000'),
(5, 'EMAIL', '2025-12-13 10:51:34.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-13 10:51:34.000000'),
(6, 'PUSH', '2025-12-15 04:08:41.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-15 04:08:41.000000'),
(7, 'EMAIL', '2025-12-15 04:15:02.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-15 04:15:02.000000'),
(8, 'EMAIL', '2025-12-15 04:17:53.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-15 04:17:53.000000'),
(9, 'EMAIL', '2025-12-15 04:24:07.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-15 04:24:07.000000'),
(10, 'PUSH', '2025-12-15 04:24:27.000000', NULL, 'vanakam da mapala', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-15 04:24:27.000000'),
(11, 'EMAIL', '2025-12-15 04:37:23.000000', NULL, 'test', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 04:37:23.000000'),
(12, 'SMS', '2025-12-15 04:38:10.000000', NULL, 'hi there', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 04:38:10.000000'),
(13, 'SMS', '2025-12-15 05:47:22.000000', NULL, 'notification test\n', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 05:47:22.000000'),
(14, 'EMAIL', '2025-12-15 06:06:36.000000', NULL, 'awesome', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 06:06:36.000000'),
(15, 'EMAIL', '2025-12-15 06:06:55.000000', NULL, 'nk42\n', 'nk@gmail.com', 0, 'PENDING', '2025-12-15 06:06:55.000000'),
(16, 'EMAIL', '2025-12-15 06:07:04.000000', NULL, '234', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 06:07:04.000000'),
(17, 'EMAIL', '2025-12-15 06:10:53.000000', NULL, 'hi there', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 06:10:53.000000'),
(18, 'EMAIL', '2025-12-15 09:07:04.000000', NULL, 'hi there', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 09:07:04.000000'),
(19, 'EMAIL', '2025-12-15 09:24:01.000000', NULL, 'ads', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 09:24:01.000000'),
(20, 'EMAIL', '2025-12-15 09:31:52.000000', NULL, 'hi there', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 09:31:52.000000'),
(21, 'EMAIL', '2025-12-15 09:33:41.000000', NULL, '2w', 'naveenkumar.p246810@gmail.com', 0, 'PENDING', '2025-12-15 09:33:41.000000'),
(23, 'EMAIL', '2025-12-16 04:13:46.000000', '', 'Your order #123 has shipped!', 'test@example.com', 0, 'PENDING', '2025-12-16 04:13:46.000000'),
(24, 'EMAIL', '2025-12-16 04:14:36.000000', '', 'Your order #123 has shipped!', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-16 04:14:36.000000'),
(25, 'EMAIL', '2025-12-16 04:22:05.000000', '', 'Your order #123 has shipped!', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-16 04:22:05.000000'),
(26, 'EMAIL', '2025-12-16 04:25:23.000000', '', 'Your order #123 has shipped!', 'naveenkumarpoff@gmail.com', 0, 'PENDING', '2025-12-16 04:25:23.000000'),
(
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notification_rule`
--

INSERT INTO `notification_rule` (`id`, `channel`, `created_at`, `is_active`, `notification_type`, `priority`, `retry_limit`, `updated_at`) VALUES
(1, 'EMAIL', '2025-12-13 15:46:27.000000', b'1', 'USER_SIGNUP', '6', 5, '2025-12-13 15:46:27.000000'),
(2, 'EMAIL', '2025-12-13 15:46:27.000000', b'1', 'ORDER_CONFIRMATION', '4', 3, '2025-12-13 15:46:27.000000'),
(3, 'SMS', '2025-12-13 15:46:27.000000', b'1', 'PROMOTIONAL', '2', 1, '2025-12-13 15:46:27.000000'),
(4, 'PUSH', '2025-12-13 15:46:27.000000', b'1', 'ALERT', '10', 10, '2025-12-13 15:46:27.000000'),
(5, 'EMAIL', '2025-12-16 04:13:46.000000', b'1', 'EMAIL', '1', 3, '2025-12-16 04:13:46.000000'),
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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `notification_event`
--
ALTER TABLE `notification_event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `notification_rule`
--
ALTER TABLE `notification_rule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
