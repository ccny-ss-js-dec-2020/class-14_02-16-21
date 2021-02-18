USE first_sql;

CREATE TABLE cat_breeds (
  breed VARCHAR(255),
  lifespan VARCHAR(255),
  origin VARCHAR(255),
  height VARCHAR(255),
  length VARCHAR(255)
);

INSERT INTO cat_breeds (breed, lifespan, origin, height) VALUES ('Persian Cat', '10-17 Years', 'Iran', '10-15 Inches');
INSERT INTO cat_breeds (breed, length) VALUES ('Maine Coon', '3.3 Feet');
INSERT INTO cat_breeds (breed, lifespan) VALUES ('Bengal Cat', '12-16 Years');
INSERT INTO cat_breeds (breed, lifespan) VALUES ('British Shorthair', '20 Years');
