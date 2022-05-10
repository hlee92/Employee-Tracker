create database if not exists employee_db; 
use employee_db;

drop table if exists department, role, employee;

create table if not exists department( 
	id	int primary key auto_increment,
    name  varchar(30)
);

create table if not exists role(
	id int primary key auto_increment,
    title  varchar(30),
    salary  decimal,
    department_id  int
);

create table if not exists employee(
	id  int primary key auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);


INSERT INTO department (id, name) VALUES (1, 'Leadership');
INSERT INTO role (id, title, salary, department_id) VALUES (1, 'CEO', 1000000, 1);
INSERT INTO employee (id, first_name, last_name, role_id) VALUES (1, 'Hanna', 'L', '1');
#select * from employee;
