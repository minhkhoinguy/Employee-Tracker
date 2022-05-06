INSERT INTO  department(name)
VALUES ('Marketing'),
       ('Sale'),
       ('HR'),
       ('Finance');


INSERT INTO  role(title,salary,department_id)
VALUES ('Marketing Manager', 110400,1),
       ('Marketing Specialist', 73000,1),
       ('Regional Sales Manager',133000,2),
       ('Sale Development Rep',60100,2),
       ('Employment manager',105100,3),
       ('Human Resources Analyst',69000,3),
       ('Chief Financial Officer',135000,4),
       ('Financial Accountant',56900,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('Fiora','Laurent',1,NULL),
       ('Connor','Hawke',2,1),
       ('Akali','Tethi',3,NULL),
       ('Richard','Grayson',4,3),
       ('Nico','Robin ',5,NULL),
       ('Tony','Chopper',6,5),
       ('Khada','Jhin',7,NULL),
       ('Gao','Nguy',8,7);
