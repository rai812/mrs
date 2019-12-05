# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from core.models import Patient, Vitals, VitalCNS

# Register your models here.
admin.site.register(Patient)
admin.site.register(Vitals)
admin.site.register(VitalCNS)