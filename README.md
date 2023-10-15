<p align="center">
<img src="https://raw.githubusercontent.com/TechLabs-Berlin/ss23-talk-a-palooza/documentation/assets/talkAPalooza.png" width="250px"></p>
</p>

<div align="center">
An AI-powered app to boost children’s language acquisition (todo: brainstorm/improve)
<br><br>

</div>

<div align="center">

![GitHub milestones](https://img.shields.io/github/milestones/all/TechLabs-Berlin/ss23-talk-a-palooza?color=7D93CD&style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/TechLabs-Berlin/ss23-talk-a-palooza?color=B6E08C&style=for-the-badge) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/TechLabs-Berlin/ss23-talk-a-palooza?color=FFBBB4&style=for-the-badge)

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

**Built with:**


![MongoDB](https://camo.githubusercontent.com/c839570bc71901106b11b8411d9277a6a8356a9431e4a16d6c26db82caab7d62/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465) ![React](https://camo.githubusercontent.com/7f7f82a8db00cc56b28b068b383ac4db995a3ed1e70c2b4163d205be4f166a49/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d52656163742d3039303930393f7374796c653d666f722d7468652d6261646765266c6f676f3d5265616374) ![TailwindCSS](https://camo.githubusercontent.com/e9b080a6541e5355827ea91b6a0302cbbc54af4705b0c6b0f1561a0957ced2fb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5461696c77696e645f4353532d3338423241433f7374796c653d666f722d7468652d6261646765266c6f676f3d7461696c77696e642d637373266c6f676f436f6c6f723d7768697465) ![Node](https://camo.githubusercontent.com/cc96d7d28a6ca21ddbb1f2521d751d375230ed840271e6a4c8694cf87cc60c14/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732532302d2532333433383533442e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![PYTHON](https://camo.githubusercontent.com/a1b2dac5667822ee0d98ae6d799da61987fd1658dfeb4d2ca6e3c99b1535ebd8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d3336373041303f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d666664643534)
![FASTAPI](https://camo.githubusercontent.com/0dc77879e3ee5ed780c6bc624050af6f7d693832485f50163c0bf28dcbd7bcf2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466173744150492d3030353537313f7374796c653d666f722d7468652d6261646765266c6f676f3d66617374617069)

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

- [Download Python for Windows](https://www.python.org/downloads/windows/) and [Installation Docs for Windows](https://docs.python.org/3.8/using/windows.html)
- [Python for Mac](https://www.python.org/downloads/macos/) and [Installation Docs for Mac](https://docs.python.org/3.8/using/mac.html)

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

User Experience:&nbsp;&nbsp; [Camila Canteros Lopez](https://github.com/Camilagraciac) &nbsp;

WD (fullstack):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Rose Jeantet](https://github.com/rjeantet) &nbsp;

Data Science:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Sonia Lyn](https://github.com/lynso), [Ticiane Rover](https://github.com/TicianeRover) &nbsp;

Deep Learning:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Aljoscha Beiers](https://github.com/alj-b) &nbsp;

&nbsp;

## Mentors

[Bogdan Ciobotaru](https://github.com/bciobo), &nbsp;[Christoph Dansard](https://github.com/cdans) &nbsp;
