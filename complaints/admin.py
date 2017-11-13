# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from complaints.models import Complaints, Disease
# Register your models here.

admin.site.register(Complaints)
admin.site.register(Disease)

