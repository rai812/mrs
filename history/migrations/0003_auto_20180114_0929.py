# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-14 03:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('history', '0002_auto_20171031_2114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalhistory',
            name='disease',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='complaints.Disease'),
        ),
    ]
