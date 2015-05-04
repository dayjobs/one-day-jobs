# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_job_location_coords'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='day',
        ),
        migrations.AddField(
            model_name='job',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2015, 5, 4, 14, 48, 18, 555499, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
