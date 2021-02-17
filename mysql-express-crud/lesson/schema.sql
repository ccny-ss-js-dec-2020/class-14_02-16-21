USE first_sql;

CREATE TABLE dog_breeds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  breed VARCHAR(255) NOT NULL,
  origin VARCHAR(255),
  size VARCHAR(255),
  average_life_span INT
);

INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Belgian Shepherd', 'Belgium', 'Medium', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('English Mastif', 'England', 'Large', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Shih Tzu', 'China', 'Small', 13);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Chihuahua', 'Mexico', 'Small', 16);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Rottweiler', 'Germany', 'Large', 9);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Pomeranian', 'Germany', 'Small', 14);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Jack Russell Terrier', 'England', 'Small', 15);
INSERT INTO dog_breeds(breed, origin, size, average_life_span) VALUES ('Australian Shepherd', 'Australia', 'Medium', 13);
