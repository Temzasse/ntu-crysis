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