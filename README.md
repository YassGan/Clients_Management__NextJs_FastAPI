# Clients_Management__NextJs_FastAPI

The Clients Management System is a web application that allows useful tools to manage clients efficiently and gain valuable insights into clients data through charts and beautiful modelisations.



## Features
- Create, update, and delete client records
- Visualize clients' data with interactive charts and graphs

## Technologies Used

- FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.

- Next.js: A framework for building server-rendered React applications with built-in support for server-side rendering (SSR) and static site generation (SSG).

- PostgreSQL: A powerful, open-source relational database management system (RDBMS) known for its robustness, reliability, and SQL compliance.

- Chart.js: A JavaScript library for data visualization that provides interactive charts and graphs to represent client data in a visually appealing way.



## Live Demo
To showcase the application's features, a video demonstration is included below. Hosting a website can be costly, but this video offers an efficient and cost-effective way to explore its functionalities.

## Installation

To run the Clients Management System locally, follow these steps:

##### - 1 Clone the repository:
     git clone https://github.com/YOUR_USERNAME/Clients_Management__NextJs_FastAPI.git`



##### - 2 Navigate to the project directory:
      cd Clients_Management__NextJs_FastAPI



##### - 3 Change the database link :
we have a database.py file that contains the database link, this link should be modified, here is the location of the database file: backend\DataBase\database.py
     from sqlalchemy.orm import declarative_base
     from sqlalchemy import create_engine
     from sqlalchemy.orm import sessionmaker
     
     engine=create_engine("postgresql://postgres:yassine123@localhost/Article_DB",
         echo=True
     )
     
     Base=declarative_base()
     
     SessionLocal=sessionmaker(bind=engine)

this link should be modified like that 
     postgresql://UserName:Password@localhost/databaseName
     






