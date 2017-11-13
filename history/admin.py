# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from history.models import MedicalHistory, MedicalFiles

# Register your models here.

admin.site.register(MedicalHistory)
admin.site.register(MedicalFiles)

