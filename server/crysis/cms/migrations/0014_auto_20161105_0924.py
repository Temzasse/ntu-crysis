# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-11-05 09:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0013_auto_20161026_0520'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crisis',
            name='level',
        ),
        migrations.AddField(
            model_name='crisis',
            name='ongoing',
            field=models.BooleanField(default=False),
        ),
    ]
