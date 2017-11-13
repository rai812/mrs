# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404, redirect
import traceback
import sys
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http.response import Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse
import json



from core.models import PatientForm, Patient, PatientSearchForm
from core.search import get_query, normalize_query, get_query_for_nterms, strip_stopwords

# Create your views here.

@login_required
def index(request):
    form = PatientSearchForm()
    return render(request, "core/index.html", {"form": form})

@login_required
def get_patients(request):
    '''
    For ajax search of `patient` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['first_name', 'middle_name','last_name'])
        obj_list = Patient.objects.filter(entry_query).order_by('first_name')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['id'] = obj.patient_id
        data['first_name'] = obj.first_name
        data['middle_name'] = obj.middle_name or ""
        data['last_name'] = obj.last_name or ""
        data['full_name'] = obj.full_name or ""
        data['sex'] = obj.sex
        data['age'] = obj.get_age()
        
        if obj.dob:
            data['dob'] = str(obj.dob)
        else:
            data['dob'] = ""
        
        
        data['mob'] = obj.mobile_number or ""
        data['age'] = obj.get_age()
        data['url'] = obj.get_absolute_url()
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def add_patient(request):

    user = request.user
    print "Received a request to add a New Patient...."

    try:
        patient_instance = Patient()
        if request.method == "GET":
            patient_form = PatientForm(instance = patient_instance)
        elif request.method == "POST":
            if(len(str(request.POST.get('patient_id'))) > 0):
                patient_instance = Patient.objects.get(patient_id= request.POST.get('patient_id'))
            patient_form = PatientForm(request.POST,instance = patient_instance)
            if patient_form.is_valid():
                saved_patient = patient_form.save(commit = False)
                saved_patient.save()
                error_message = "Patient Saved Successfully"
                print("Patient Saved Successfully")
                request.session['patient_id'] =  saved_patient.patient_id
                return redirect(reverse("history:add_history"))
            else:
                print("Patient Saved error")
                print(patient_form.errors)
        else:
            raise Http404('Bad Request:: Unsupported Request Method.')
        
        return render(request, "core/add_patient.html", {'form':patient_form,})

    except:
        traceback.print_exc()
        for frame in traceback.extract_tb(sys.exc_info()[2]):
            fname,lineno,fn,text = frame
            print "Error in %s on line %d" % (fname, lineno)
        raise Http404('Bad Request:: Some Error in server.')
    
def get_patient_detail(request, pk):
    patient = get_object_or_404(Patient, pk=pk)
    return render(request, "core/get_patient_detail.html", {"obj": patient})
    
    