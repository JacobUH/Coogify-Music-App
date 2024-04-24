# Coogify Music: Your Melodies, Your Moments.

Welcome to the repository for Coogify Music! Created at the Univarsity of Houston in the COSC 3380 Database Systems class. This application project is a collaboration of Team 10 in the Database Systems class.

You can check out the Figma here Jacob used to design the interface of the web application: [Coogify Figma](https://www.figma.com/file/ltTh4kdESnNopkHbfQzhZy/Coogify-Music-Interface?type=design&node-id=0-1&mode=design&t=HVVXC6FgRquDLLsT-0)

## Team Members
- Jacob Rangel **(Team Lead)** (GitHub: [JacobUH](https://github.com/JacobUH))
- Diego Vera Garza (GitHub: [lindolfo1](https://github.com/lindolfo1))
- Abdul Rafay Khan (GitHub: [arkhan24-cs](https://github.com/arkhan24-cs))
- Shruthi Yenamagandla (GitHub: [Shruthi1935](https://github.com/Shruthi1935))
- Emma U. Pham (GitHub: [EMMAPHA](https://github.com/EMMAPHA))

## Website Screenshots

<p align="center">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaEdoI-sY4LyGGNTlW8V5UaiwUIv5hw1ywU0FYSzGUl0ZHBd9ETROshYM2pIcuiIdtrWGe7rOv-CgtMKg0mIJ_zsGwtwgJ9B48=s1600-rw-v1" alt="Landing Page" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbtdIPxEfWe7ZVfYkmMe0ngfaWPHaCwwJu61o-m4_Jg9yeo4Ox4Q7qVpkW-RIwDSUjW8zCyI4M9ndWon9xNxkRryJWn1fQlJo0=s1600-rw-v1" alt="Sign Up" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYEx6dLhfMhgYDRR6D2PmujDzIuEn3bo5YhD3_XBZ3qoWRJi02cHlLln0umVOW5ePLD2jiHgh-plRxrYAcXDcOfaIXdkECFFQ=s1600-rw-v1" alt="Dashboard" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbmJYk_GlYGBMqA1geHpu72-mAlW5PsGuRwYBe3oTiqgIHheGvwYHD00zA2cP9vBjZj3LVyzYQftvthCsX2-KqvxIalSfX3w5c=s1600-rw-v1" alt="Album Page" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbFJzgbZH2wVO-FwKi6kQLhU7a8RWryLAolKkOfHZ5Ypx_6DBNXEVPs_njuQJPbV3CRSbcJpv9RabkY7XLk27nJjXB31EitTw=s1600-rw-v1" alt="Search" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihY1o_8-OrkwGjT-_tyyHvutMrmNdCrYN3gfuAjEQDKAU-_nNj4Z53YKxIuYBocoFqcD12T6Vpc5aypkJ9-t2-EGK2zlvBHvabU=s1600-rw-v1" alt="Library" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbxexQrBdUm3oloZ0KAQCwhFYmlNDJQvgQtR-GMELWQJhy-00Hc7hy0oI7_iHC4vaXuWihAwbDGoHbCL3dSwpHgpoY7nmzlmA=s1600-rw-v1" alt="Analytics" border="0" width="400" height="250" style="margin-right: 60px;">
  <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYacfX-oujJs8YRMfDVyX7JZEjtecP36u5xDch-KIJMSOVolzv2-wPPpgwlj8_PmxTwvUg_fRM0muRnzslO9nRR4mpFnX_5zJ4=s1600-rw-v1" alt="Admin Portal" border="0" width="400" height="250" style="margin-right: 60px;">
</p>

## Getting Started
If you are interested in running our music application on your own device for testing, here eare some steps for getting you up to date to run it.

### Dependencies:
Before running the application, ensure you have the following dependencies installed:
- Node.js: [Download and install Node.js](https://nodejs.org/) if you haven't already.
- npm: Node Package Manager, usually comes with Node.js installation.

### Backend Configuration:
1. Navigate to TeamProject3380/coogify-app/backend/.env.
2. Update the SERVER_HOST variable:
3. Change SERVER_HOST = '3.18.22.13' to SERVER_HOST = 'your host (localhost)'.
4. If you wish to use your own database:
5. Change MYSQL_HOST = 'coogify-database.cj6qgki6g237.us-east-2.rds.amazonaws.com' to MYSQL_HOST = 'your database host'.
6. Ensure to also update MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE if you changed MYSQL_HOST.

### Frontend Configuration:
1. Navigate to TeamProject3380/coogify-app/frontend/src/apiConfig.ts.
2. Update the backendBaseUrl variable: Change const backendBaseUrl = 'http://3.18.22.13:3001' to const backendBaseUrl = 'http://${your url (localhost)}:3001';.

### Running the Application:
1. Open your terminal.
2. Navigate to the ./coogify-app/frontend folder.
3. Run npm i to install dependencies.
4. Run node app.js.
5. Open another terminal.
6. Navigate to the ./coogify-app/backend folder.
7. Run npm i to install dependencies.
8. Run tsc && vite build to compile TypeScript and build the project.
9. Finally, run vite --host to start the backend server.

### Now your Coogify App should be up and running!

## Contributions
### Jacob - Team Lead
- Overall Styling of Application, used figma to create and mockup all views of the app.
- Lead the team for all views on the frontend side. (Listener, Artist, Admin)
- Connected and created backend apis to following pages/components: music content on app, playlist/library functionality, search functionality, artist analytics, admin portal.
- Made a multitude of queries for fetching tracks, user information, artist credentials, admin privileges, subscription, etc.
- Helped other teammates with their assigned tasks when they needed my help.
- Created the database and schema for the application in SQL.

### Diego
- Lead the backend side of the application.
- Deployed the web application and database using aws.
- Created the authentication system for the application.
- Created the upload functionality for the app. (upload music, images)
-  Monitored the database checking for incorrect data, etc.

### Rafay
- Created the Profile Page and connected hashing functionality for the password.
- Made the APIs dealing with fetch profle information and changing details.
- Loaded Music and files into the database.
- Created styling for upload artist view. 

### Shruthi
- Created the Payment system of the web application.
- Created the design of the admin and artist data report tables as well as enforcing constraints on user input.
- Created the multiple extended pages of the specified genres on the home page and the APIs to fetch the specifed genre.
- Loaded Music and files into the database.

### Emma
- Created the Subscription Display and functionality.
- Helped style pages of the frontend to match Jacob's design.
- Loaded Music and files into the database.

## Contact
Feel free to reach out to any of our emails below!

- Jacob Rangel [jacobrangel0628@gmail.com](https://jacobrangel0628@gmail.com)
- Abdul Rafay Khan [a.rafaykhan2002@gmail.com](https://a.rafaykhan2002@gmail.com)
- Shruthi Yenamagandla [yshruthi.14@gmail.com](https://yshruthi.14@gmail.com)
- Diego Vera Garza [~]()
- Emma U. Pham [emmauyentrinh@gmail.com](https://emmauyentrinh@gmail.com)
