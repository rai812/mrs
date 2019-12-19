# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.db import models
from django import forms


from core.models import Patient
from complaints.models import Disease

# Create your models here.


class MedicalHistory(models.Model):
    medicine_id = models.AutoField(primary_key=True)
    disease = models.ForeignKey(Disease,null=True,blank=True, on_delete=models.PROTECT)
    status = models.TextField("Status",
                              max_length=500,
                              null=True,
                              blank=True
                              )
    date_of_diagnosis = models.DateField(auto_now_add=False,
                                         null=True,
                                         blank=True
                                         )
    active = models.BooleanField("Active?",default=None)
    infectious_disease = models.BooleanField(default=None)
    allergic_disease = models.BooleanField(default = None)
    patient_detail = models.ForeignKey(Patient,on_delete=models.PROTECT)
    

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.patient_detail.patient_id, filename)


class MedicalFiles(models.Model):
    medical_files_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to=user_directory_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    patient_detail = models.ForeignKey(Patient,on_delete=models.PROTECT)

    def __str__(self):
        return self.description

    def filename(self):
        return os.path.basename(self.document.name)


class DocumentForm(forms.ModelForm):
    document = forms.FileField(required=False)

    class Meta:
        model = MedicalFiles
        fields = ('description', 'document', 'patient_detail', )


class MedicalHistoryForm(forms.ModelForm):
    disease = forms.CharField(max_length=100, required = False)
    disease_id = forms.IntegerField(required = False)
    date_of_diagnosis = forms.DateField(required = False)

    class Meta:
        model = MedicalHistory
        fields = ('status', 'date_of_diagnosis', 'active', 'infectious_disease', 'allergic_disease', )