# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-29 05:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allergy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('allergic_to', models.CharField(max_length=100)),
                ('reaction_observed', models.CharField(choices=[('rash', 'Rash'), ('angioedema', 'Angioedema'), ('anaphylaxis', 'Anaphylaxis')], default='Rash', max_length=100)),
                ('patient_detail', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Patient')),
            ],
        ),
    ]