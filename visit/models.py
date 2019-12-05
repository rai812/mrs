# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


from django.utils import timezone

from core.models import Patient, Vitals, VitalCNS
from medication_list.models import MedicationList
from complaints.models import Complaints, Disease


# Create your models here.


class Visit(models.Model):
    
    visit_id  = models.AutoField(primary_key=True)

    visit_date = models.DateTimeField(auto_now=True)

    complaints = models.ManyToManyField(Complaints,
                                   blank=True)
    
    diagnose = models.ManyToManyField(Disease, 
                                 blank=True)
    medicines = models.ManyToManyField(MedicationList)

    duration = models.CharField(max_length=100,
                   help_text="Number of day or months", blank=True, null=True
                )
    
    vitals = models.ForeignKey(Vitals, null=True, blank=True,on_delete=models.PROTECT)
    
    remarks = models.TextField(max_length=200,
                               default="NAD",
                               help_text="limit to 200 words"
                               )
    cns = models.ForeignKey(VitalCNS, null=True, blank=True,on_delete=models.PROTECT)

    def __unicode__(self):
        return "%s" % (self.visit_date.strftime('%Y-%m-%d'))
    
    def __str__(self):
        return "%s" % (self.visit_date.strftime('%Y-%m-%d'))
    
    
class VisitContainer(models.Model):
    
    patient_detail = models.ForeignKey(Patient, on_delete=models.PROTECT)

    visit_date = models.DateTimeField(auto_now=True)

    visits = models.ManyToManyField(Visit,
                                   blank=True)
        
 
    def __unicode__(self):
        return "%s - %s" % (self.patient_detail.full_name, self.visit_date.strftime('%Y-%m-%d'))
     
    def __str__(self):
        return "%s - %s" % (self.patient_detail.full_name, self.visit_date.strftime('%Y-%m-%d'))
