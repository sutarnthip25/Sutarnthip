create database todolist ;
use todolist;

CREATE USER 'todolist'@'localhost' IDENTIFIED BY 'todolist';
grant all privileges on todolist.* to 'todolist'@'localhost';

CREATE TABLE products (
    SKU VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
    Name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    Price DECIMAL(10, 2),
    status ENUM('active', 'inactive')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- select * from products;

insert into products (SKU, Name, Price, status) values 
('001','AAA','50.00','active'),
('002','BBB','60.00','inactive');

insert into products (SKU, Name, Price, status) values 
('003','CCC','50.00','active'),
('004','DDD','60.00','inactive');


CREATE USER 'todolist'@'localhost' IDENTIFIED BY 'todolist';
grant all privileges on todolist.* to 'todolist'@'localhost';