USE employees;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1),("Lead Engineer", 150000, 2),("Software Engineer",120000, 2),("Accountant", 125000, 3),("Legal Team Lead", 250000, 4),("Lawyer", 190000, 4), ("Marketing Specialist", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Clyburn", 1, 3), ("Richard", "Smith", 2, 1), ("Sal", "Singleton", 3, Null), ("Etienne", "LeBlanc", 4, 3),
("Francoise","Molinaux", 5, Null), ("Buster", "Trawley", 6, Null), ("Keaty", "Denton", 7, 6), ("Christos", "Johannsen", 8, 1);

