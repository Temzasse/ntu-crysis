from django.contrib import admin
from .models import Incident, Crisis, ResponseUnit, Trainer, PokemonDB, Pokemon, Shelter, Weather


class IncidentAdmin(admin.ModelAdmin):
    list_display = ('title', 'area')

class CrisisAdmin(admin.ModelAdmin):
    list_display = ('title', 'area')

class ResponseUnitAdmin(admin.ModelAdmin):
    list_display = ('name','area')
    fieldsets =[
    (None, {'fields': ['name']}),
    ('Contact information', {'fields': ['phone'], 'classes': ['collapse']}),
    ]


class ResponseUnitInline(admin.TabularInline):
    model = ResponseUnit
    extra = 3

admin.site.register(Incident)
admin.site.register(Crisis)
admin.site.register(ResponseUnit)
admin.site.register(Trainer)
admin.site.register(PokemonDB)
admin.site.register(Pokemon)
admin.site.register(Shelter)
admin.site.register(Weather)