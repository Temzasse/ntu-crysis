from django.db import models
from .choice import (
    AREA_CHOICE,
    NATIONALITY_CHOICE,
    POKEMON_TYPE_CHOICE,
    R_UNIT_TYPE_CHOICE,
    SEX_CHOICE,
    STATUS_CHOICE,
    TRAINER_TYPE_CHOICE,
    TYPE_CHOICE,
    )


class Incident(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    type = models.CharField(choices=TYPE_CHOICE, default='LAN', max_length=5)  # noqa
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)  # noqa
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # NOTE: Is this data necessary?
    # Can be expressed in comment or maybe even left out entirely.
    # witness = models.CharField(max_length=20, default='Public', blank=True)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)
    handle_by = models.ForeignKey('ResponseUnit', on_delete=models.CASCADE, blank=True, null=True)  # noqa
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class ResponseUnit(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    type = models.CharField(choices=R_UNIT_TYPE_CHOICE, default='POL', max_length=10)  # noqa
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)  # noqa
    phone = models.CharField(max_length=10, blank=True)
    email = models.EmailField(max_length=50, blank=True)
    address = models.CharField(max_length=30, blank=True)
    speciality = models.CharField(choices=TYPE_CHOICE, default='LAN', max_length=10)  # noqa

    def __str__(self):
        return self.name


# NOTE: this might be a bit too detailed for us
#       out of the scope of this project
class Trainer(models.Model):
    name = models.CharField(max_length=30)
    sex = models.CharField(choices=SEX_CHOICE, max_length=5)  # noqa
    type = models.CharField(choices=TRAINER_TYPE_CHOICE, max_length=10, blank=True)  # noqa
    dob = models.DateTimeField(null=True, blank=True)
    nationality = models.CharField(choices=NATIONALITY_CHOICE, max_length=5, blank=True)  # noqa

    def __str__(self):
        return self.name


class Shelter(models.Model):
    name = models.CharField(max_length=50)
    capacity = models.IntegerField(blank=True)
    area = models.CharField(choices=AREA_CHOICE, default='UN', max_length=5)  # noqa
    status = models.BooleanField(default=False)
    longitude = models.FloatField(default=103.851959, blank=True)
    latitude = models.FloatField(default=1.290270, blank=True)

    def __str__(self):
        return self.name


class Crisis(models.Model):
    # NOTE: there's really no point of having a title to crisis
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=500, blank=True)
    status = models.CharField(choices=STATUS_CHOICE, default='ACT', max_length=10)  # noqa
    ongoing = models.BooleanField(default=False)
    threshold = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    incidents = models.ManyToManyField(Incident, blank=True)
    # shelters = models.ManyToManyField(Shelter, blank=True)

    def __str__(self):
        return self.title


class PokemonDB(models.Model):
    name = models.CharField(max_length=30)
    name_cn = models.CharField(max_length=30, blank=True)
    type = models.CharField(choices=POKEMON_TYPE_CHOICE, max_length=5, blank=True)  # noqa
    ability = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name


class Pokemon(models.Model):
    sex = models.CharField(choices=SEX_CHOICE, max_length=5)  # noqa
    pokemon_type = models.ForeignKey(PokemonDB, on_delete=models.CASCADE)
    owner = models.ForeignKey(Trainer, on_delete=models.CASCADE)

    def __str__(self):
        return self.pokemon_type.name + ' by ' + self.owner.name
