# CS157-Team2
Created by Tyler Dunning, Se Chang Oh, Cameron Harris
Last edited 11/27/2023

"Pickup Finder" React Application

A web application using React.js, Node.js, Express.js, and MySQL. The goal of this project is to create a platform for people who play pickup basketball to connect with each other.

Instructions to Run the Program:

First, either unzip the source code from the zip file or clone our git repository using:
git clone https://github.com/Tyler-Dunning/CS157-Team2.git

To set up your SQL server to match the one that our project uses, we have provided a .sql file containing the commands necessary to copy our database. Run this script in your MySQL workbench or another MySQL terminal. You must also enter your SQL root password into the variable labeled “password” found within the file Backend/server.js.

NOTE: We encountered an issue involving the password field and authorization. If the terminal outputs errors after the following step, you may need to change your root password through this command within a MySQL workbench query:
 ALTER USER 'your_username'@'your_hostname' IDENTIFIED WITH 'mysql_native_password' BY 'your_password'; FLUSH PRIVILEGES;

Once this is done, we can deploy our backend. Do this by navigating to the backend folder in a command prompt/terminal using “cd Backend” Once the directory has been selected, type ‘npm start’. (Assuming that npm is installed on the computer)

From there, you will need to open another command prompt/terminal to the frontend folder by typing “cd Frontend” You can then type ‘npm i’ followed by ‘npm run dev’. 

Once all of these steps have been completed, you should be able to click the link that has been output in the frontend terminal and use the website.
