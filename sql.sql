# DEPRECATED
# USE DJANGO MIGRATIONS

# create database if not exists `wheelerdealers`;
#
# use `wheelerdealers`;
#
# create table if not exists `user`(
#     id_user int auto_increment primary key,
#     first_name varchar(150) not null,
#     last_name varchar(150) not null,
#     email varchar(150) not null,
#     password varchar(255) not null,
#     administrator boolean not null default false,
#     deleted boolean not null default false,
#     created_at DATETIME default CURRENT_TIMESTAMP
# );
#
# create table if not exists `country`(
#     id_country int auto_increment primary key,
#     name_country varchar(255) not null
# );
#
# create table if not exists `manufacturer`(
#     id_manufacturer int auto_increment primary key,
#     name_manufacturer varchar(150) not null,
#     id_country int,
#     foreign key(id_country) references country(id_country)
# );
#
# create table if not exists `engine_type`(
#     id_engine_type int auto_increment primary key,
#     engine_type varchar(255) not null
# );
#
# create table if not exists `engine`(
#     id_engine int auto_increment primary key,
#     engine_code varchar(255),
#     horsepower int,
#     kilowatt int,
#     volume int not null,
#     id_engine_type int,
#     foreign key (id_engine_type) references engine_type(id_engine_type)
# );
#
# create table if not exists `model_type`(
#     id_model_type int auto_increment primary key,
#     type_name varchar(255) not null
# );
#
# create table if not exists `model`(
#     id_model int auto_increment primary key,
#     name_model varchar(150) not null,
#     year_of_manufacture int not null,
#     id_manufacturer int not null,
#     id_engine int null,
#     foreign key(id_manufacturer) references manufacturer(id_manufacturer),
#     foreign key(id_engine) references engine(id_engine)
# );
#
# create table if not exists `model_type_model`(
#     id_model_type int,
#     id_model int,
# 	primary key(id_model_type, id_model),
#     foreign key (id_model_type) references `model_type`(id_model_type),
#     foreign key (id_model) references `model`(id_model)
# );
#
# create table if not exists `order`(
#     id_order int auto_increment primary key,
#     id_user int not null,
#     order_number varchar(255) not null,
#     created_at datetime default current_timestamp,
#     total int not null
# );
#
# create table if not exists `fuel`(
#     id_fuel int auto_increment primary key,
#     fuel_name varchar(255) not null,
#     kml int null
# );
#
# create table if not exists `drive`(
#     id_drive int auto_increment primary key,
#     drive_type varchar(255) not null
# );
#
# create table if not exists `transmission`(
#     id_transmission int auto_increment primary key,
#     number_of_speeds int not null,
#     transmission_type varchar(255) not null
# );
#
# create table if not exists `interior`(
#     id_interior int auto_increment primary key,
#     number_of_doors int not null,
#     number_of_seats int not null,
#     left_side_steering_wheel boolean not null default true,
#     color varchar(255) null
# );
#
# CREATE TABLE IF NOT EXISTS `car`(
#     id_car INT AUTO_INCREMENT PRIMARY KEY,
#     id_user INT not null,
#     id_model INT not null,
#     id_transmission INT,
#     id_drive int not null,
#     id_fuel int not null,
#     id_interior int not null,
#     price DECIMAL not null,
#     quantity INT null,
#     color varchar(255) null,
#     chassie_number varchar(255) null,
#     is_preowned boolean not null default true,
#     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
#     FOREIGN KEY(id_model) REFERENCES model(id_model),
#     foreign key(id_transmission) references transmission(id_transmission),
#     foreign key(id_drive) references drive(id_drive),
#     foreign key(id_fuel) references fuel(id_fuel),
#     foreign key(id_interior) references interior(id_interior)
# );
#
# create table if not exists image(
#     id_image int auto_increment primary key,
#     image_name varchar(255) not null
# );
#
# create table if not exists car_image(
#     id_image int,
#     id_car int,
# 	primary key(id_image, id_car),
#     foreign key (id_image) references image(id_image),
#     foreign key (id_car) references car(id_car)
# );
#
# create table if not exists `order_car`(
#     id_order_car int auto_increment primary key,
#     id_car int not null,
#     id_poster int not null,
#     id_order int not null,
#     quantity int null,
#     foreign key(id_car) references car(id_car),
#     foreign key(id_order) references `order`(id_order)
# );
#
# insert into
#     `user`(
#         first_name,
#         last_name,
#         email,
#         password,
#         administrator
#     )
# values
#     (
#         'admin',
#         'admin',
#         'admin@admin.com',
#         '$2y$10$KHo6/FnvXn4O5b/aomvl5e4c7zw8u4b2oFeIWSF1m5oM8P0KBlkYu',
#         true
#     );

