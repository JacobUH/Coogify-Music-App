# COSC 3380: Database Systems Class Repository 💻

Welcome to the repository for the COSC 3380 Database class project. This application project is part of our coursework and collaboration in the Database class.

## Team Members

- Jacob Rangel (GitHub: [JacobUH](https://github.com/JacobUH))
- Abdul Rafay Khan (GitHub: [arkhan24-cs](https://github.com/arkhan24-cs))
- Shruthi Yenamagandla (GitHub: [Shruthi1935](https://github.com/Shruthi1935))
- Diego Vera Garza (GitHub: [~](https://github.com/))
- Emma U. Pham (GitHub: [EMMAPHA](https://github.com/EMMAPHA))

## Project Overview

<p align="center">
  <img src="https://i.ibb.co/X25vK2W/Home-Page.png" width="48%" height="100%" alt="Image 1">
  <img src="https://i.ibb.co/xFbwWzp/Dashboard-Page.png" width="48%" height="100%" alt="Image 2">
</p>

Our project aims to display the uses of topics of database systems whether for someone who doesn't know anything or someone who has worked with databases before. Throughout the semester, we'll be collaboratively working on our web application, Coogify Music - The Online Music Library, to showcase our understanding of Database System principles.

## Getting Started

 - go to ```TeamProject3380/coogify-app/backend/.env```
   - change the ```SERVER_HOST = '3.18.22.13'``` to ```SERVER_HOST = 'your host (localhost)'```
   - if you wish to use your own database, then change ```MYSQL_HOST = 'coogify-database.cj6qgki6g237.us-east-2.rds.amazonaws.com'``` to ```MYSQL_HOST = 'your database host'```
     - (if you change the MYSQL_HOST, you also need to change the MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE)
 - go to ```TeamProject3380/coogify-app/frontend/src/apiConfig.ts```
   - change ```const backendBaseUrl = 'http://3.18.22.13:3001'``` to ```const backendBaseUrl = 'http://${your url (localhost)}:3001';```
 - in your terminal go into the ```./coogify-app/frontend``` folder
   - run ```npm i```
   - run ```node app.js```
 - open another terminal and go to ```./coogify-app/backend``` folder
   - run ```npm i```
   - run ```tsc && vite build```
   - run ```vite --host```

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
