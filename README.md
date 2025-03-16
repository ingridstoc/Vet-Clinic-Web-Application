## Vet Clinic Web Application

## Description

The Vet Clinic Web Application is a full-stack web application designed to streamline veterinary clinic operations. It allows medical staff to manage patient records, consultations, treatments, and medications efficiently. Built with React for the frontend, Node.js for the backend, and MySQL as the database, the application ensures seamless data exchange and user-friendly interactions.

## Features

+**Patient Management**: Add, edit, delete and view patient records.
+**Statistics**: Observe informations and statistics about the clinic's patients, consultations and doctors.
+**Doctors & Owner Profiles**: Store and manage information about doctors and pet owners.

## Technologies Used

-**Frontend**
-React.js: Component-based UI development
-Axios: API communication
-CSS: Responsive design

-**Backend**

-Node.js & Express.js: Server-side logic
-MySQL: Relational database for storing clinic records

## Installation & Setup

## Prerequisites
Ensure you have the following installed:
-Node.js (Latest LTS version)
-MySQL Server

## Features

+ **Patient Management**: Add, edit, delete and view patient records.  
+ **Statistics**: Observe information and statistics about the clinic's patients, consultations, and doctors.  
+ **Doctors & Owner Profiles**: Store and manage information about doctors and pet owners.  

## Technologies Used

- **Frontend**  
  - React.js: Component-based UI development  
  - Axios: API communication  
  - CSS: Responsive design  

- **Backend**  
  - Node.js & Express.js: Server-side logic  
  - MySQL: Relational database for storing clinic records  

## Installation & Setup

## Prerequisites  
Ensure you have the following installed:  
- Node.js (Latest LTS version)  
- MySQL Server  



## Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure database connection:
   ```bash
    host: "127.0.0.1",
    user: "root",
    password: "Pass",
    port: 3307,
    database: "veterinar"
   ```
3. Start the backend server:
   ```bash
   node index.js
   ```
## Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the React development server:
   ```bash
   npm start
   ```

## API Endpoints

| Method    | Endpoint | Description                                                         | 
|----------|----------|----------------------------------------------------------------------|
| POST   | api/medic | Create Medic | 
| GET    |  api/medic/consultatiinume | Get the consultations of each doctor ordered by name |
| DELETE | api/pacient/:id | Delete the pacient by id |
| PUT    | api/pacient/:id | Edit pacient's data |

