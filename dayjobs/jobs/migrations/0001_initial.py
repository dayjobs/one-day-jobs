# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=140)),
                ('hours', models.DecimalField(default=0, max_digits=2, decimal_places=2)),
                ('salary', models.DecimalField(default=0, max_digits=6, decimal_places=2)),
                ('day', models.CharField(max_length=10, blank=True)),
                ('slug', models.SlugField()),
                ('slots_count', models.IntegerField(default=0, blank=True)),
                ('slots_left', models.IntegerField(default=0, blank=True)),
                ('job_url', models.URLField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
