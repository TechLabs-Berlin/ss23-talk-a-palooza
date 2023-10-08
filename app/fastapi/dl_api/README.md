# Talkapalooza Python API Documentation

Similar to how un-deployed Node JS apps require some setup with <code>npm i</code> and startup with <code>npm start</code>, the Python backend provided by the Data Science and Deep Learning track also requires users and testers to start up a Python server locally with bash commands. 

## Setup:

### Python Install:
First, Python 3 needs to be installed. We used Python3.8+ with FastAPI, so we recommended choosing the same version.

* [Download Python for Windows](https://www.python.org/downloads/windows/) and [Installation Docs for Windows](https://docs.python.org/3.8/using/windows.html)
* [Python for Mac](https://www.python.org/downloads/macos/) and [Installation Docs for Mac](https://docs.python.org/3.8/using/mac.html)

### Installing Python Dependencies:
Once Python has been installed, run <code>pip install -r requirements.txt</code> in the <code>/app/fastapi</code> folder (where the <code>requirements.txt</code> file is stored) to install all dependencies. If there are several Python versions installed, users might have to specify the version instead.

### Starting Up Uvicorn Server:
If all indicated dependencies were properly installed, execute <code>uvicorn main:app --reload</code> in the <code>/app/fastapi</code> folder (where <code>main.py</code> is located) to start the server.