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

FREQUENCY_LIST = ['Take Once Daily / दिन में एक बार (OD)',
                  'Take Two Times Daily / दिन में दो बार (BD)',
                  'Take Three Times Daily / दिन में तीन बार (TDS)',
                  'Take At Night Daily / केवल रात में (HS)',
                  'Four Times Daily / दिन में चार बार (QID)',
                  'SOS (if need) / जरुरत पड़ने पर ',
                  'Take Before Food / खाने से पहले (AC)',
                  'Take After Food / खाने के बाद (PC)',
                  'Not To Be Taken Orally / खाने पीने वाला नहीं है (AC)',
                  'Before Breakfast / खाली पेट (BBF)',
                  ]


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
        entry_query = get_query(query_string, ['medicine','category'])
        print(entry_query)
        obj_list = MedicationList.objects.filter(entry_query).order_by('medicine')
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
        data['category'] = obj.category or ""
        data['remarks'] = obj.remarks or ""
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

@login_required
def get_medicine_category(request):
    '''
    For ajax search of `category` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['category'])
        obj_list = MedicationList.objects.filter(entry_query).order_by('category')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['value'] = obj.category
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
            
            medicine_name = recv_data.get('medicine', None)
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
            
            remarks = recv_data.get('remarks', "")
            frequency = recv_data.get('frequency', None)
            print(frequency);
            print(type(frequency));
            medicine = MedicationList()
            medicine.medicine = recv_data.get('medicine', None)
            medicine.dosage = recv_data.get('dosage', None)
            medicine.frequency = ", ".join(frequency)
            medicine.duration = recv_data.get('duration', None)
            medicine.type = recv_data.get('type', "Tab")
            medicine.category = recv_data.get('category', "")
            medicine.remarks = remarks
            medicine.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['id'] = medicine.medication_id
            data['medicine'] = medicine.medicine
            data['dosage'] = medicine.dosage
            data['frequency'] = medicine.frequency
            data['duration'] = medicine.duration
            data['type'] = medicine.type
            data['remarks'] = medicine.remarks
            data['category'] = medicine.category
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404
    
def get_medicine_detail(request, pk):
    Medication = get_object_or_404(MedicationList, pk=pk)
    return render(request, "core/get_medication_detail.html", {"obj": Medication})
    
    