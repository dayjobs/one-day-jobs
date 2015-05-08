from django.contrib import admin
from .models import (Job, JobMatch)


class JobAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'location', 'hours', 'salary', 'date',
                    'job_url',)
admin.site.register(Job, JobAdmin)


class JobMatchAdmin(admin.ModelAdmin):
    list_display = ('worker', 'job', 'status')
admin.site.register(JobMatch, JobMatchAdmin)
