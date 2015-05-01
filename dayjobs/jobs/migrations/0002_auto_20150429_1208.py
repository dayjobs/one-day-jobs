# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='hours',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='job',
            name='salary',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
    ]
