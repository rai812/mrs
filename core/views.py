# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404, redirect
import traceback
import sys
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http.response import Http404, HttpResponseRedirect
from django.urls import reverse
import json

from django.views.decorators.csrf import csrf_protect

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from core.models import PatientForm, Patient, PatientSearchForm, Vitals
from core.search import get_query, normalize_query, get_query_for_nterms, strip_stopwords
from _csv import field_size_limit

# Create your views here.

@login_required
def index(request):
    patient_list = Patient.objects.all()
    paginator = Paginator(patient_list, 10)
    page = request.GET.get('page', 1)
    ## TODO check the criteriea and change the patient_list
    try:
        patients = paginator.page(page)
    except PageNotAnInteger:
        patients = paginator.page(1)
    except EmptyPage:
        patients = paginator.page(paginator.num_pages)

    return render(request, "core/index.html", {'patients': patients})

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
        
        
        data['mobile'] = obj.mobile_number or ""
        data['age'] = obj.get_age()
        data['url'] = obj.get_absolute_url()
        result.append(data)
        
    r = json.dumps({"results": result})
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def add_patient(request):

    user = request.user
    print("Received a request to add a New Patient....")

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
            print("Error in %s on line %d" % (fname, lineno))
        raise Http404('Bad Request:: Some Error in server.')
    
def get_patient_detail(request, pk):
    patient = get_object_or_404(Patient, pk=pk)
    return render(request, "core/get_patient_detail.html", {"obj": patient})

@login_required
def get_patient_list(request):
    
    field = request.GET.get('field', "")
    query = request.GET.get('q', "")
    
    if len(field) == 0 or len(query) == 0:
        patient_list = Patient.objects.all()
    elif field == "name":
        entry_query = get_query(query, ['first_name', 'middle_name','last_name'])
        patient_list = Patient.objects.filter(entry_query).order_by('first_name')[:10]
    elif field == "mobile_number":
        entry_query = get_query(query, ['mobile_number'])
        patient_list = Patient.objects.filter(entry_query).order_by('first_name')[:10]    
    else:
        patient_list = Patient.objects.all()[:10]
        
    paginator = Paginator(patient_list, 10)
    page = request.GET.get('page', 1)
    ## TODO check the criteriea and change the patient_list
    try:
        patients = paginator.page(page)
    except PageNotAnInteger:
        patients = paginator.page(1)
    except EmptyPage:
        patients = paginator.page(paginator.num_pages)

    return render(request, 'core/patient_list.html', { 'patients': patients})

@csrf_protect
@login_required
def add_vitals(request):
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            
            print("Printing weight ", recv_data.get('weight', None))
            vitals = Vitals()
            vitals.weight = recv_data.get('weight', None)
            vitals.height = recv_data.get('height', None)
            vitals.p_ce_cn_iol = recv_data.get('pce', None)
            vitals.oe = recv_data.get('oe', None)
            vitals.temp = recv_data.get('temp', None)
            vitals.pulse = recv_data.get('pulse', None)
            vitals.bp = recv_data.get('bp', None)
            vitals.rr = recv_data.get('rr', None)
            vitals.cns = recv_data.get('cns', None)
            vitals.chest = recv_data.get('chest', None)
            vitals.cvs = recv_data.get('cvs', None)
            vitals.pa = recv_data.get('pa', None)
            vitals.tests = recv_data.get('tests', None)
            vitals.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['id'] = vitals.vital_id
            data['weight'] = vitals.weight
            data['height'] = vitals.height
            data['pce'] = vitals.p_ce_cn_iol
            data['oe'] = vitals.oe
            data['temp'] = vitals.temp
            data['pulse'] = vitals.pulse
            data['bp'] = vitals.bp
            data['rr'] = vitals.rr
            data['cns'] = vitals.cns
            data['chest'] = vitals.chest
            data['cvs'] = vitals.cvs
            data['pa'] = vitals.pa
            data['tests'] = vitals.tests
            print(data)
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404

@csrf_protect
@login_required
def add_patient_api(request):
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            
            patient = Patient()
            full_name = recv_data.get('full_name', None)
            splitting = full_name.split()
            
            first_name = splitting[0]
            last_name = splitting[-1]
            
            if(first_name == last_name):
                patient.first_name = first_name
            elif len(splitting) > 2:
                ## there exist the middle name
                patient.first_name = first_name
                patient.middle_name = " ".join(splitting[1:-2])
                patient.last_name = last_name
            else:
                patient.first_name = first_name
                patient.last_name = last_name
                
                
            patient.sex = recv_data.get('sex', None)
            patient.age = recv_data.get('age', None)
            patient.mobile_number = recv_data.get('mobile', None)
            patient.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data["id"] =  patient.patient_id,
            data["full_name"] =  patient.full_name,
            data["age"] =  patient.age,
            data["sex"] =  patient.sex
            data["mobile"] =  patient.mobile_number
            data['history'] = "False"
            data['files'] = "False"
            print(data)
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404


    