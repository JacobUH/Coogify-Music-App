CREATE TABLE SESSION (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(userID) ON DELETE CASCADE
);

ALTER TABLE SESSION
ADD COLUMN `to_delete` BOOLEAN DEFAULT FALSE;

ALTER TABLE `SESSION`
MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;


DELETE FROM `SESSION` WHERE `session_id` IN 

UPDATE `GENRE` SET `genreName`='Rock' WHERE `genreID`=1;UPDATE `GENRE` SET `genreName`='Pop' WHERE `genreID`=2;UPDATE `GENRE` SET `genreName`='Hip Hop' WHERE `genreID`=3;UPDATE `GENRE` SET `genreName`='R&B' WHERE `genreID`=4;UPDATE `GENRE` SET `genreName`='Country' WHERE `genreID`=5;UPDATE `GENRE` SET `genreName`='Electronic' WHERE `genreID`=6;UPDATE `GENRE` SET `genreName`='Jazz' WHERE `genreID`=7;UPDATE `GENRE` SET `genreName`='Classical' WHERE `genreID`=8;UPDATE `GENRE` SET `genreName`='Blues' WHERE `genreID`=9;UPDATE `GENRE` SET `genreName`='Reggae' WHERE `genreID`=10;

ALTER TABLE `TRACK` 
    CHANGE `songName` `songName` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    ADD UNIQUE (`songName`);
