-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: the_database
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `the_database`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `the_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `the_database`;

--
-- Table structure for table `club_enrolments`
--

DROP TABLE IF EXISTS `club_enrolments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_enrolments` (
  `user_id` int NOT NULL,
  `club_id` int NOT NULL,
  `notify_updates` tinyint(1) DEFAULT NULL,
  `notify_events` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`club_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `club_enrolments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `club_enrolments_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_enrolments`
--

LOCK TABLES `club_enrolments` WRITE;
/*!40000 ALTER TABLE `club_enrolments` DISABLE KEYS */;
/*!40000 ALTER TABLE `club_enrolments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_managers`
--

DROP TABLE IF EXISTS `club_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_managers` (
  `user_id` int NOT NULL,
  `club_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`club_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `club_managers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `club_managers_ibfk_2` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_managers`
--

LOCK TABLES `club_managers` WRITE;
/*!40000 ALTER TABLE `club_managers` DISABLE KEYS */;
INSERT INTO `club_managers` VALUES (2,1);
/*!40000 ALTER TABLE `club_managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_url` varchar(30) DEFAULT NULL,
  `club_name` varchar(30) DEFAULT NULL,
  `club_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  UNIQUE KEY `club_url` (`club_url`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'club1.html','Archery Club','The Archery Club is for all those passionate about the old bow and arrow!\n    We accept those of all skill levels, regardless of culture or background!\n    Register to join our club so you can RSVP to events!'),(2,'club2.html','Computer Science Club','A club dedicated to Computer Science!\n    We talk all things comp sci, we do workshops, competitive programming, games nights and more!\n    You dont even have to be a comp sci student to join!\n    Press register to club to be able to RSVP for events!'),(3,'club3.html','Tech Innovators Club','Explore technologys frontiers and collaborate on coding, robotics, AI, and VR projects. Unleash your inner innovator and shape the future of tech!'),(4,'club4.html','Outdoor Adventure Society','Embrace natures beauty with hiking, camping, and rock climbing. Join fellow adventurers for thrilling outdoor experiences and unforgettable memories!'),(5,'club5.html','Artistic Expressions Society','Celebrate art in all its forms! Join artists of all levels for workshops, exhibitions, open mic nights, and collaborative projects. Unleash your imagination!'),(6,'club6.html','Sustainable Living Coalition','Promote eco-consciousness through educational initiatives, workshops, and projects. Be a steward of the planet and contribute to a greener future!'),(7,'club7.html','Language Club','Embrace diversity, learn languages, and immerse in different cultures. Join us for language workshops, cultural events, and international film screenings.'),(8,'club8.html','Health and Wellness Society','Prioritize holistic well-being through fitness challenges, mindfulness sessions, nutrition workshops, and mental health awareness campaigns.'),(9,'club9.html','Music Appreciation Club','Celebrate the power of music! Jam sessions, open mics, and music trivia nights. Join us to discover new sounds and connect through melodies!'),(10,'club10.html','Social Impact Collective','Drive positive change! Volunteer, fundraise, and advocate for social issues. Empower marginalized communities and make a lasting impact.');
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_enrolments`
--

DROP TABLE IF EXISTS `event_enrolments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_enrolments` (
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_enrolments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `event_enrolments_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_enrolments`
--

LOCK TABLES `event_enrolments` WRITE;
/*!40000 ALTER TABLE `event_enrolments` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_enrolments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(30) DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `event_description` varchar(1000) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `updates`
--

DROP TABLE IF EXISTS `updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `updates` (
  `update_id` int NOT NULL AUTO_INCREMENT,
  `club_id` int DEFAULT NULL,
  `private_update` tinyint(1) DEFAULT NULL,
  `update_title` varchar(30) DEFAULT NULL,
  `update_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`update_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `updates_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `updates`
--

LOCK TABLES `updates` WRITE;
/*!40000 ALTER TABLE `updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(20) DEFAULT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user','Bob','Bob','Foo','bobby@outlook.com','$argon2id$v=19$m=65536,t=3,p=4$dY3Pr3MWtlGAOfvUPrIKlQ$ACLQNf66uQm0eG4YJrBKTHcqdfKSQrLQ+GaywIhN2is','04123456789'),(2,'user','Archer','Archie','Bowie','archer@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$pf192aTpW41fiLyWnrqGzg$2aCwH9JRvEbPHtGcJxc4/r41qJ2/cMPCCV5WloiT1ps','04987654321'),(3,'admin','Sys','Sysi','admino','systemad@hotmail.com','$argon2id$v=19$m=65536,t=3,p=4$D5yog416Q0ij0sh9DWgeCA$3G+yjrZChWNvDCJbzUP1+C3MfX3djDoyI9yxDLIHPSw','04987654321');
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

-- Dump completed on 2023-06-09 13:41:10
