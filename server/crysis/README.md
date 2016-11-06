## Crysis CMS Backend

This is the backend code for Crysis CMS. RESTful API for data access and WebSocket for live update are implemented in Python.


## Getting Started

### Requirements
- Install [Python 3.5](https://www.python.org/downloads/).
- Install `pip` and `virtualenv` with this [guide](http://dont-be-afraid-to-commit.readthedocs.io/en/latest/virtualenv.html) and familiarize yourself with them (how to create virtual environment).
- Redis
  - OSX: `brew install redis`
  - If you don't have Homebrew => install [it](http://brew.sh/
  )


### Development

**NOTE**: don't copy `$` character! It only means that the command should be executed in command-line / terminal!

**Add project files**

You can either unzip the download project files to your working directory or

```
$ git clone https://github.com/Temzasse/ntu-crysis.git
```

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
$ cd /PATH_TO_CRYSIS/crysis
$ pip install -r requirements.txt
```

**Updating dependencies**

If you add a new package remember to add it to `requirements.txt` file:

```
$ pip freeze > requirements.txt
```

**Start Redis server**

*OSX / Linux*
```
$ redis-server /usr/local/etc/redis.conf
```

*Windows*

```
$ TODO...
```

**Load initial user / group data**
```
$ python manage.py loaddata fixtures/initial_usergroup.json
```

**NOTE:** You have to give the right permissions to the groups via admin panel!

`callcenter`
* cms | incident | Can add incident

`responseunit`
* cms | incident | Can change incident
* cms | response unit | Can add response unit
* cms | response unit | Can change response unit

`operator`
* cms | crisis | Can add crisis
* cms | crisis | Can change crisis
* cms | crisis | Can delete crisis
* cms | incident | Can add incident
* cms | incident | Can change incident
* cms | incident | Can delete incident
* cms | response unit | Can add response unit
* cms | response unit | Can change response unit
* cms | response unit | Can delete response unit
* cms | shelter | Can add shelter
* cms | shelter | Can change shelter
* cms | shelter | Can delete shelter

*Permissions below are optional for operator*
* auth | group | Can add group
* auth | group | Can change group
* auth | group | Can delete group
* auth | permission | Can add permission
* auth | permission | Can change permission
* auth | permission | Can delete permission
* auth | user | Can add user
* auth | user | Can change user
* auth | user | Can delete user


**Run server**

```
 $ python manage.py runserver
```

**Run celery task**
```
    - run worker on one terminal
        $ python manage.py celery worker --loglevel=INFO
    - run beat on another terminal
        $ python manage.py celery beat --loglevel=INFO
```

**Test API**

   - test API([example](http://127.0.0.1:8000/cms/api-root)) in your browser    
   - or use command `curl` to send request
   - or install chrome app postman to send request


## Structure
```
├── README.md
├── cms						--> Django app folder
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── admin.py				--> Admin page construction
│   ├── apps.py
│   ├── choice.py
│   ├── consumers.py			--> WebSocket methods
│   ├── migrations
│   │   └── ...
│   ├── models.py				--> Model definations !WORK IN HERE!
│   ├── permission.py			--> Permission class
│   ├── serializers.py		--> REST API serializer class !WORK IN HERE!
│   ├── tests.py
│   ├── urls.py				--> Urls of all APIs
│   └── views.py				--> How the server response the request !WORK IN HERE!
├── crysis
│   ├── __init__.py
│   ├── __pycache__
│   │   └── ...
│   ├── routing.py			--> Differentiate HTTP and WebSocket request
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── requirements.txt
```
## API Reference
##### Users

> Symbol | Type | Owner | Token | isAthenticated
> --------|--------|--------|-------|--------
> <center>:octocat:</center> | SuperUser | CMS administrators | <center>Yes</center> | <center>Yes</center>
> <center>:cop:</center> | User | Call center operaters | <center>Yes</center> | <center>Yes</center>
> <center>:family:</center> | AnonymousUser | Public | <center>No</center> | <center>No</center>

##### Authentication
- `TokenAuthentication` is used
- Get token
	- URL: &nbsp; ~/api-token/"
	- Method: &nbsp; `POST`
	- Request
		``` javascript
		  { "username": YOUR_USERNAME,
            "password": YOUR_PASSWORD }
    	```
    - Response
    	``` javascript
		  { "token": YOUR_TOKEN }
		```
- Authenticate with token
	- URL: any
	- Method: `POST`, `PUT`, `DELETE`
	- Headers

	 	``` javascript
          //There is a space between "Token" and YOUR_TOKEN string
	 	  { "Athorization": "Token " + YOUR_TOKEN }
		```


##### RESTful API


> URL | `GET` | `POST` | `PUT`| `DELETE` | Description
> --- | ----- | ------ | ---- | -------- | -----------
> ~ admin ||||| Django login page for admin user.
> ~ api-token |:octocat: :cop: :family:|:octocat: :cop:||| Return a user token.
> ~ cms/incidnet |:octocat: :cop: :family:|:octocat: :cop:||| Return a list of incidents.
> ~ cms/crisis |:octocat: :cop: :family:|:octocat:||| Return a list of crires.
> ~ cms/responseunit |:octocat: :cop: :family:|:octocat:||| Return a list of response units.
> ~ cms/shelter |:octocat: :cop: :family:|:octocat:||| Return a list of shelters.
> ~ cms/weather |:octocat: :cop: :family:|:octocat:||| Return the current weather info.
> ~ cms/incidnet/i |:octocat: :cop: :family:||:octocat:|:octocat:| Return the incident with `id == i`.
> ~ cms/crisis/i |:octocat: :cop: :family:||:octocat:|:octocat:| Return the crisis with `id == i`.
> ~ cms/responseunit/i |:octocat: :cop: :family:||:octocat:|:octocat:| Return the responseunit with `id == i`.
> ~ cms/shelter/i |:octocat: :cop: :family:||:octocat: |:octocat: | Return the shelter  with `id == i`.
> Legend: &nbsp;&nbsp; :octocat: `SuperUser` &nbsp;&nbsp;&nbsp; :cop: `User` &nbsp;&nbsp;&nbsp; :family: `AnonymousUser`


##### WebSocket
- Groups

> Name | `CREATE` | `UPDATE` | `DELETE`
> ------|------|-------|------
> Incident | <center>Yes</center> | <center>Yes</center> | <center>Yes</center>
> Crisis | <center>Yes</center> | <center>Yes</center> | <center>Yes</center>
> Weather | <center>No</center> | <center>No</center> | <center>No</center>

- Format
	```javascript
      {"type": TYPE_OF_CHANGE,  				// "CREATE", "UPDATE"，"DELETE"
       "data": {SERIALIZATION_OF_THE_OBJECT} }	// "deleted" for "DELETION"
 	```

- Connect

	```javascript
	  socket = new WebSocket("ws://" + window.location.host + "/YOUR_GROUP/");
	```

- React for messages

	```javascript
	  socket.onmessage = function(e){action here with e.data}
	```


- Messages of incident and crisis changes will be sent to Group 'User'.

## References

 * [Python 3.5](https://docs.python.org/3/)
 * [Django 1.10](https://github.com/django/django) Python web framework for backend HTTP request.  [Tutorial](https://docs.djangoproject.com/en/1.10/)
 * [Django-REST-framework](https://github.com/tomchristie/django-rest-framework) for RESTful API. [Tutorial](http://www.django-rest-framework.org/)
 * [Channels](https://github.com/django/channels) for WebSocket implementation. [Tutorial](http://channels.readthedocs.org)
