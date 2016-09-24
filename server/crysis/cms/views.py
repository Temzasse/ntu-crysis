from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Incident, Crisis, ResponseUnit, PokemonDB, Pokemon, Trainer
from .serializers import IncidentSerializer, CrisisSerializer, ResponseUnitSerializer, PokemonSerializer, \
    PokemonDBSerializer, TrainerSerializer, UserSerializer
from rest_framework import mixins, generics
from django.contrib.auth.models import User
from rest_framework import permissions
from .permission import IsOwnerOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'user': reverse('cms:user_list', request=request, format=format),
        'incident': reverse('cms:incident_list', request=request, format=format),
        'crisis': reverse('cms:crisis_list', request=request, format=format),
        'responseunit': reverse('cms:responseunit_list', request=request, format=format),
        'pokemon': reverse('cms:pokemon_list', request=request, format=format),
        'pokemondb': reverse('cms:pokemondb_list', request=request, format=format),
        'trainer': reverse('cms:trainer_list', request=request, format=format),

    })

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class IncidentList(generics.ListCreateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class IncidentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class CrisisList(generics.ListCreateAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer


class CrisisDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer


class ResponseUnitList(generics.ListCreateAPIView):
    queryset = ResponseUnit.objects.all()
    serializer_class = ResponseUnitSerializer


class ResponseUnitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResponseUnit.objects.all()
    serializer_class = ResponseUnitSerializer


class PokemonDBList(generics.ListCreateAPIView):
    queryset = PokemonDB.objects.all()
    serializer_class = PokemonDBSerializer


class PokemonDBDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PokemonDB.objects.all()
    serializer_class = PokemonDBSerializer


class PokemonList(generics.ListCreateAPIView):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


class PokemonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


class TrainerList(generics.ListCreateAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer


class TrainerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer

