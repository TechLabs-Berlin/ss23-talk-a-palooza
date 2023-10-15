# Talkapalooza Python API Documentation

Similar to how un-deployed Node JS apps require some setup with <code>npm i</code> and startup with <code>npm start</code>, the Python backend provided by the Data Science and Deep Learning track also requires users and testers to start up a Python server locally with bash commands. 

The version of the model uploaded here only supports 53 out of the possible words used by the app.

## Setup:

### Python Install:
First, Python 3 needs to be installed. We used Python3.9 with FastAPI, so we recommended choosing the same version.

* [Download Python for Windows](https://www.python.org/downloads/windows/) and [Installation Docs for Windows](https://docs.python.org/3.8/using/windows.html)
* [Python for Mac](https://www.python.org/downloads/macos/) and [Installation Docs for Mac](https://docs.python.org/3.8/using/mac.html)

### Installing Python Dependencies:

Once Python has been installed, we recommend setting up a virtual environment in the <code>/app/fastapi/dl-api/</code> folder. Simply run <code>python3.9 -m venv venv</code> and then activate it by executing <code>source venv/bin/activate</code>.

Afterwards, run <code>pip install -r requirements.txt</code> to install all dependencies. 

### Starting Up Uvicorn Server:
If all indicated dependencies were properly installed, execute <code>uvicorn main:app --reload</code> in the <code>/app/fastapi/dl-api/</code> folder (where <code>main.py</code> is located) to start the server.