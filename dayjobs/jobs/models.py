from datetime import datetime, timedelta

from uuslug import uuslug

from django.db import models
from django.contrib.auth.models import User


class TodayJobsManager(models.Manager):

    def get_queryset(self):
        today = datetime.now().date()
        tomorrow = today + timedelta(1)
        return super(TodayJobsManager, self).get_queryset().filter(created_at__range=[today, tomorrow])


class Job(models.Model):
    author = models.ForeignKey(User)

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=140)
    location = models.TextField(null=True, blank=True)
    location_coords = models.TextField(null=True, blank=True)
    hours = models.FloatField (default=0)
    salary = models.FloatField (default=0)
    date = models.DateTimeField()
    slug = models.SlugField()
    slots_count = models.IntegerField(default=0, blank=True)
    slots_left = models.IntegerField(default=0, blank=True)
    job_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    today_objects = TodayJobsManager()

    def __unicode__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.name, instance=self)
        self.job_url = '/jobs/' + self.slug
        super(Job, self).save(*args, **kwargs)
