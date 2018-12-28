CREATE DATABASE IF NOT EXISTS tower_defense;

USE tower_defense;

CREATE TABLE IF NOT EXISTS users
(
  user_id SERIAL,
  name VARCHAR(255),
  password VARCHAR(255),
  registration_date DATE
) ENGINE INNODB DEFAULT CHARSET = UTF8;

INSERT INTO users
    (name, password, registration_date)
VALUES ();

CREATE TABLE records
(
  record_id SERIAL,
  user_id BIGINT,
  record_date DATE,
  scores INT
) ENGINE INNODB DEFAULT CHARSET = UTF8;

INSERT INTO records
    (user_id, record_date, scores)
VALUES ();

SELECT users.name, records.record_date, records.scores
FROM users
       INNER JOIN records USING (user_id)
ORDER BY records.scores DESC;


