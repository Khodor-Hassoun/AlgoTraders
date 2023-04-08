from django.http.response import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed
from django.db import IntegrityError
from movie.models import Actor, Genre, Movie
from movie.models import Series


def GetActors(request):
    requestType = request.method
    if requestType == "GET":
        data = list(Actor.objects.all().values("id", "name"))
        return JsonResponse(data, safe=False)
    return HttpResponseNotAllowed("Only GET requests are allowed for this endpoint!")


def Genres(request):
    requestType = request.method
    # Fetch all genres
    if requestType == "GET":
        data = list(Genre.objects.all().values("id", "name"))
        return JsonResponse(data, safe=False)
    # Create a new genre
    elif requestType == "POST":
        newGenreName = request.POST.get("genre_name", None)
        if newGenreName:
            Genre.objects.create(name=newGenreName)
            return HttpResponse("New genre created!")
        else:
            return HttpResponseBadRequest("Genre creation failed.")
    return HttpResponseNotAllowed("Only GET/POST requests are allowed for this endpoint!")


def GetMovieNames(request):
    requestType = request.method
    if requestType == "GET":
        data = list(set((Movie.objects.all().values_list("name", flat=True))))
        return JsonResponse(data, safe=False)
    return HttpResponseNotAllowed("Only GET requests are allowed for this endpoint!")


def CreateSeries(request):
    if request.method == "POST":
        name = request.POST["name"]
        startDate = request.POST.get("series_startDate", None)
        numOfEpisodes = request.POST.get("series_numOfEpisodes", None)
        genreID = int(request.POST.get("series_genre", None))
        try:
            Series.objects.create(
                name=name, startDate=startDate, numOfEpisodes=numOfEpisodes, genre_id=genreID)
            return HttpResponse("New series creation successful!")
        except IntegrityError:
            return HttpResponseBadRequest("Duplicate series not allowed.")
    return HttpResponseNotAllowed("Only POST requests are allowed for this endpoint!")


def GetSeries(request):
    if request.method == "GET":
        return JsonResponse(data=list(Series.objects.all().values()), safe=False)
    return HttpResponseNotAllowed("Only GET requests are allowed for this endpoint!")


######################

# FUNCTION TO RUN DELETE #
def DeleteSeries(request):
    if request.method == "POST":
        id = request.POST.get("id", None)
        try:
            series = Series.objects.get(pk=id)
            series.deleted = True
            series.save()
            return HttpResponse("Deleted")
        except IntegrityError:
            return HttpResponseBadRequest("Deletion Failed.")
    return HttpResponseNotAllowed("Only DELETE requests are allowed for this endpoint!")
