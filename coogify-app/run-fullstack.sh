#!/bin/bash
git pull
cd backend
npm i
nohup node app.js &
cd ../frontend
npm i
tsc && vite build
nohup vite --host &
echo "APPLICATION IS READY ----------------------------------"