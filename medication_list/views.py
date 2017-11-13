# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
import traceback
import sys
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http.response import Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse
import json

from .models import MedicationForm, MedicationList, MedicationSearchForm
from core.search import get_query, normalize_query, get_query_for_nterms, strip_stopwords
from django.views.decorators.csrf import csrf_protect

# Create your views here.

@login_required
def index(request):
    form = MedicationSearchForm()
    return render(request, "medication_list/index.html", {"form": form})

@login_required
def get_medicine(request):
    '''
    For ajax search of `medication` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['medicine'])
        obj_list = MedicationList.objects.filter(entry_query).order_by('medicine')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['id'] = obj.medication_id
        data['medicine'] = obj.medicine
        data['type'] = obj.type
        data['dosage'] = obj.dosage
        data['frequency'] = obj.frequency
        data['duration'] = obj.duration or ""
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def get_medicine_type(request):
    '''
    For ajax search of `type` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['type'])
        obj_list = MedicationList.objects.filter(entry_query).order_by('type')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['value'] = obj.type
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def get_medicine_frequency(request):
    '''
    For ajax search of `frequency` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['frequency'])
        obj_list = MedicationList.objects.filter(entry_query).order_by('frequency')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['value'] = obj.frequency
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def get_medicine_dosage(request):
    '''
    For ajax search of `frequency` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['dosage'])
        obj_list = MedicationList.objects.filter(entry_query).order_by('dosage')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['value'] = obj.dosage
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")




@csrf_protect
@login_required
def add_medicine(request):
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            
            medicine_name = recv_data.get('medicine_name', None)
            if medicine_name is  None:
                data = {}
                data['ret'] = 'False'
                data['result'] = 'Failure: Invalid parameters in POST'
                r = json.dumps(data)
                return HttpResponse(r, content_type="application/json")
            
            medicine = MedicationList.objects.filter(medicine=medicine_name)
            if len(medicine) > 0:
                data = {}
                data['ret'] = 'False'
                data['result'] = 'Failure: Already exist'
                r = json.dumps(data)
                return HttpResponse(r, content_type="application/json")
            
            medicine = MedicationList()
            medicine.medicine = recv_data.get('medicine_name', None)
            medicine.dosage = recv_data.get('dosage', None)
            medicine.frequency = recv_data.get('frequency', None)
            medicine.duration = recv_data.get('duration', None)
            medicine.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['id'] = medicine.medication_id
            data['medicine'] = medicine.medicine
            data['dosage'] = medicine.dosage
            data['frequency'] = medicine.frequency
            data['duration'] = medicine.duration
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404
    
def get_medicine_detail(request, pk):
    Medication = get_object_or_404(MedicationList, pk=pk)
    return render(request, "core/get_medication_detail.html", {"obj": Medication})
    
    