from django.conf.urls import url
from . import views

app_name = 'cms'
urlpatterns = [
    url(r'^auth/$', views.Auth.as_view()),
    url(r'^$', views.api_root),

    url(r'^incident/$', views.IncidentList.as_view(), name='incident_list'),
    url(r'^incident/(?P<pk>[0-9]+)/$',
        views.IncidentDetail.as_view()),

    url(r'^user/$', views.UserList.as_view(), name='user_list'),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),

    url(r'^crisis/$', views.CrisisList.as_view(), name='crisis_list'),
    url(r'^crisis/(?P<pk>[0-9]+)/$', views.CrisisDetail.as_view()),

    url(r'^responseunit/$', views.ResponseUnitList.as_view(), name='responseunit_list'),
    url(r'^responseunit/(?P<pk>[0-9]+)/$', views.ResponseUnitDetail.as_view()),

    url(r'^pokemon/$', views.PokemonList.as_view(), name='pokemon_list'),
    url(r'^pokemon/(?P<pk>[0-9]+)/$', views.PokemonDetail.as_view()),

    url(r'^pokemondb/$', views.PokemonDBList.as_view(), name='pokemondb_list'),
    url(r'^pokemondb/(?P<pk>[0-9]+)/$', views.PokemonDBDetail.as_view()),

    url(r'^trainer/$', views.TrainerList.as_view(), name='trainer_list'),
    url(r'^trainer/(?P<pk>[0-9]+)/$', views.TrainerDetail.as_view()),

    url(r'^shelter/$', views.ShelterList.as_view(), name='shelter_list'),
    url(r'^shelter/(?P<pk>[0-9]+)/$', views.ShelterDetails.as_view()),

    url(r'^weather/$', views.WeatherDetails.as_view(), name='weather'),
]
