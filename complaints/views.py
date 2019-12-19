# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from core.search import get_query, normalize_query, get_query_for_nterms, strip_stopwords

from complaints.models import Disease, Complaints
from django.contrib.auth.decorators import login_required

import json
from django.http.response import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_protect


# Create your views here.

@login_required
def get_disease(request):
    '''
    For ajax search of `disease` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['name'])
        obj_list = Disease.objects.filter(entry_query).order_by('name')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['id'] = obj.disease_id
        data['name'] = obj.name
        data['symptoms'] = [ x.description for x in obj.symptoms.all()]
        result.append(data)
        
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@login_required
def get_complaints(request):
    '''
    For ajax search of `complaints` select field
    '''
    # Search query
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query = get_query(query_string, ['description'])
        obj_list = Complaints.objects.filter(entry_query).order_by('description')[:5]
    else:
        obj_list = []
            
    result = []
    for obj in obj_list:
        data = {}
        data['id'] = obj.complain_id
        data['name'] = obj.description
        data['remarks'] = obj.remarks or ""
        data['duration'] = obj.duration or ""
        result.append(data)
    print("size of results ", len(result));
    r = json.dumps(result)
                  
    return HttpResponse(r, content_type="application/json")

@csrf_protect
@login_required
def add_disease(request):
    if request.is_ajax():
        
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            
            disease_name = recv_data.get('disease_name', None)
            if disease_name is None:
                data = {}
                data['ret'] = 'False'
                data['result'] = 'Failure: Invalid parameters in POST'
                r = json.dumps(data)
                return HttpResponse(r, content_type="application/json")
            
            disease = Disease.objects.filter(name=disease_name)
            if len(disease) > 0:
                data = {}
                data['ret'] = 'False'
                data['result'] = 'Failure: Already exist'
                r = json.dumps(data)
                return HttpResponse(r, content_type="application/json")
            
            disease = Disease()
            disease.name = disease_name
            disease.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['id'] = disease.disease_id
            data['name'] = disease.name
            data['symptoms'] = [ x.description for x in disease.symptoms.all()]
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    
    raise Http404

@csrf_protect
@login_required
def add_complaints(request):
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            
            complaint_name = recv_data.get('complaint_name', None)
            complaint_duration = recv_data.get('complaint_duration', "")
            if complaint_name is  None:
                data = {}
                data['ret'] = 'False'
                data['result'] = 'Failure: Invalid parameters in POST'
                r = json.dumps(data)
                return HttpResponse(r, content_type="application/json")
            
            #complaint = Complaints.objects.filter(description=complaint_name)
            #if len(complaint) > 0:
            #    data = {}
            #    data['ret'] = 'False'
            #    data['result'] = 'Failure: Already exist'
            #    r = json.dumps(data)
            #    return HttpResponse(r, content_type="application/json")
            
            print("Adding complaints ", complaint_name)
            complaint = Complaints()
            complaint.description = complaint_name
            complaint.duration = complaint_duration
            complaint.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['id'] = complaint.complain_id
            data['description'] = complaint.description
            data['duration'] = complaint.duration
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404
                