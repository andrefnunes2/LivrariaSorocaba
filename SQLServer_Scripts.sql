BEGIN TRANSACTION;

CREATE DATABASE LivrariaSorocaba
GO

CREATE TABLE Authors(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Author PRIMARY KEY,
	Name VARCHAR(100) NOT NULL,
	LastName VARCHAR(200) NOT NULL,
	Birthday DATETIME,
	Description VARCHAR(500)
)

CREATE TABLE Publishers(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Publisher PRIMARY KEY,
	Name VARCHAR(100) NOT NULL
)

CREATE TABLE Categories(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Category PRIMARY KEY,
	Title VARCHAR(50) NOT NULL
)
GO

CREATE TABLE Books(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Book PRIMARY KEY,
	IDPublisher INT NOT NULL,
	Title VARCHAR(100) NOT NULL,
	ReleaseDay DATETIME,
	Units INT NOT NULL,
	HasCover BIT NOT NULL,
	Description VARCHAR(500),
	Active BIT,
    CONSTRAINT FK_PublisherBook FOREIGN KEY (IDPublisher)
    REFERENCES Publishers(ID)
)
GO

CREATE TABLE CategoryBooks(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_CategoryBook PRIMARY KEY,
	IDCategory INT NOT NULL,
	IDBook INT NOT NULL,
	CONSTRAINT FK_CategoryCategoryBook FOREIGN KEY (IDCategory)
    REFERENCES Categories(ID),
	CONSTRAINT FK_BookCategoryBook FOREIGN KEY (IDBook)
    REFERENCES Books(ID)
)

CREATE TABLE AuthorBooks(
	ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_AuthorBook PRIMARY KEY,
	IDAuthor INT NOT NULL,
	IDBook INT NOT NULL,
	CONSTRAINT FK_AuthorAuthorBook FOREIGN KEY (IDAuthor)
    REFERENCES Authors(ID),
	CONSTRAINT FK_BookAuthorBook FOREIGN KEY (IDBook)
    REFERENCES Books(ID)
)
GO

INSERT INTO Authors VALUES
('Augusto', 'Cury', '1973-02-14', 'Descrição de Augusto Cury'),
('John', 'Green', '1984-10-18', 'Descrição de John Green'),
('Alan', 'Percy', '1989-08-25', 'Descrição de Alan Percy'),
('Almeida', 'Garrett', '1977-02-13', 'Descrição de Almeida Garrett'),
('Alice', 'Munro', '1968-03-02', 'Descrição de Alice Munro')

INSERT INTO Publishers VALUES
('Editora Atlas'),
('Editora 34'),
('Editora Positivo'),
('Editora Fiel')

INSERT INTO Categories VALUES
('Direito'),
('Literatura'),
('Artes'),
('Romance'),
('Aventura'),
('Autoajuda'),
('Administração'),
('Informática'),
('Religião')

INSERT INTO Books VALUES
(1,'O Poder do Hábito', '2011-03-10',5,1,'Descrição do Livro',1),
(1,'O Monge e o Executivo', '2012-04-20',9,1,'Descrição do Livro',0),
(1,'Sonho Grande', '2013-05-30',1,1,'Descrição do Livro',1),
(1,'A Mágica da Arrumação', '2014-06-05',2,1,'Descrição do Livro',1)

INSERT INTO CategoryBooks VALUES
(4,1),
(5,1),
(1,2),
(6,3)

INSERT INTO AuthorBooks VALUES
(3,1),
(4,1),
(5,2),
(2,3)

COMMIT;