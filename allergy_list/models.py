# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django import forms

from core.models import Patient
# Create your models here.


REACTION_OBSERVED = (("rash", 'Rash'),('angioedema', 'Angioedema'),("anaphylaxis", "Anaphylaxis"))


class Allergy(models.Model):

    """
      This defines the Allergies that the patient has
    """
  
    def __init__(self, *args, **kwargs):
      super(Allergy,self).__init__(*args, **kwargs)

    allergy_id = models.AutoField(primary_key=True)
    allergic_to = models.CharField(max_length=100)
    reaction_observed = models.CharField(max_length=100,
                                         choices= REACTION_OBSERVED,
                                         default = "Rash"
                                         )
    patient_detail = models.ForeignKey(Patient, on_delete=models.PROTECT)
    
    def __unicode__(self):
        return "%s" % (self.allergic_to)

