# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

from django import forms

from history.models import MedicalHistory,MedicalFiles, MedicalHistoryForm, DocumentForm

from core.models import Patient

from complaints.models import Disease 
from django.core.urlresolvers import reverse
# Create your views here.

def add_history(request):
    
    if 'patient_id' not in request.session:
        redirect(reverse('add_patient'))
    patient_detail = Patient.objects.get(patient_id = request.session['patient_id'])
    
    patient_medical_history = MedicalHistory.objects.all().filter(patient_detail = patient_detail)
    patient_medical_files = MedicalFiles.objects.all().filter(patient_detail = patient_detail)
    print(patient_medical_files)
    if request.method == 'POST':
        form1 = DocumentForm(request.POST)
        form2 = MedicalHistoryForm(request.POST)
        if form1.is_valid() and form2.is_valid():
            try:
                files = request.FILES.getlist('document')
                for a_file in files:
                    instance = MedicalFiles()
                    # fill other fields
                    instance.description = form1.cleaned_data['description']
                    instance.patient_detail = patient_detail
                    instance.document = a_file
                    instance.save()
                
                # save the individual medical history
                if len(form2.cleaned_data['disease']) > 0:
                    medical_history = form2.save(commit=False)
                    print(form2.cleaned_data)
                    if form2.cleaned_data['disease_id'] is None:
                         disease = Disease()
                         disease.name = form2.cleaned_data['disease']
                         disease.save()
                         medical_history.disease = disease;
                    else:
                        disease = Disease.objects.get(disease_id= form2.cleaned_data['disease_id'])
                        medical_history.disease = disease;
                    medical_history.patient_detail = patient_detail
                    medical_history.save()
            except forms.ValidationError:
                pass

            page_context = {'form1': form1,'form':form2,  'patient': patient_detail, 'medical_history':patient_medical_history,
                            'medical_files':patient_medical_files}
            return render(request,'history/add_history.html', page_context)

#             return redirect()
        else:
            print("form is not valid form1 ", form1.is_valid(), " form 2 ", form2.is_valid())
            page_context = {'form1': form1,'form':form2,  'patient': patient_detail, 'medical_history':patient_medical_history, 'medical_files':patient_medical_files}
            return render(request,'history/add_history.html', page_context)

    else:
        form = DocumentForm(initial = {'patient_id':patient_detail.patient_id})
        formset = MedicalHistoryForm()

        page_context = {'form1': form,'form':formset, 'patient': patient_detail,'medical_history':patient_medical_history, 'medical_files':patient_medical_files}
        return render(request,'history/add_history.html', page_context)
        