DROP database IF EXISTS yw8uospcgbz3woi1;
CREATE database yw8uospcgbz3woi1;

USE yw8uospcgbz3woi1;

DROP TABLE IF EXISTS "user";
CREATE SEQUENCE IF NOT EXISTS "room_id_seq";
CREATE TABLE "user" (
  "user_id"     INT NOT NULL DEFAULT nextval('room_id_seq'),
  "user_vote"   INT DEFAULT NULL,
  PRIMARY KEY ("user_id")
);

DROP TABLE IF EXISTS "song";
CREATE SEQUENCE IF NOT EXISTS "song_id_seq";
CREATE TABLE "song" (
  "song_id"     INT      NOT NULL DEFAULT nextval('song_id_seq'),
  "song_length" INT      NOT NULL,
  "song_name"   VARCHAR(100) NOT NULL,
  "song_artist" VARCHAR(100) NOT NULL,
  "song_file"   VARCHAR(100) NOT NULL,
  "song_lyric"  VARCHAR(100) NOT NULL,
  PRIMARY KEY ("song_id")
);

INSERT INTO "song"(song_length, song_name, song_artist, song_file, song_lyric) VALUES(225, 'Forever Number One', 'FC Bayern München', 'Forever Number One.mp3', 'Forever Number One.lrc');
INSERT INTO "song"(song_length, song_name, song_artist, song_file, song_lyric) VALUES(187, 'Lemon Tree'        , 'Fools Garden'     , 'Lemon Tree.mp3'        , 'Lemon Tree.lrc'        );
INSERT INTO "song"(song_length, song_name, song_artist, song_file, song_lyric) VALUES(10  , 'none'              , 'none'             , 'none.mp3'              , 'none.lrc'              );

DROP TABLE IF EXISTS "room";
CREATE SEQUENCE IF NOT EXISTS "room_id_seq";
CREATE TABLE "room" (
  "room_id"                     INT NOT NULL DEFAULT nextval('room_id_seq'),
  "room_playing_song_id"        INT NOT NULL,
  "room_playing_song_timestrap" BIGINT  NOT NULL,
  "room_next_song_id"           INT NOT NULL,
  PRIMARY KEY ("room_id")
);

INSERT INTO "room"(room_playing_song_id, room_playing_song_timestrap, room_next_song_id) VALUES(1, 0, 1);