-- DROP TABLES --
-- drop table order_car;

-- drop table `order`;

-- drop table image;

-- drop table car;

-- drop table model;

-- drop table manufacturer;

-- drop table `user`;

# Dummy Data

-- Country (30 rows)
INSERT INTO wheelerDealersApi_country (name)
VALUES ('Serbia'),
       ('Germany'),
       ('Italy'),
       ('France'),
       ('Japan'),
       ('USA'),
       ('South Korea'),
       ('Czech Republic'),
       ('Spain'),
       ('UK'),
       ('Sweden'),
       ('Poland'),
       ('Romania'),
       ('Hungary'),
       ('Slovakia'),
       ('Austria'),
       ('Netherlands'),
       ('Belgium'),
       ('Switzerland'),
       ('Croatia'),
       ('Slovenia'),
       ('Turkey'),
       ('India'),
       ('China'),
       ('Mexico'),
       ('Brazil'),
       ('Canada'),
       ('Australia'),
       ('Russia'),
       ('Portugal');

-- EngineType (30 rows)
INSERT INTO wheelerDealersApi_enginetype (type)
VALUES ('Inline-4'),
       ('V6'),
       ('V8'),
       ('Inline-6'),
       ('Flat-4'),
       ('V12'),
       ('Electric'),
       ('Hybrid'),
       ('Inline-3'),
       ('V10'),
       ('Flat-6'),
       ('W12'),
       ('W16'),
       ('V16'),
       ('Inline-5'),
       ('Rotary'),
       ('V4'),
       ('Inline-8'),
       ('V2'),
       ('Single-Cylinder'),
       ('Parallel Twin'),
       ('V-Twin'),
       ('Boxer-4'),
       ('Boxer-6'),
       ('W8'),
       ('Inline-2'),
       ('H4'),
       ('H6'),
       ('Turbocharged I4'),
       ('Supercharged V8');

-- EmissionClass (30 rows)
INSERT INTO wheelerDealersApi_emissionclass (class_name)
VALUES ('Euro 6d'),
       ('Euro 6d-TEMP'),
       ('Euro 6c'),
       ('Euro 6b'),
       ('Euro 5'),
       ('Euro 4'),
       ('Euro 3'),
       ('Euro 2'),
       ('Euro 1'),
       ('Zero Emission'),
       ('SULEV'),
       ('ULEV'),
       ('LEV III'),
       ('Tier 2 Bin 5'),
       ('Tier 3'),
       ('China 6'),
       ('China 5'),
       ('China 4'),
       ('Bharat Stage VI'),
       ('Bharat Stage IV'),
       ('EPA Tier 3'),
       ('CARB LEV'),
       ('JC08'),
       ('WLTP Class A'),
       ('WLTP Class B'),
       ('Pre-Euro'),
       ('Non-Compliant'),
       ('Exempt'),
       ('Future Standard'),
       ('Pending Classification');

-- ModelType (30 rows)
INSERT INTO wheelerDealersApi_modeltype (type)
VALUES ('Sedan'),
       ('Hatchback'),
       ('SUV'),
       ('Coupe'),
       ('Wagon'),
       ('Convertible'),
       ('Van'),
       ('Pickup Truck'),
       ('Crossover'),
       ('Minivan'),
       ('Sports Car'),
       ('Roadster'),
       ('Estate'),
       ('Limousine'),
       ('MPV'),
       ('City Car'),
       ('Subcompact'),
       ('Compact'),
       ('Midsize'),
       ('Full-size'),
       ('Microcar'),
       ('Supercar'),
       ('Hypercar'),
       ('Off-road'),
       ('4x4'),
       ('Cabriolet'),
       ('Targa'),
       ('Shooting Brake'),
       ('Hot Hatch'),
       ('Grand Tourer');

-- TransmissionType (30 rows)
INSERT INTO wheelerDealersApi_transmissiontype (type)
VALUES ('Manual'),
       ('Automatic'),
       ('CVT'),
       ('Single-Speed Electric'),
       ('DCT'),
       ('Semi-Automatic'),
       ('Automated Manual'),
       ('Tiptronic'),
       ('DSG'),
       ('PDK'),
       ('ZF 8-Speed'),
       ('Aisin 6-Speed'),
       ('Getrag 6-Speed'),
       ('Powershift'),
       ('IVT'),
       ('e-CVT'),
       ('Hydramatic'),
       ('TorqueFlite'),
       ('Sequential'),
       ('Multitronic');

