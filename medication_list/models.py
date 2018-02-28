# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django import forms
# Create your models here.

MEDICINE_TYPE = (("TAB", "Tablet"),("CAP", "Capsule"), ("SAC", "Sachets"), ('SYR', 'Syrups'), ('INJ', 'Injection'))

class MedicationList(models.Model):
    
    medication_id = models.AutoField(primary_key=True)
    
    type = models.CharField(max_length=100,
                                help_text="Choose from list given..."
                                  )
    medicine = models.CharField(max_length=100,
                                  help_text="Only Generic Names.."
                                  )
    dosage = models.CharField(max_length=100,
                   help_text="100mg or 500mg etc."
                )
    frequency = models.CharField(max_length=100,
                   help_text="Number of times to be taken in 1 day"
                )
    
    duration = models.CharField(max_length=100,
                   help_text="Number of day or months", blank=True, null=True
                )

    remarks = models.TextField(max_length=200,
                               blank=True,null=True,
                               help_text="limit to 200 words"
                               )    



    def __unicode__(self):
        return "%s-%s : %s, %s for %s" % (self.type, self.medicine,self.dosage, self.frequency, self.duration)

    def __str__(self):
        return "%s-%s : %s, %s for %s" % (self.type, self.medicine,self.dosage, self.frequency, self.duration)
    
    def getDisplayValue(self):
      if self.remarks:
        remark = self.remarks.encode('utf-8')
      else:
        remark = ""
      if(len(remark) < 3):
        remark = ""
      return "%s : %s, %s %s for %s days" % ( self.medicine,self.dosage, self.frequency, remark , self.duration)

    def get_absolute_url(self):
        return reverse("get_patient_detail",kwargs={"pk":self.id})


class MedicationForm(forms.ModelForm):
    class Meta:
        model = MedicationList
        fields = ('type','medicine', 'dosage', 'frequency',)

class MedicationSearchForm(forms.Form):
    patient = forms.ModelChoiceField(MedicationList.objects.all())