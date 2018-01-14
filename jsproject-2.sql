-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1:3306
-- 產生時間： 2018-01-13 06:10:10
-- 伺服器版本: 5.7.19
-- PHP 版本： 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `jsproject`
--

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `v_id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `message`
--

INSERT INTO `message` (`no`, `u_id`, `v_id`, `message`) VALUES
(1, 1, 11, 'GOOOOOOOOOOOOOOOOOOD'),
(2, 1, 11, 'GGG'),
(3, 1, 11, 'GOOOOOOOOOOOOOOOOOOD'),
(4, 1, 11, 'GOOOOOOOOOOOOOOOOOOD'),
(5, 1, 11, 'GOOOOOOOOOOOOOOOOOOD'),
(6, 1, 11, 'GOOOOOOOOOOOOOOOOOOD'),
(7, 1, 11, 'testttttttttttttttttttt'),
(8, 1, 10, 'ewrew'),
(9, 1, 12, 'ㄎ'),
(10, 1, 12, '好'),
(11, 1, 31, 'sss');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_account` varchar(20) NOT NULL,
  `u_pwd` varchar(20) NOT NULL,
  `u_gender` varchar(10) NOT NULL,
  `u_age` int(5) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`u_id`, `u_account`, `u_pwd`, `u_gender`, `u_age`, `u_email`) VALUES
(1, 'yee', 'yee', 'man', 32, 'rightguy3344@gmail.com'),
(0, 'root', 'root', 'root', 0, 'root'),
(3, 'tina', 'tina', 'female', 18, 'tina@ss.com');

-- --------------------------------------------------------

--
-- 資料表結構 `vote`
--

DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote` (
  `v_no` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `endtime` datetime DEFAULT NULL,
  `votelimit` int(2) DEFAULT NULL,
  `Option1` varchar(100) DEFAULT NULL,
  `Option2` varchar(100) DEFAULT NULL,
  `Option3` varchar(100) DEFAULT NULL,
  `Option4` varchar(100) DEFAULT NULL,
  `Option5` varchar(100) DEFAULT NULL,
  `Option6` varchar(100) DEFAULT NULL,
  `Option7` varchar(100) DEFAULT NULL,
  `Option8` varchar(100) DEFAULT NULL,
  `Option9` varchar(100) DEFAULT NULL,
  `Option10` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`v_no`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `vote`
--

INSERT INTO `vote` (`v_no`, `name`, `endtime`, `votelimit`, `Option1`, `Option2`, `Option3`, `Option4`, `Option5`, `Option6`, `Option7`, `Option8`, `Option9`, `Option10`) VALUES
(1, 'as', NULL, 1, 'asd', 'asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'wqe', NULL, 2, 'qwer', 'qwer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'wqe', '2017-11-30 14:02:00', 2, 'qwer', 'qwer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'wqe', '2017-11-30 14:02:00', 2, 'qwer', 'qwer', 'undefined', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'weqr', '2017-12-08 14:02:00', 3, 'qwer', 'qwer', 'undefined', 'undefined', 'undefined', NULL, NULL, NULL, NULL, NULL),
(10, 'asd', '2017-12-27 14:02:00', 1, 'asd', 'asd', 'undefined', 'undefined', 'undefined', NULL, NULL, NULL, NULL, NULL),
(11, 'wer', '2017-04-19 03:03:00', 3, 'wer', 'wer3', 'wef', 'dsf23', 'wer444', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(12, 'ttttest', '2017-12-30 12:59:00', 1, 'wq', 'ww', 'undefined', 'undefined', 'undefined', NULL, NULL, NULL, NULL, NULL),
(32, 'qqw', '2018-01-13 02:03:00', 1, 'qwe', 'eweq', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(31, '時間測試a', '2018-01-05 01:02:00', 2, 'asad', 'aasd', '3', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(30, '10選項測試', '2017-11-29 01:22:00', 1, 'a', 'b', 'c', 's', 'e', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(29, '10選項測試', '2017-11-29 01:22:00', 1, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'),
(34, '自動root建立投票測試', '2018-01-13 00:12:00', 1, '121', '12', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(43, 'sad', '2018-01-12 02:22:00', 1, 'as', 'sa', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(42, 'sad', '2018-01-03 02:22:00', 1, '1', '1', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(41, 'sssssssssssssssss123123', '2018-01-20 11:11:00', 1, 'sdfsdfsd', 'fsdfsdf', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- 資料表結構 `voting_results`
--

DROP TABLE IF EXISTS `voting_results`;
CREATE TABLE IF NOT EXISTS `voting_results` (
  `vr_no` int(5) NOT NULL AUTO_INCREMENT,
  `v_id` int(5) NOT NULL,
  `u_id` int(5) NOT NULL,
  `vote_option1` int(1) NOT NULL DEFAULT '0',
  `vote_option2` int(1) NOT NULL DEFAULT '0',
  `vote_option3` int(1) NOT NULL DEFAULT '0',
  `vote_option4` int(1) NOT NULL DEFAULT '0',
  `vote_option5` int(1) NOT NULL DEFAULT '0',
  `vote_option6` int(1) NOT NULL DEFAULT '0',
  `vote_option7` int(1) NOT NULL DEFAULT '0',
  `vote_option8` int(1) NOT NULL DEFAULT '0',
  `vote_option9` int(1) NOT NULL DEFAULT '0',
  `vote_option10` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vr_no`)
) ENGINE=MyISAM AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `voting_results`
--

INSERT INTO `voting_results` (`vr_no`, `v_id`, `u_id`, `vote_option1`, `vote_option2`, `vote_option3`, `vote_option4`, `vote_option5`, `vote_option6`, `vote_option7`, `vote_option8`, `vote_option9`, `vote_option10`) VALUES
(1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 10, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(3, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(4, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 11, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 11, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(11, 12, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 11, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(13, 11, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(14, 11, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(16, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(17, 11, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(18, 11, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(19, 11, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
(20, 11, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(21, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 11, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 11, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(28, 31, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(29, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(41, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(40, 41, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, 41, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(38, 41, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(37, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(42, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(43, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(44, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(45, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(46, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(47, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(48, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(49, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(50, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(51, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(52, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(53, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(54, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(55, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(56, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(57, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(58, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(59, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(60, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(61, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(62, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(63, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(64, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(65, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(66, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(67, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(68, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(69, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(70, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(71, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(72, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(73, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(74, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(75, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(76, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(77, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(78, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(79, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(80, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(81, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(82, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(83, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(84, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(85, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(86, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(87, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(88, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(89, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(90, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(91, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(92, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(93, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(94, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(95, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(96, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(97, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(98, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(99, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(100, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(101, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(102, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(103, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(104, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(105, 31, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(106, 34, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(107, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(108, 34, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(109, 34, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(121, 31, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(120, 31, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0),
(119, 31, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0),
(118, 31, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0),
(117, 31, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(116, 31, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0),
(122, 32, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(123, 32, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
(124, 34, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(125, 34, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(126, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(127, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(128, 11, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
