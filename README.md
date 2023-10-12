<p align="center">
logo Talk-a-Palooza
</p>

<div align="center">
An AI-powered app to boost children’s language acquisition (todo: brainstorm/improve)
<br><br>

</div>

<div align="center">

 ![GitHub milestones](https://img.shields.io/github/milestones/all/TechLabs-Berlin/ss23-talk-a-palooza?color=7D93CD&style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/TechLabs-Berlin/ss23-talk-a-palooza?color=B6E08C&style=for-the-badge)   ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/TechLabs-Berlin/ss23-talk-a-palooza?color=FFBBB4&style=for-the-badge)

</div>

&nbsp;

<h5 align="center">
  <a href="#about">About</a>  |
  <a href="#demo">Demo</a>  |
  <a href="#installation">Installation</a>  |
  <a href="#running-the-app">Running the App</a>  |
  <a href="#authors">Authors</a>
</h5>



# About

Talk-a-Palooza is an innovative app designed to address the need for effective language development tools for children.<br> 
It features a machine learning-powered recommendation system that offers users personalized content for vocabulary expansion and assesses pronunciation accuracy during engaging and fun audio exercises.<br>With a user-friendly interface for both parents and children, Talkapalooza empowers young learners on their language development journey.<br><br>
Built with: MERN stack combined with Expo React Native + TailwindCSS, fastApi (+ techno used by DL / DS tensorflow, fastAI...etc...?)

&nbsp;

# Demo

<details>

&nbsp;


<summary>:eyes: Watch Demo</summary>

![Demo](./[LINK])

</details>


&nbsp;
&nbsp;

# Installation

### 1. Setting Up The Correct .env File:
To ensure that our credentials are not exposed on Github, we have set up a <code>.env</code> file containing necessary data to connect to our MongoDB Atlas database. 

The <code>.env</code> file contains all sensitive data necessary to run the app, including database credentials in the following format:
```
#MONGO CONFIG
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.aj9zhtw.mongodb.net/<user>?retryWrites=true&w=majority
```
Therefore, to be able to run the app, please contact [Rose Jeantet](https://github.com/rjeantet) to receive the necessary credentials.

&nbsp;

### 2. Python Setup:
To receive remedy recommendation from the Data Science API, Python 3 needs to be installed. We used Python3.8 with FastAPI, so we recommend choosing the same version.

* [Download Python for Windows](https://www.python.org/downloads/windows/) and [Installation Docs for Windows](https://docs.python.org/3.8/using/windows.html)
* [Python for Mac](https://www.python.org/downloads/macos/) and [Installation Docs for Mac](https://docs.python.org/3.8/using/mac.html)

&nbsp;

### 3. Clone Into The Git Repository:
To pull this application to your local machine, execute the following commands from your command line:

```
git clone https://github.com/TechLabs-Berlin/ss23-talk-a-palooza.git
```

&nbsp;

### Install dependencies:
To run the app, you first need to install all required dependencies for the client, and servers (node and python)

&nbsp;

#### Install the client server (React)

Move to the newly cloned project directory, navigate to the client folder, and install the dependencies
```
cd ss23-talk-a-palooza

cd app/client

npm i
```

#### Install the backend server (Node) 

Navigate to the **server folder**, then install the dependencies:
```
cd ..

cd server

npm i
```

#### Install the deep learning server (Python)  

Navigate to the **dl_api folder**, and install Python dependencies
```
cd ..

cd fastapi/dl_api

XXXX
```

#### Install the data science server (Python)

Navigate to the **ds_api folder**, and install Python dependencies
```
cd ..

cd ds_api

XXXX
```

&nbsp;
&nbsp;

# Running the App
#### Navigate to the **client folder** to start the app (serving port 19006)
```
cd ..

cd client

npm run web
```

#### Navigate to the **server folder** to start the local server (serving port 3001)
```
cd ..

cd server

npm run dev
```
#### To enable the speech recognition tool, navigate to the **dl_api folder** to start the local server - FastAPI (serving port 8000)
```
cd ..

cd fastapi/dl_api

uvicorn main:app --reload
```

#### To enable the machine learning recommendation tool, navigate to the **ds_api folder** to start the local server - FastAPI (serving port 8001)
```
cd ..

cd fastapi/ds_api

DOCKER
```

&nbsp;
&nbsp;

# Authors
User Experience:&nbsp;&nbsp; [Camila Canteros Lopez](https://github.com/) &nbsp;

WD (fullstack):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Rose Jeantet](https://github.com/rjeantet) &nbsp;

Data Science:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Sonia Lyn](https://github.com/lynso), [Ticiane Rover](https://github.com/TicianeRover) &nbsp;

Deep Learning:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Aljoscha Beiers](https://github.com/alj-b) &nbsp;

&nbsp;

## Mentors
[Bogdan Ciobotaru](https://github.com/bciobo), &nbsp;[Christoph Dansard](https://github.com/cdans) &nbsp;


