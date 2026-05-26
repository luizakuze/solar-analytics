/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB
--
-- Database: solar_analytics
--

DROP TABLE IF EXISTS `metrics`;

CREATE TABLE `metrics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `power_kw` float NOT NULL,
  `panel_temperature` float NOT NULL,
  `solar_irradiation` float NOT NULL,
  `estimated_efficiency` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `metrics` VALUES
(1,'2026-05-26 08:00:00',0.8,28.4,180,0.004444),
(2,'2026-05-26 09:00:00',1.6,31.2,360,0.004444),
(3,'2026-05-26 10:00:00',2.7,35.8,590,0.004576),
(4,'2026-05-26 11:00:00',3.8,39.6,760,0.005000),
(5,'2026-05-26 12:00:00',4.5,44.2,890,0.005056),
(6,'2026-05-26 13:00:00',4.2,46.1,850,0.004941),
(7,'2026-05-26 14:00:00',3.6,43.5,720,0.005000),
(8,'2026-05-26 15:00:00',2.9,40.0,610,0.004754),
(9,'2026-05-26 16:00:00',1.9,36.4,420,0.004524),
(10,'2026-05-26 17:00:00',0.9,32.1,210,0.004286);