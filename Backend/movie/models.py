from django.db import models


class Movie(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    rating = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    votes = models.IntegerField(blank=True, null=True)
    revenue = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    metascore = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        ordering = ("-created",)

    def __str__(self) -> str:
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        ordering = ("-created",)

    def __str__(self) -> str:
        return self.name


class Actor(models.Model):
    name = models.CharField(max_length=100, blank=False,
                            null=False, unique=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        ordering = ("-created",)

    def __str__(self) -> str:
        return self.name


class Series(models.Model):
    name = models.CharField(max_length=50, unique=True)
    startDate = models.DateField()
    numOfEpisodes = models.IntegerField()
    genre = models.ForeignKey(to=Genre, on_delete=models.SET_NULL, null=True)

    deleted = models.BooleanField(default=False)
