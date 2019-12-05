# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

from django import forms

from history.models import MedicalHistory,MedicalFiles, MedicalHistoryForm, DocumentForm

from core.models import Patient

from complaints.models import Disease 
from django.http import HttpResponse, Http404

from django.urls import reverse
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_protect
import json
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
            except forms.ValidatioidnError:
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
    
@csrf_protect
@login_required        
def add_history_api(request):
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            print("Printing request body ", recv_data)
            
            patient_id = recv_data.get("patient_id",None)
            status =  recv_data.get("status",None)
            patient_detail = Patient.objects.get(patient_id = patient_id)
            medical_history = MedicalHistory()
            medical_history.status = status
            medical_history.patient_detail = patient_detail
            medical_history.active = False
            medical_history.infectious_disease = False
            medical_history.allergic_disease = False
            medical_history.save() 
            r = json.dumps({"ret":True,"id":medical_history.medicine_id,"status":medical_history.status})
            return HttpResponse(r, content_type="application/json")
    raise Http404

@csrf_protect
@login_required        
def get_history_api(request):
    if request.is_ajax():
        if request.method == 'GET':
            id = request.GET.get("patient_id",None)
            patient_detail = Patient.objects.get(patient_id = id)
    
            patient_medical_history = MedicalHistory.objects.all().filter(patient_detail = patient_detail)

            result = []
            for obj in patient_medical_history:
                data = {}
                data["id"] = obj.medicine_id
                data["status"] = obj.status
                result.append(data)

            r = json.dumps(result)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
            
    raise Http404


@login_required
def get_medical_files(request):
    if request.is_ajax():
        if request.method == 'GET':
            id = request.GET.get("patient_id", None)
            patient_detail = Patient.objects.get(patient_id=id)
            medical_files = MedicalFiles.objects.all().filter(patient_detail = patient_detail)
            result = []
            for obj in medical_files:
                data = {"name": obj.description, "url": obj.document.url}
                result.append(data)

            r = json.dumps(result)
            return HttpResponse(r, content_type="application/json")

        if request.method == 'POST':
            data = {'ret': 'False', 'result': 'Failure: Invalid request method!!!'}
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")

    raise Http404


@csrf_protect
@login_required
def history_doc_upload_api(request):
    if request.is_ajax():
        if request.method == 'POST':
            form = DocumentForm(request.POST, request.FILES)
            if form.is_valid():
                obj = form.save()
                r = json.dumps({"ret": True, 'name': obj.description, 'url': obj.document.url, })
                return HttpResponse(r, content_type="application/json")
            else:
                print("Form is not valid")
                print(form.errors)
                r = json.dumps({"ret": False, })
                return HttpResponse(r, content_type="application/json")
        else:
            raise Http404

    raise Http404