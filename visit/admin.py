# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from visit.models import Visit, VisitContainer

# Register your models here.


admin.site.register(Visit)
admin.site.register(VisitContainer)