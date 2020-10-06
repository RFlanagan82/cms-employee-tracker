USE employees;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role (title, salary)
VALUES ("Sales Lead", 100000), ("Salesperson", 80000),("Lead Engineer", 150000),("Software Engineer",120000),("Accountant", 125000),("Legal Team Lead", 250000),("Lawyer", 190000), ("Marketing Specialist", 75000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Clyburn", 1, 3), ("Richard", "Smith", 2, 1), ("Sal", "Singleton", 3, Null), ("Etienne", "LeBlanc", 4, 3),
("Francoise","Molinaux", 5, Null), ("Buster", "Trawley", 6, Null), ("Keaty", "Denton", 7, 6), ("Christos", "Johannsen", 8, 1);

