from rest_framework import serializers
from .models import Incident, Crisis, ResponseUnit, Pokemon, PokemonDB, Trainer, Shelter, Weather
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    # incidents = serializers.PrimaryKeyRelatedField(many=True, queryset=Incident.objects.all())

    class Meta:
        model = User
        field = ('id', 'username')


# TODO: figure out why this does not work...
# class LoginSerializer(serializers.ModelSerializer):
#     # incidents = serializers.PrimaryKeyRelatedField(many=True, queryset=Incident.objects.all())
#
#     class Meta:
#         model = User
#         field = ('username', 'password')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=100, required=True)


class IncidentSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Incident
        fields = (
            'id', "title", 'description', 'comment', 'type', 'area', 'level', 'created_by', 'updated_by', 'witness',
            'longitude', 'latitude')


class CrisisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crisis
        fields = ('id', 'title', 'description', 'comment', 'area', 'level', 'created_by', 'updated_by', 'incident',
                  'responseUnit', 'trainer', 'longitude', 'latitude')


class ResponseUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseUnit
        fields = ('id', 'name', 'description', 'area', 'phone', 'email', 'longitude', 'latitude')


class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ('id', 'sex', 'pokemon_type', 'owner')


class PokemonDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonDB
        fields = ('id', 'name', 'name_cn', 'type, ability')


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = ('id', 'name', 'sex', 'type', 'dob', 'nationality')


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = ('id', 'name', 'capacity', 'area', 'status', 'longitude', 'latitude')


class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('id', 'temperature', 'temperature_low', 'temperature_hi', 'weather', 'psi')
