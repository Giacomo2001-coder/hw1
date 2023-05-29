CREATE TABLE `favorites` (
  id int(11) PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  recipe json,
) ENGINE=InnoDB;

CREATE TABLE `reciptary` (
  ID int(11) PRIMARY KEY AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ENGINE=InnoDB;

