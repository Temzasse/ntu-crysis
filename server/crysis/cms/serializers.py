from rest_framework import serializers
from .models import Incident, Crisis, ResponseUnit, Pokemon, PokemonDB, Trainer
from .consumers import ws_send_notification

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ('id', "title", 'description', 'comment', 'type', 'area', 'level', 'created_by','updated_by', 'witness', 'longitude', 'latitude')

class CrisisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crisis
        fields = ('id', 'title', 'description', 'comment', 'area', 'level', 'created_by', 'updated_by', 'incident', 'responseUnit', 'trainer', 'longitude', 'latitude')

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

