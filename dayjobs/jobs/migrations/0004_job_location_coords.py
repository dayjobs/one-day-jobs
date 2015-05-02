# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_job_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='location_coords',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
