DROP database IF EXISTS sing_together;
CREATE database sing_together;

USE sing_together;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_name`            VARCHAR(64) NOT NULL,
  `user_room_id_entered` INT(11)     DEFAULT NULL,
  `user_song_id_voted`   INT(11)     DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) CHARSET = utf8;

DROP TABLE IF EXISTS `song`;
CREATE TABLE `song`(
    `song_id`            INT(11)      NOT NULL AUTO_INCREMENT,
    `song_name`          VARCHAR(100) NOT NULL,
    `song_length`        INT(11)      NOT NULL,
    `song_file`          VARCHAR(100) NOT NULL,
    `song_lyric`         VARCHAR(100) NOT NULL,
    PRIMARY KEY (song_id)
) CHARSET = utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id`              INT(11)     NOT NULL AUTO_INCREMENT,
  `user_name`            VARCHAR(64) NOT NULL,
  `user_room_id_entered` INT(11)     DEFAULT NULL,
  `user_song_id_voted`   INT(11)     DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) CHARSET = utf8;

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
    `room_id`                    INT(11)     NOT NULL AUTO_INCREMENT,
    `room_name`                  VARCHAR(64) NOT NULL,
    `room_song_id_playing`       INT(11)     NOT NULL,
    `room_song_starts_timestrap` VARCHAR(64) NOT NULL,
    PRIMARY KEY (`user_id`)
) CHARSET = utf8;