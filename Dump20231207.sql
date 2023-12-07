-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pickupfinder
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courts`
--

DROP TABLE IF EXISTS `courts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courts` (
  `court_id` int NOT NULL AUTO_INCREMENT,
  `court_name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `court_condition` varchar(20) DEFAULT NULL,
  `num_hoops` int DEFAULT NULL,
  `hours_of_operation` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`court_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courts`
--

LOCK TABLES `courts` WRITE;
/*!40000 ALTER TABLE `courts` DISABLE KEYS */;
INSERT INTO `courts` VALUES (1,'Basketball Court 1','123 Main St','Good',2,'8:00 AM - 8:00 PM'),(2,'Basketball Court 2','456 Elm St','Excellent',1,'9:00 AM - 10:00 PM'),(3,'Basketball Court 3','789 Oak St','Fair',4,'7:00 AM - 9:00 PM'),(4,'Basketball Court 4','101 Maple St','Good',1,'10:00 AM - 7:00 PM'),(5,'Basketball Court 5','555 Pine St','Excellent',2,'24/7'),(6,'Basketball Court 6','777 Cedar St','Excellent',6,'9:00 AM - 7:00 PM'),(7,'Basketball Court 7','111 Redwood St','Moderate',1,'Sunrise to Sunset'),(8,'Basketball Court 8','222 Birch St','Good',2,'6:00 AM - 8:00 PM'),(9,'Basketball Court 9','333 Walnut St','Excellent',2,'6:00 PM - 10:00 PM'),(10,'Basketball Court 10','444 Sycamore St','Bad',2,'10:00 AM - 11:00 PM'),(11,'Basketball Court 11','123 Oak Rd','Good',1,'24/7'),(12,'Basketball Court 12','745 Elk St','Great',1,'9:00 AM - 4:00 PM'),(13,'Basketball Court 13','992 Whitelock Pkwy','Good',2,'Sunrise to Sunset'),(14,'Basketball Court 14','950 5th St','Bad',1,'12:00 PM - 8:00 PM'),(15,'Basketball Court 15','154 J St','Good',6,'6:00 AM - 10:00 PM');
/*!40000 ALTER TABLE `courts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `friendship_id` int NOT NULL AUTO_INCREMENT,
  `user1` varchar(45) DEFAULT NULL,
  `user2` varchar(45) DEFAULT NULL,
  `pending` tinyint DEFAULT '0',
  PRIMARY KEY (`friendship_id`),
  KEY `user1` (`user1`),
  KEY `user2` (`user2`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`user_id`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (30,'user1','user2',1),(31,'user3','user1',1),(32,'user6','user1',1),(33,'user1','user4',1),(34,'user1','user5',0),(35,'user1','user99',0),(36,'user1','user7',0),(37,'user1','user10',0),(38,'user1','user8',0),(39,'user1','user9',0),(40,'user1','Tyler',1),(41,'Tyler','user2',0),(42,'Tyler','user3',0),(43,'Tyler','user4',0),(44,'Tyler','user5',0),(45,'Tyler','user99',0),(46,'Tyler','user6',0),(47,'Tyler','user7',0),(48,'screenshot test','user1',1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupactivities`
--

DROP TABLE IF EXISTS `groupactivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupactivities` (
  `activity_name` varchar(45) NOT NULL,
  `activity_desc` varchar(500) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `group_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`activity_name`),
  KEY `groupactivities_ibfk_2_idx` (`group_id`),
  KEY `groupactivities_ibfk_1_idx` (`location`),
  CONSTRAINT `groupactivities_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `playergroups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupactivities`
--

LOCK TABLES `groupactivities` WRITE;
/*!40000 ALTER TABLE `groupactivities` DISABLE KEYS */;
INSERT INTO `groupactivities` VALUES ('12/8 3v3 Tourney','Round robin style tournament','Basketball Court 1','Friday Hoopers'),('a','b','Basketball Court 5','Friday Hoopers'),('activity','description','Basketball Court 1','Another'),('ball','were gonna ball','Basketball Court 1','Another'),('boom','whats up','Basketball Court 1','Another'),('c','d','Basketball Court 1','Friday Hoopers'),('Dunk','I can\'t dunk','Basketball Court 7','Orlando Magic'),('hi','hello','Basketball Court 15','Another'),('hoop','lets hoop','Basketball Court 1','Another'),('hoops','at court 2','Basketball Court 2','Another'),('lakers game','ad pra','Basketball Court 1','Another'),('league of legends','pause','Basketball Court 1','Another'),('lets watch basketball','this tuesday','Basketball Court 1','Another'),('new activity','activity','Basketball Court 1','30 and over Weekend Players'),('party','lets party','Basketball Court 1','Another'),('Practice Fox\'s Floaters','Bring snacks','Basketball Court 3','De\'Aaron Fox Fan Club'),('sup','hey','Basketball Court 1','Another'),('test','another','Basketball Court 1','Another'),('Warriors vs Kings Watch Party','Bring popcorn','Basketball Court 1','Sacramento Kings Fans'),('word','words','Basketball Court 1','Another');
/*!40000 ALTER TABLE `groupactivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageincourt`
--

DROP TABLE IF EXISTS `messageincourt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messageincourt` (
  `message_id` int NOT NULL,
  `court_id` int NOT NULL,
  PRIMARY KEY (`message_id`,`court_id`),
  KEY `court_id` (`court_id`),
  CONSTRAINT `messageincourt_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`),
  CONSTRAINT `messageincourt_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `courts` (`court_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageincourt`
--

LOCK TABLES `messageincourt` WRITE;
/*!40000 ALTER TABLE `messageincourt` DISABLE KEYS */;
INSERT INTO `messageincourt` VALUES (142,1),(163,1),(164,1),(169,1),(170,1),(168,2),(189,3),(143,10),(144,10),(145,10),(146,10),(147,10),(148,10),(149,10),(150,10),(151,10);
/*!40000 ALTER TABLE `messageincourt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageinfriends`
--

DROP TABLE IF EXISTS `messageinfriends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messageinfriends` (
  `message_id` int NOT NULL,
  `friendship_id` int NOT NULL,
  PRIMARY KEY (`message_id`,`friendship_id`),
  KEY `friendship_id` (`friendship_id`),
  CONSTRAINT `messageinfriends_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`),
  CONSTRAINT `messageinfriends_ibfk_2` FOREIGN KEY (`friendship_id`) REFERENCES `friends` (`friendship_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageinfriends`
--

LOCK TABLES `messageinfriends` WRITE;
/*!40000 ALTER TABLE `messageinfriends` DISABLE KEYS */;
INSERT INTO `messageinfriends` VALUES (152,32),(153,32),(154,32),(155,32),(156,32),(157,32),(158,32),(159,32),(160,32),(161,32),(162,32),(166,33),(167,33);
/*!40000 ALTER TABLE `messageinfriends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageingroup`
--

DROP TABLE IF EXISTS `messageingroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messageingroup` (
  `message_id` int NOT NULL,
  `group_id` varchar(45) NOT NULL,
  PRIMARY KEY (`message_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `messageingroup_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`),
  CONSTRAINT `messageingroup_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `playergroups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageingroup`
--

LOCK TABLES `messageingroup` WRITE;
/*!40000 ALTER TABLE `messageingroup` DISABLE KEYS */;
INSERT INTO `messageingroup` VALUES (165,'30 and over Weekend Players'),(171,'Another'),(172,'Another'),(173,'Another'),(174,'Another'),(175,'Another'),(176,'Another'),(177,'james harden'),(178,'james harden'),(179,'james harden'),(180,'james harden'),(181,'james harden'),(182,'james harden'),(183,'james harden'),(184,'james harden'),(185,'james harden'),(186,'james harden'),(187,'james harden'),(188,'james harden');
/*!40000 ALTER TABLE `messageingroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` varchar(45) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `time_sent` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (142,'Tyler','Hello!','2023-11-28 12:22:43'),(143,'Tyler','Hi court 10','2023-11-28 12:23:38'),(144,'Tyler','are you guys playing games or just shooting around?','2023-11-28 12:23:48'),(145,'Tyler','','2023-11-28 12:23:52'),(146,'Tyler','how late is everyone staying there?','2023-11-28 12:23:59'),(147,'Tyler','Do you have space for one more?','2023-11-28 12:24:06'),(148,'Tyler','Who\'s gonna guard me?','2023-11-28 12:24:18'),(149,'Tyler','nobody can guard me','2023-11-28 12:24:22'),(150,'Tyler','Where did you guys park?','2023-11-28 12:24:54'),(151,'Tyler','Good game','2023-11-28 12:25:00'),(152,'user1','Hey','2023-11-28 15:23:01'),(153,'user1','hi','2023-11-28 15:23:04'),(154,'user1','hi','2023-11-28 15:23:05'),(155,'user1','hello','2023-11-28 15:23:07'),(156,'user1','whats up','2023-11-28 15:23:09'),(157,'user1','write me back','2023-11-28 15:23:13'),(158,'user1','whered you go','2023-11-28 15:23:19'),(159,'user1','hey','2023-11-28 15:23:21'),(160,'user1','hellooo??','2023-11-28 15:23:24'),(161,'user1','test','2023-11-28 15:23:28'),(162,'user1','test2','2023-11-28 15:23:30'),(163,'user1','We\'re playing 2v2s, come join','2023-11-28 15:29:58'),(164,'CS157A','Hello!','2023-11-28 16:43:07'),(165,'CS157A','hello','2023-11-28 16:53:13'),(166,'user4','adf;kj','2023-11-28 16:55:04'),(167,'user1','hi','2023-11-28 18:02:20'),(168,'user1','asdf','2023-11-28 18:02:34'),(169,'Tyler','hi','2023-12-06 23:19:27'),(170,'Tyler','hi','2023-12-06 23:19:30'),(171,'Tyler','yo','2023-12-06 23:20:32'),(172,'Tyler','hey','2023-12-06 23:20:35'),(173,'Tyler','whats up','2023-12-06 23:20:36'),(174,'Tyler','when are we playin?','2023-12-06 23:20:40'),(175,'Tyler','court 5?','2023-12-06 23:20:43'),(176,'Tyler','meet me at 6','2023-12-06 23:20:47'),(177,'Tyler','james harden stinks','2023-12-06 23:20:58'),(178,'Tyler','pee yew','2023-12-06 23:21:01'),(179,'Tyler','p.u.','2023-12-06 23:21:04'),(180,'Tyler','this guy stinks','2023-12-06 23:21:08'),(181,'Tyler','yikes','2023-12-06 23:21:09'),(182,'Tyler','another airball','2023-12-06 23:21:13'),(183,'Tyler','holy smokes','2023-12-06 23:21:25'),(184,'Tyler','hit a shot','2023-12-06 23:21:28'),(185,'Tyler','play defense','2023-12-06 23:21:30'),(186,'Tyler','ruin another franchise','2023-12-06 23:21:40'),(187,'Tyler','booooo','2023-12-06 23:21:42'),(188,'Tyler','this  guys the wrost','2023-12-06 23:21:49'),(189,'user1','Hi Court 3!','2023-12-07 00:23:14');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerevents`
--

DROP TABLE IF EXISTS `playerevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playerevents` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(45) DEFAULT NULL,
  `court_id` int DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `max_teams` int DEFAULT NULL,
  `team_size` int DEFAULT NULL,
  `event_desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `court_id` (`court_id`),
  CONSTRAINT `playerevents_ibfk_1` FOREIGN KEY (`court_id`) REFERENCES `courts` (`court_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerevents`
--

LOCK TABLES `playerevents` WRITE;
/*!40000 ALTER TABLE `playerevents` DISABLE KEYS */;
INSERT INTO `playerevents` VALUES (33,'3v3 Tournament',1,'2023-11-03 22:00:00',12,3,'Winner gets $50'),(34,'1v1 Tournament',9,'2023-11-04 12:00:00',100,1,'No loser\'s bracket'),(35,'5v5 Tournament',9,'2023-11-04 09:00:00',100,1,'Teams will be decided at the event'),(36,'2v2 Tournament',2,'2023-11-06 07:00:00',16,2,'Bracket Style Tournament'),(37,'3pt Shooting Contest',3,'2023-11-05 14:00:00',20,1,'Most 3\'s out of 30 attempts wins'),(38,'5v5 Tournament',7,'2023-11-04 11:00:00',36,5,'Competitive bracket tournament, full team required'),(39,'4v4 Tournament',10,'2023-10-04 09:00:00',10,4,'Halfcourt; play to 21 win by 2'),(40,'5v5 Under 5\'11 Tournament',6,'2023-11-05 05:00:00',16,5,'Must be under 5\'11 to play. We\'re bring a measuring tape'),(41,'3v3 Over 30 Tournament',9,'2023-11-06 04:00:00',30,3,'Must be over 30 to play; Must have a full team; Games to 21'),(42,'2v2 Over 7ft Tournament',7,'2023-10-03 09:30:00',4,2,'Must be 7ft+ to play.'),(43,'New Event',7,'2023-11-06 18:00:00',5,5,'New event'),(44,'Test 5',15,'2023-11-03 05:00:00',10,4,'Hi'),(45,'New event again again',13,'2023-11-03 05:00:00',11,12,'desc'),(46,'hi hi hi',13,'2023-11-03 05:00:00',10,10,'description'),(47,'Demo Event',11,'2023-11-04 05:00:00',10,5,'Demo Event desc');
/*!40000 ALTER TABLE `playerevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playergroups`
--

DROP TABLE IF EXISTS `playergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playergroups` (
  `group_id` varchar(45) NOT NULL,
  `group_desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playergroups`
--

LOCK TABLES `playergroups` WRITE;
/*!40000 ALTER TABLE `playergroups` DISABLE KEYS */;
INSERT INTO `playergroups` VALUES ('30 and over Weekend Players','Must be older than 30 to play with us. We play on weekends'),('Another','desc'),('ballers','we ball'),('Cleveland Caveliers','We love Cleveland'),('De\'Aaron Fox Fan Club','Go Kings'),('Demo Group','Demo Description'),('Friday Hoopers','We play basketball on Fridays'),('hey!','hey there.'),('hiiiii','heyyyyy'),('james harden','james harden'),('Los Angeles Clippers','Westbrook > Harden'),('Miami Heat','Greatest 8th seed ever'),('new group','new group'),('New York Knicks','Jalen Brunson'),('Orlando Magic','Bol Bol'),('Sacramento Kings','2024 Champs'),('Sacramento Kings Fans','Fox MVP'),('tall hoopers','we hoop'),('Utah Jazz','Who');
/*!40000 ALTER TABLE `playergroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `event_id` int NOT NULL,
  `team_id` varchar(45) NOT NULL,
  `captain_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`team_id`,`event_id`),
  KEY `teams_ibfk_1` (`event_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `playerevents` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (41,'3v3 legends','Tyler'),(37,'boom whats up','Tyler'),(35,'Champions','Tyler'),(39,'Heat','Tyler'),(43,'hop','Tyler'),(34,'Kings','Tyler'),(33,'Lakers','Tyler'),(35,'Lakers','user1'),(34,'My Team','user99'),(33,'Screenshot Test Team','screenshot test'),(40,'Short Kings','user6'),(42,'Tall People','user6'),(37,'Team 6','user6'),(34,'User10\'s Team','user10'),(38,'We\'re just here to have fun','user6'),(35,'Winner','user10'),(39,'World Champions','user6');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useringroup`
--

DROP TABLE IF EXISTS `useringroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useringroup` (
  `user_id` varchar(45) NOT NULL,
  `group_id` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `useringroup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `useringroup_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `playergroups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useringroup`
--

LOCK TABLES `useringroup` WRITE;
/*!40000 ALTER TABLE `useringroup` DISABLE KEYS */;
INSERT INTO `useringroup` VALUES ('CS157A','30 and over Weekend Players'),('Tyler','30 and over Weekend Players'),('Tyler','Another'),('Tyler','ballers'),('Tyler','Cleveland Caveliers'),('Tyler','De\'Aaron Fox Fan Club'),('user99','De\'Aaron Fox Fan Club'),('screenshot test','Demo Group'),('Tyler','Friday Hoopers'),('user1','Friday Hoopers'),('user3','Friday Hoopers'),('user99','Friday Hoopers'),('Tyler','hiiiii'),('Tyler','james harden'),('Tyler','Miami Heat'),('Tyler','Orlando Magic'),('user99','Orlando Magic'),('Tyler','Sacramento Kings Fans'),('user99','Sacramento Kings Fans'),('Tyler','Utah Jazz');
/*!40000 ALTER TABLE `useringroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useroncourt`
--

DROP TABLE IF EXISTS `useroncourt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useroncourt` (
  `user_id` varchar(45) NOT NULL,
  `court_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`court_id`),
  KEY `court_id` (`court_id`),
  CONSTRAINT `useroncourt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `useroncourt_ibfk_2` FOREIGN KEY (`court_id`) REFERENCES `courts` (`court_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useroncourt`
--

LOCK TABLES `useroncourt` WRITE;
/*!40000 ALTER TABLE `useroncourt` DISABLE KEYS */;
INSERT INTO `useroncourt` VALUES ('user2',1),('user3',1),('user1',2),('user4',2),('user5',2),('user99',2),('Tyler',3),('user1',3),('user6',3),('user7',3),('user10',4),('user8',4),('user9',4),('Tyler',5),('Tyler',6),('Tyler',8),('Tyler',10),('Tyler',11),('Tyler',12),('Tyler',13),('Tyler',14),('Tyler',15);
/*!40000 ALTER TABLE `useroncourt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useronteam`
--

DROP TABLE IF EXISTS `useronteam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useronteam` (
  `user_id` varchar(45) NOT NULL,
  `team_id` varchar(45) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`team_id`,`event_id`),
  KEY `useronteam_ibfk_3_idx` (`event_id`),
  KEY `useronteam_ibfk_2` (`team_id`),
  CONSTRAINT `useronteam_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `useronteam_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  CONSTRAINT `useronteam_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `playerevents` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useronteam`
--

LOCK TABLES `useronteam` WRITE;
/*!40000 ALTER TABLE `useronteam` DISABLE KEYS */;
INSERT INTO `useronteam` VALUES ('screenshot test','Screenshot Test Team',33),('Tyler','Lakers',33),('user10','User10\'s Team',34),('user99','My Team',34),('Tyler','Champions',35),('user10','Winner',35),('Tyler','boom whats up',37),('user6','Team 6',37),('user6','We\'re just here to have fun',38),('screenshot test','Heat',39),('Tyler','Heat',39),('user6','World Champions',39),('user6','Short Kings',40),('Tyler','3v3 legends',41),('user6','Tall People',42),('Tyler','hop',43);
/*!40000 ALTER TABLE `useronteam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('CS157A','Tyler'),('P','p'),('screenshot test','Pass'),('test5','p'),('Tyler','p'),('user1','password1'),('user10','password10'),('user2','password2'),('user3','password3'),('user4','password4'),('user5','password5'),('user55','pass55'),('user6','password6'),('user7','password7'),('user8','password8'),('user9','password9'),('user99','p');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07  0:32:55