-- Fuel (30 rows)
INSERT INTO wheelerDealersApi_fuel (type)
VALUES ('Petrol'),
       ('Diesel'),
       ('Electric'),
       ('Hybrid'),
       ('Plug-in Hybrid'),
       ('LPG'),
       ('CNG'),
       ('Hydrogen'),
       ('Ethanol'),
       ('Biodiesel'),
       ('E85'),
       ('E10'),
       ('Mild Hybrid'),
       ('Full Hybrid'),
       ('Range Extender'),
       ('Natural Gas'),
       ('Propane'),
       ('Methanol'),
       ('Gasoline'),
       ('Premium Unleaded'),
       ('Regular Unleaded'),
       ('Super Unleaded'),
       ('AdBlue Diesel'),
       ('HVO Diesel'),
       ('B20 Biodiesel'),
       ('Flex Fuel'),
       ('Dual Fuel'),
       ('Bi-Fuel'),
       ('Compressed Air'),
       ('Solar');

-- Drivetrain (30 rows)
INSERT INTO wheelerDealersApi_drivetrain (type)
VALUES ('FWD'),
       ('RWD'),
       ('AWD'),
       ('4WD'),
       ('4x4'),
       ('xDrive'),
       ('Quattro'),
       ('4MATIC'),
       ('SH-AWD'),
       ('ATTESA'),
       ('Haldex'),
       ('Torsen'),
       ('Part-Time 4WD'),
       ('Full-Time 4WD'),
       ('On-Demand AWD'),
       ('Symmetrical AWD'),
       ('E-4WD'),
       ('Intelligent AWD'),
       ('Active AWD'),
       ('Dynamic AWD'),
       ('Rear-Biased AWD'),
       ('Front-Biased AWD'),
       ('Electric AWD'),
       ('Dual-Motor AWD'),
       ('Tri-Motor AWD'),
       ('Selectable 4WD'),
       ('Automatic AWD'),
       ('Mechanical AWD'),
       ('Electronic AWD'),
       ('Hybrid AWD');

-- Manufacturer (30 rows, reusing country IDs)
INSERT INTO wheelerDealersApi_manufacturer (country_id, name)
VALUES (2, 'Volkswagen'),
       (2, 'BMW'),
       (2, 'Mercedes-Benz'),
       (2, 'Audi'),
       (2, 'Porsche'),
       (3, 'Fiat'),
       (3, 'Alfa Romeo'),
       (3, 'Ferrari'),
       (3, 'Lamborghini'),
       (3, 'Maserati'),
       (4, 'Renault'),
       (4, 'Peugeot'),
       (4, 'Citroën'),
       (5, 'Toyota'),
       (5, 'Honda'),
       (5, 'Nissan'),
       (5, 'Mazda'),
       (5, 'Subaru'),
       (7, 'Hyundai'),
       (7, 'Kia'),
       (8, 'Škoda'),
       (6, 'Tesla'),
       (6, 'Ford'),
       (6, 'Chevrolet'),
       (6, 'Dodge'),
       (10, 'Jaguar'),
       (10, 'Land Rover'),
       (11, 'Volvo'),
       (1, 'Zastava'),
       (9, 'SEAT');

-- Model (30 rows, reusing manufacturer IDs)
INSERT INTO wheelerDealersApi_model (name, manufacturer_id)
VALUES ('Golf', 1),
       ('Passat', 1),
       ('Tiguan', 1),
       ('3 Series', 2),
       ('5 Series', 2),
       ('X5', 2),
       ('C-Class', 3),
       ('E-Class', 3),
       ('GLC', 3),
       ('A4', 4),
       ('A6', 4),
       ('Q5', 4),
       ('911', 5),
       ('Cayenne', 5),
       ('500', 6),
       ('Panda', 6),
       ('Giulia', 7),
       ('Stelvio', 7),
       ('Clio', 11),
       ('Megane', 11),
       ('208', 12),
       ('3008', 12),
       ('Corolla', 14),
       ('Camry', 14),
       ('Civic', 15),
       ('Accord', 15),
       ('Qashqai', 16),
       ('Tucson', 19),
       ('Sportage', 20),
       ('Octavia', 21);

-- ModelTypeModel (30 rows, linking models to types)
INSERT INTO wheelerDealersApi_modeltypemodel (model_type_id, model_id)
VALUES (2, 1),
       (1, 2),
       (3, 3),
       (1, 4),
       (1, 5),
       (3, 6),
       (1, 7),
       (1, 8),
       (3, 9),
       (1, 10),
       (1, 11),
       (3, 12),
       (4, 13),
       (3, 14),
       (2, 15),
       (2, 16),
       (1, 17),
       (3, 18),
       (2, 19),
       (2, 20),
       (2, 21),
       (3, 22),
       (1, 23),
       (1, 24),
       (1, 25),
       (1, 26),
       (3, 27),
       (3, 28),
       (3, 29),
       (2, 30);
