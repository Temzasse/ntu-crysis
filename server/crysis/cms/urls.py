from django.conf.urls import url
from . import views

app_name = 'cms'
urlpatterns = [
    url(r'^incident/$', views.incident_list),
    url(r'^incident/(?P<pk>[0-9]+)/$', views.incident_detail),

    url(r'^crisis/$', views.crisis_list),
    url(r'^crisis/(?P<pk>[0-9]+)/$', views.crisis_detail),

    url(r'^responseunit/$', views.responseunit_list),
    url(r'^responseunit/(?P<pk>[0-9]+)/$', views.responseunit_detail),

    url(r'^pokemon/$', views.pokemon_list),
    url(r'^pokemon/(?P<pk>[0-9]+)/$', views.pokemon_detail),

    url(r'^pokemondb/$', views.pokemonDB_list),
    url(r'^pokemondb/(?P<pk>[0-9]+)/$', views.pokemonDB_detail),

    url(r'^trainer/$', views.trainer_list),
    url(r'^trainer/(?P<pk>[0-9]+)/$', views.trainer_detail),
]