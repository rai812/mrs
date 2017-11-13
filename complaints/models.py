# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Complaints(models.Model):
    
    complain_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100)
    remarks = models.TextField("Detail about the problem",
                              max_length=500,
                              null=True,
                              blank=True
                              )
    def __unicode__(self):
        return "%s" % (self.description)
    
    
class Disease(models.Model):
    disease_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    symptoms = models.ManyToManyField(Complaints, blank=True)
