# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-29 05:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Complaints',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100)),
                ('remarks', models.TextField(blank=True, max_length=500, null=True, verbose_name='Detail about the problem')),
            ],
        ),
        migrations.CreateModel(
            name='Disease',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('symptoms', models.ManyToManyField(blank=True, to='complaints.Complaints')),
            ],
        ),
    ]