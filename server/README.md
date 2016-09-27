## Crysis CMS Backend

This is the backend code for Crysis CMS. RESTful API for data access and WebSocket for live update are implemented in Python.


## Installation

- Run at locolhost

	```javascript
      /* Command-line *
       * Prerequsite: Python3.5, pip/pip3 installed*/
 	  $ pip install djangorestframework 
 	  $ pip install channels
	  $ cd crysis
	  $ python manage.py runserver
	```
    - enter [http://127.0.0.1:8000/cms/api-root](http://127.0.0.1:8000/cms/api-root) in your browser 

- Run online
	- Access through [HRER(closed)](sublimeapp.site:8000/cms/api-root) 

## API Reference
##### Users

> Symbol | Type | Owner | Token | isAthenticated
> -|-|-|-|-
> <center>:octocat: | SuperUser | CMS administrators | <center>Yes | <center>Yes
> <center>:cop: | User | Call center operaters | <center>Yes | <center>Yes
> <center>:family: | AnonymousUser | Public | <center>No | <center>No

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
> -|-|-|-
> Incident | <center>Yes | <center>Yes | <center>Yes
> Crisis | <center>Yes | <center>Yes | <center>Yes
> Weather | <center>No | <center>No | <center>No

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


