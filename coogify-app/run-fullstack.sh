#!/bin/bash
git pull
cd backend
nohup node app.js &
cd ../frontend
nohup vite --host &