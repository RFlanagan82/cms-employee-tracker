DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
id Integer AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id Integer AUTO_INCREMENT,
title VARCHAR(30),
salary INTEGER,
department_id INTEGER
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER NULL
);