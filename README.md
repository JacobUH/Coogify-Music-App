# COSC 3380: Database Systems Class Repository 💻

Welcome to the repository for the COSC 3380 Database class project. This application project is part of our coursework and collaboration in the Database class.

## Team Members

- Jacob Rangel **(Team Lead)** (GitHub: [JacobUH](https://github.com/JacobUH))
- Diego Vera Garza (GitHub: [~](https://github.com/lindolfo1))
- Abdul Rafay Khan (GitHub: [arkhan24-cs](https://github.com/arkhan24-cs))
- Shruthi Yenamagandla (GitHub: [Shruthi1935](https://github.com/Shruthi1935))
- Emma U. Pham (GitHub: [EMMAPHA](https://github.com/EMMAPHA))

## Project Overview

<p align="center">
  <img src="https://drive.google.com/file/d/177GM2UIrlOe5iacuV7eDKSUfLRw-3xC1/view?usp=drive_link" alt="Screenshot-2024-04-23-at-3-02-05-AM" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://i.ibb.co/v3NDf0H/Screenshot-2024-04-23-at-2-53-29-AM.png" alt="Screenshot-2024-04-23-at-2-53-29-AM" border="0" width="400" height="250" style="margin-right: 60px;">
</p>

Our project aims to display the uses of topics of database systems whether for someone who doesn't know anything or someone who has worked with databases before. Throughout the semester, we'll be collaboratively working on our web application, Coogify Music - The Online Music Library, to showcase our understanding of Database System principles.

## Getting Started

### Dependencies:
Before running the application, ensure you have the following dependencies installed:
- Node.js: [Download and install Node.js](https://nodejs.org/) if you haven't already.
- npm: Node Package Manager, usually comes with Node.js installation.

### Backend Configuration:
- Navigate to TeamProject3380/coogify-app/backend/.env.
- Update the SERVER_HOST variable:
- Change SERVER_HOST = '3.18.22.13' to SERVER_HOST = 'your host (localhost)'.
- If you wish to use your own database:
- Change MYSQL_HOST = 'coogify-database.cj6qgki6g237.us-east-2.rds.amazonaws.com' to MYSQL_HOST = 'your database host'.
- Ensure to also update MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE if you changed MYSQL_HOST.

### Frontend Configuration:
- Navigate to TeamProject3380/coogify-app/frontend/src/apiConfig.ts.
- Update the backendBaseUrl variable:
- Change const backendBaseUrl = 'http://3.18.22.13:3001' to const backendBaseUrl = 'http://${your url (localhost)}:3001';.

### Running the Application:
- Open your terminal.
- Navigate to the ./coogify-app/frontend folder.
- Run npm i to install dependencies.
- Run node app.js.
- Open another terminal.
- Navigate to the ./coogify-app/backend folder.
- Run npm i to install dependencies.
- Run tsc && vite build to compile TypeScript and build the project.
- Finally, run vite --host to start the backend server.
- Now your Coogify App should be up and running!

## Contribution Guidelines

- TBA

## Project Structure

Our repository is strucutred based off the courseload of the class. Inside you will find our web application and documents tailored to prompts for checkpoints given throughout the semester. Hope this helps for anyone curious about Database systems in the future!

## Contact

Feel free to reach out to any of our emails below!

- Jacob Rangel [jacobrangel0628@gmail.com](https://jacobrangel0628@gmail.com)
- Abdul Rafay Khan [a.rafaykhan2002@gmail.com](https://a.rafaykhan2002@gmail.com)
- Shruthi Yenamagandla [yshruthi.14@gmail.com](https://yshruthi.14@gmail.com)
- Diego Vera Garza [~]()
- Emma U. Pham [emmauyentrinh@gmail.com](https://emmauyentrinh@gmail.com)
