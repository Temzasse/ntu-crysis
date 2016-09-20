from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Incident, Crisis, ResponseUnit, PokemonDB, Pokemon, Trainer
from .serializers import IncidentSerializer, CrisisSerializer, ResponseUnitSerializer, PokemonSerializer, PokemonDBSerializer, TrainerSerializer

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def incident_list(request):
    if request.method == 'GET':
        incident = Incident.objects.all()
        serializer = IncidentSerializer(incident, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = IncidentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def incident_detail(request,pk):
    try:
        incident = Incident.objects.get(pk=pk)
    except Incidnet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = IncidentSerializer(incident)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = IncidentSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = IncidentSerializer(incident, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        incident.delete()
        return HttpResponse(status=204)


@csrf_exempt
def crisis_list(request):
    if request.method == 'GET':
        crisis = Crisis.objects.all()
        serializer = CrisisSerializer(crisis, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CrisisSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def crisis_detail(request,pk):
    try:
        crisis = Crisis.objects.get(pk=pk)
    except Crisis.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CrisisSerializer(crisis)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = CrisisSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = CrisisSerializer(crisis, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        crisis.delete()
        return HttpResponse(status=204)

@csrf_exempt
def responseunit_list(request):
    if request.method == 'GET':
        responceunit = ResponseUnit.objects.all()
        serializer = ResponseUnitSerializer(responceunit, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ResponseUnitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def responseunit_detail(request,pk):
    try:
        responceunit = ResponseUnit.objects.get(pk=pk)
    except ResponseUnit.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ResponseUnitSerializer(responceunit)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = ResponseUnitSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = ResponseUnitSerializer(responceunit, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        responceunit.delete()
        return HttpResponse(status=204)

@csrf_exempt
def pokemon_list(request):
    if request.method == 'GET':
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PokemonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def pokemon_detail(request,pk):
    try:
        pokemon = Pokemon.objects.get(pk=pk)
    except Incidnet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = PokemonSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = PokemonSerializer(pokemon, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        pokemon.delete()
        return HttpResponse(status=204)

@csrf_exempt
def pokemonDB_list(request):
    if request.method == 'GET':
        pokemonDB = PokemonDB.objects.all()
        serializer = PokemonDBSerializer(pokemonDB, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PokemonDBSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def pokemonDB_detail(request,pk):
    try:
        pokemonDB = PokemonDB.objects.get(pk=pk)
    except Incidnet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PokemonDBSerializer(pokemonDB)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = PokemonDBSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = PokemonDBSerializer(pokemonDB, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        pokemonDB.delete()
        return HttpResponse(status=204)

@csrf_exempt
def trainer_list(request):
    if request.method == 'GET':
        trainer = Trainer.objects.all()
        serializer = TrainerSerializer(trainer, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TrainerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def trainer_detail(request,pk):
    try:
        trainer = Trainer.objects.get(pk=pk)
    except Incidnet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TrainerSerializer(trainer)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser.parse(request.data)
        serializer = TrainerSerializer(data=data)
        if serializer.is_valid:
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=404)

    elif request.method == 'PUT':
        data = JSONParser.parse(request.data)
        serializer = TrainerSerializer(trainer, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        trainer.delete()
        return HttpResponse(status=204)
