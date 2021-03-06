from datetime import datetime, timedelta

from uuslug import uuslug

from django.db import models
from django.db.models import Q
from django.contrib.auth.models import User


class ListingsManager(models.Manager):

    def get_all_jobs(self):
        return Job.objects.all().order_by('-created_at')

    def get_active_jobs(self):
        today = datetime.now().date()
        return self.get_all_jobs().filter(date__gte=today)

    def get_previous_jobs(self):
        today = datetime.now().date()
        return self.get_all_jobs().filter(date__lte=today)


class MatchesManager(models.Manager):

    def get_all_matches(self):
        return JobMatch.objects.all().order_by('-created_at')

    def get_active_matches(self):
        today = datetime.now().date()
        return self.get_all_matches().filter(job__date__lte=today)

    def get_previous_matches(self):
        today = datetime.now().date()
        return self.get_all_matches().filter(job__date__gte=today)


class Job(models.Model):
    author = models.ForeignKey(User)

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=140)
    location = models.TextField(null=True, blank=True)
    location_coords = models.TextField(null=True, blank=True)
    hours = models.FloatField (default=0)
    salary = models.FloatField (default=0)
    date = models.DateTimeField()
    slug = models.SlugField(default=0, blank=True)
    slots_count = models.IntegerField(default=0, blank=True)
    slots_left = models.IntegerField(default=0, blank=True)
    job_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    listings = ListingsManager()

    def __unicode__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        self.slug = uuslug(self.name, instance=self)
        self.job_url = '/jobs/' + self.slug
        super(Job, self).save(*args, **kwargs)


class JobMatch(models.Model):
    worker = models.ForeignKey(User)
    job = models.ForeignKey(Job)

    status = models.TextField(choices=(('A', 'Accepted'), ('D', 'Denied'),
                              ('W', 'Waiting')), default='W')

    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    matches = MatchesManager()

    def __unicode__(self):
        return '{0}'.format(self.worker.username)
