from django.contrib import admin
from .models import Incident, Crisis, ResponseUnit, Trainer, PokemonDB, Pokemon


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

# class QuestionAdmin(admin.ModelAdmin):
#     list_display = ('question_text', 'pub_date', 'was_published_recently')
#     list_filter = ['pub_date']
#     search_fields =['question_text']
#     fieldsets = [
#     (None, {'fields': ['question_text']}),
#     ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
#     ]
#     inlines = [ChoiceInline]

# admin.site.register(Question, QuestionAdmin)
admin.site.register(Incident)
admin.site.register(Crisis)
admin.site.register(ResponseUnit)
admin.site.register(Trainer)
admin.site.register(PokemonDB)
admin.site.register(Pokemon)
#admin.site.register(Choice)