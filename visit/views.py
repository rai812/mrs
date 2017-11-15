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
from django.template.context_processors import csrf
from django.views.decorators.csrf import csrf_protect

# Create your views here.

@login_required
def add_visit(request):
    """
    In case of GET fetch the template and respond.
    Ajax request is expected.in case of POST
    we would recieve following values in POST:
    1. List of complaints id.
    2. List of medicine Ids.
    3. List of Disease_id as diagnosis.
    4. Global duration field.
    5. Remark Text.
    6. Patient id in request.SESSION
    
    Procedure: Create the visit object and then add complaint_id, disease_id, medicine_id with this object
    """
    
    if request.method == 'GET':
        if request.session.get('patient_id', None) is None:
            redirect(reverse("add_patient"))
            
        patient_detail = Patient.objects.get(patient_id = request.session.get('patient_id'))
        if patient_detail is None:
            raise Http404("Invalid Userid in session!!!!")
        
        return render(request, "visit/add_visit.html", {'patient_detail':patient_detail})
    
    raise Http404("Invalid request Method")
    
def get_visit_detail(request, pk):
    patient = get_object_or_404(Patient, pk=pk)
    return render(request, "core/get_patient_detail.html", {"obj": patient})

@csrf_protect
@login_required
def add_visit_api(request):
    """
    In case of GET fetch the template and respond.
    Ajax request is expected.in case of POST
    we would recieve following values in POST:
    1. List of complaints id.
    2. List of medicine Ids.
    3. List of Disease_id as diagnosis.
    4. Global duration field.
    5. Remark Text.
    6. Patient id in request.SESSION
    
    Procedure: Create the visit object and then add complaint_id, disease_id, medicine_id with this object
    """
    
    if request.is_ajax():
        if request.method == 'GET':
            data = {}
            data['ret'] = 'False'
            data['result'] = 'Failure: Invalid request method!!!'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
        
        if request.method == 'POST':
            
            recv_data = json.loads(request.body)
            print(recv_data)
            complaints = recv_data.getlist('complaints', [])
            medicines = recv_data.getlist('medicines', [])
            vitals = recv_data.get('vitals', None)
            diseases = recv_data.getlist('diseases', [])
            remark = recv_data.get('remark', None)
            
            visit = Visit()
            if len(medicines) > 0:
                visit.medicines.add(medicines)
            if len(complaints) > 0:
                visit.complaints.add(complaints)
            if len(diseases) > 0:
                visit.diagnose.add(diseases)
            visit.remarks = recv_data.get('remark', None)
            visit.patient_detail = Patient.objects.get(patient_id = request.session['patient_id'])
            visit.save()
            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404
    
    