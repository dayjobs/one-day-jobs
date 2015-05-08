# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0005_auto_20150504_1448'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobMatch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.TextField(default=b'W', choices=[(b'A', b'Accepted'), (b'D', b'Denied'), (b'W', b'Waiting')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('job', models.ForeignKey(to='jobs.Job')),
                ('worker', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
