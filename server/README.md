# Crysis - Server

## Getting Started

### Requirements
- Install [Python 2.7](http://docs.python-guide.org/en/latest/starting/installation/).
- Install `pip` and `virtualenv` with this [guide](http://dont-be-afraid-to-commit.readthedocs.io/en/latest/virtualenv.html) and familiarize yourself with them (how to create virtual environment).

### Development

**NOTE**: don't copy `$` character! It only means that the command should be executed in command-line / terminal!

**Create virtual environment:**
```
$ virtualenv venv
```

**Activate virtual environment:**

*OSX / Linux*
```
$ source venv/bin/activate
```
or if the above does not work
```
$ . venv/bin/activate
```

*Windows*
```
$ Scripts\activate
```

After activating the virtual environment your terminal should show `(venv)`. If i does not show that, **DO NOT** proceed with installation step because it will install all packages globally!

**Install dependencies**
```
$ pip install -r requirements.txt
```

**Updating dependencies**

If you add a new package remember to add it to `requirements.txt` file:
```
$ pip freeze > requirements.txt
```
