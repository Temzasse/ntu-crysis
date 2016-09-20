# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-19 16:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0004_auto_20160919_1622'),
    ]

    operations = [
        migrations.AddField(
            model_name='crisis',
            name='trainer',
            field=models.ManyToManyField(blank=True, to='cms.Trainer'),
        ),
        migrations.AlterField(
            model_name='crisis',
            name='responseUnit',
            field=models.ManyToManyField(blank=True, to='cms.ResponseUnit'),
        ),
    ]
