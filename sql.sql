-- create table if not exists `user`(
--     id_user int auto_increment primary key,
--     first_name varchar(150) not null,
--     last_name varchar(150) not null,
--     email varchar(150) not null,
--     password varchar(255) not null,
--     administrator boolean not null default false,
--     deleted boolean not null default false,
--     created_at DATETIME default CURRENT_TIMESTAMP
-- );
create table if not exists `country`(
    id_country int auto_increment primary key,
    name_country varchar(255) not null
);

create table if not exists `manufacturer`(
    id_manufacturer int auto_increment primary key,
    name_manufacturer varchar(150) not null,
    id_country int,
    foreign key(id_country) references country(id_country)
);

create table if not exists `engine_type`(
    id_engine_type int auto_increment primary key,
    engine_type varchar(255) not null
);

create table if not exists `engine`(
    id_engine int auto_increment primary key,
    engine_code varchar(255),
    horsepower int,
    kilowatt int,
    volume int not null,
    id_engine_type int,
    foreign key (id_engine_type) references engine_type(id_engine_type)
);

create table if not exists `model_type`(
    id_model_type int auto_increment primary key,
    type_name varchar(255) not null
);

create table if not exists `model`(
    id_model int auto_increment primary key,
    name_model varchar(150) not null,
    year_of_manufacture int not null,
    id_manufacturer int not null,
    id_engine int null,
    foreign key(id_manufacturer) references manufacturer(id_manufacturer),
    foreign key(id_engine) references engine(id_engine)
);

create table if not exists `model_type_model`(
    id_model_type int,
    id_model int,

    primary key (id_model_type, id_model),
    foreign key id_model_type(id_model_type) references model_type(id_model_type),
    foreign key id_model(id_model) references model(id_model)
);

create table if not exists `order`(
    id_order int auto_increment primary key,
    id_user int not null,
    order_number varchar(255) not null,
    created_at datetime default current_timestamp,
    total int not null
);

create table if not exists `fuel`(
    id_fuel int auto_increment primary key,
    fuel_name varchar(255) not null,
    kml int null
);

create table if not exists `drive`(
    id_drive int auto_increment primary key,
    drive_type varchar(255) not null
);

create table if not exists `transmission`(
    id_transmission int auto_increment primary key,
    number_of_speeds int not null,
    transmission_type varchar(255) not null
);

create table if not exists `interior`(
    id_interior int auto_increment primary key,
    number_of_doors int not null,
    number_of_seats int not null,
    left_side_steering_wheel boolean not null default true,
    color varchar(255) null
);

CREATE TABLE IF NOT EXISTS `car`(
    id_car INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT not null,
    id_model INT not null,
    id_transmission INT,
    id_drive int not null,
    id_fuel int not null,
    id_interior int not null,
    price DECIMAL not null,
    quantity INT null,
    color varchar(255) null,
    chassie_number varchar(255) null,
    is_preowned boolean not null default true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(id_model) REFERENCES model(id_model),
    foreign key(id_transmission) references transmission(id_transmission),
    foreign key(id_drive) references drive(id_drive),
    foreign key(id_fuel) references fuel(id_fuel),
    foreign key(id_interior) references interior(id_interior)
);

create table if not exists image(
    id_image int auto_increment primary key,
    image_name varchar(255) not null
);

create table if not exists car_image(
    id_image int,
    id_car int,

    primary key (id_car, id_image),
    foreign key id_image(id_image) references image(id_image),
    foreign key id_car(id_car) references car(id_car)
);

create table if not exists `order_car`(
    id_order_car int auto_increment primary key,
    id_car int not null,
    id_poster int not null,
    id_order int not null,
    quantity int null,
    foreign key(id_car) references car(id_car),
    foreign key(id_order) references `order`(id_order)
);

-- insert into
--     `user`(
--         first_name,
--         last_name,
--         email,
--         password,
--         administrator
--     )
-- values
--     (
--         'admin',
--         'admin',
--         'admin@admin.com',
--         '$2y$10$KHo6/FnvXn4O5b/aomvl5e4c7zw8u4b2oFeIWSF1m5oM8P0KBlkYu',
--         true
--     );

-- DROP TABLES --
drop table order_car;

drop table `order`;

drop table image;

drop table car;

drop table model;

drop table manufacturer;