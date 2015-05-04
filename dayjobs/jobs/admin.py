from django.contrib import admin
from .models import (Job, )


class JobAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'location', 'hours', 'salary', 'date',
                    'job_url',)
admin.site.register(Job, JobAdmin)
