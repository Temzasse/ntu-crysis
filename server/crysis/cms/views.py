from .models import Incident, Crisis, ResponseUnit, PokemonDB, Pokemon, Trainer, Shelter  # noqa
from .serializers import IncidentSerializer, CrisisSerializer, ResponseUnitSerializer, PokemonSerializer, \
    PokemonDBSerializer, TrainerSerializer, UserSerializer, ShelterSerializer, LoginSerializer  # noqa
from rest_framework import generics
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication, BasicAuthentication  # noqa
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated  # noqa
from rest_framework.views import APIView
from django.http import HttpResponse
from django.template import loader
from cms.email.email import send_mailv4_to_responseunit

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'user': reverse('cms:user_list', request=request, format=format),
        'incident': reverse('cms:incident_list', request=request, format=format),  # noqa
        'crisis': reverse('cms:crisis_list', request=request, format=format),
        'responseunit': reverse('cms:responseunit_list', request=request, format=format),  # noqa
        'pokemon': reverse('cms:pokemon_list', request=request, format=format),
        'pokemondb': reverse('cms:pokemondb_list', request=request, format=format),  # noqa
        'shelter': reverse('cms:shelter_list', request=request, format=format),
    })


class Auth(APIView):
    authentication_classes = (TokenAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),
            'auth': str(request.auth)
        }
        return Response(content)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CurrentUser(APIView):
    """
    Get current user from request (based on Authorization token).
    => Used to do re-login eg. after page reload.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        currentUser = request.user
        groups = currentUser.groups.all().values('name')

        if currentUser and groups:
            group_names = [v for v in groups.values()]
            return Response(
                {
                    'username': currentUser.username,
                    'groups': group_names
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {'error': 'Could not get current user'},
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )

            if user:
                groups = user.groups.all().values('name')
                group_names = [v for v in groups.values()]
                token, created = Token.objects.get_or_create(user=user)
                return Response(
                    {
                        'token': token.key,
                        'username': user.username,
                        'groups': group_names
                    },
                    status=status.HTTP_200_OK
                )
            return Response(
                {'error': 'LOGIN_INVALID_CREDENTIALS'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class IncidentList(generics.ListCreateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    permission_classes = (IsAuthenticatedOrReadOnly,)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class IncidentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    permission_classes = (IsAuthenticatedOrReadOnly,)


class HandleIncident(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        incident = Incident.objects.get(pk=pk)

        # First try to attach RU with same area and type
        RUsByAreaAndType = ResponseUnit.objects.filter(area=incident.area, speciality=incident.type)  # noqa

        if RUsByAreaAndType:
            incident.handle_by = RUsByAreaAndType[0]
            incident.save()
            try:
                send_mailv4_to_responseunit(incident, incident.handle_by.email)
            except Exception as e:
                print(e)
                print("response unit email not sending")
            serializer = IncidentSerializer(incident)
            return Response(serializer.data)

        # Then by only type
        RUsByType = ResponseUnit.objects.filter(speciality=incident.type)  # noqa

        if RUsByType:
            incident.handle_by = RUsByType[0]
            incident.save()
            try:
                send_mailv4_to_responseunit(incident, incident.handle_by.email)
            except Exception as e:
                print(e)
                print("response unit email not sending")
            serializer = IncidentSerializer(incident)
            return Response(serializer.data)

        return Response(
            {'error': 'could not attach response unit'},
            status=status.HTTP_400_BAD_REQUEST
        )


class CrisisList(generics.ListCreateAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer


class CrisisDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer


class CurrentCrisis(APIView):
    """
    Get the current crisis (inactive or active).
    If crisis does not exist, create new current crisis.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        currentCrisis, created = Crisis.objects.get_or_create(
            status='ACT',
            defaults={
                'title': 'crisis',
                'description': 'automatically created crisis'
            },
        )
        serializer = CrisisSerializer(currentCrisis)
        return Response(serializer.data)


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


class ShelterList(generics.ListAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


def report(request):
    incident_list = Incident.objects.all()
    context = {
        'incident_list': incident_list,
    }
    template = loader.get_template()
    return HttpResponse(template.render(context, request))
