## Crysis CMS Backend

This is the backend code for Crysis CMS. RESTful API for data access and WebSocket for live update are implemented in Python.


## Motivation

The system is to help people in Singapore to handle incidents and crises caused by Pokemons. 

## Installation

- Run at locol host:
```commandline
 $ pip3 install djangorestframework 
 $ pip3 install channels
 $ cd Crysis
 $ python3 manage.py runserver
```
- Run online:
access sublimeapp.site:8000/admin

## API Reference


##### RESTful API:

- 'GET' and 'POST'
  - ~/cms/incident
  - ~/cms/crisis
  - ~/cms/responseunit
  - ~/cms/pokemondb
  - ~/cms/pokemon
  - ~/cms/trainer

- 'GET', 'POST', 'PUT' and 'DELETE'
  - host/cms/incident/i
  - host/cms/crisis/i
  - host/cms/responseunit/i
  - host/cms/pokemondb/i
  - host/cms/pokemon/i
  - host/cms/trainer/i

- Look at /crysis/cms/models.py for 'POST' and 'PUT' details

##### WebSocket:
- Connect
```javascript
//Javascript
socket = new WebSocket("ws://" + window.location.host + "/User/");
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
