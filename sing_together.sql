DROP database IF EXISTS yw8uospcgbz3woi1;
CREATE database yw8uospcgbz3woi1;

USE yw8uospcgbz3woi1;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id`     INT(11) NOT NULL AUTO_INCREMENT,
  `user_vote`   INT(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) CHARSET=utf8;

DROP TABLE IF EXISTS `song`;
CREATE TABLE `song` (
  `song_id`     INT(11)      NOT NULL AUTO_INCREMENT,
  `song_length` INT(11)      NOT NULL,
  `song_name`   VARCHAR(100) NOT NULL,
  `song_artist` VARCHAR(100) NOT NULL,
  `song_file`   VARCHAR(100) NOT NULL,
  `song_lyric`  VARCHAR(100) NOT NULL,
  PRIMARY KEY (`song_id`)
) CHARSET=utf8;

INSERT INTO song (song_id,song_length,song_name,song_artist,song_file,song_lyric) VALUES 
(1,225,'Forever Number One','FCBayen Fans','Forever Number One.mp3','Forever Number One.json')
,(5,40,'AiAiAiAi FanChants','FCBayen Fans','aiaiaiai-fanchants.mp3','aiaiaiai-fanchants.json')
,(6,35,'Champions 8','FCBayen Fans','champions-8-fanchants-free.mp3','champions-8-fanchants-free.json')
,(7,87,'Europe','FCBayen Fans','europe-fanchants-free.mp3','europe-fanchants-free.json')
,(8,73,'FC Bayern Stern des Suedens','FCBayen Fans','FC_Bayern_Stern_des_Suedens.mp3','FC_Bayern_Stern_des_Suedens.json')
,(9,69,'Go Bayern','FCBayen Fans','go-bayern-fanchants-free.mp3','go-bayern-fanchants-free.json')
,(10,60,'Immer Vorvarts FCB Rot wie Blut und Weiss wie schn','FCBayen Fans','immer-vorvarts-fcb-rot-wie-blut-und-weiss-wie-schn-fanchants-free.mp3','immer-vorvarts-fcb-rot-wie-blut-und-weiss-wie-schn-fanchants-free.json')
,(11,25,'Seeing Bayern win','FCBayen Fans','seeing-bayern-win-fanchants-free.mp3','seeing-bayern-win-fanchants-free.json')
;             );

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_id`                     INT(11) NOT NULL AUTO_INCREMENT,
  `room_playing_song_id`        INT(11) NOT NULL,
  `room_playing_song_timestrap` BIGINT  NOT NULL,
  `room_next_song_id`           INT(11) NOT NULL,
  PRIMARY KEY (`room_id`)
) CHARSET=utf8;

INSERT INTO `room`(room_playing_song_id, room_playing_song_timestrap, room_next_song_id) VALUES(1, 0, 1);



