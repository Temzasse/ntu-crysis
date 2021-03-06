# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-18 10:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0007_auto_20161018_1024'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crisis',
            name='area',
        ),
        migrations.RemoveField(
            model_name='crisis',
            name='responseUnits',
        ),
        migrations.RemoveField(
            model_name='responseunit',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='responseunit',
            name='longitude',
        ),
        migrations.AddField(
            model_name='incident',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
