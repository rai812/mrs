# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404, redirect
import traceback
import sys
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http.response import Http404, HttpResponseRedirect
#from django.core.urlresolvers import reverse
from django.urls import reverse
import json

from visit.models import Visit, VisitContainer
from medication_list.models import MedicationList
from complaints.models import Complaints, Disease

from core.models import PatientForm, Patient, PatientSearchForm, Vitals
from core.search import get_query, normalize_query, get_query_for_nterms, strip_stopwords
from django.template.context_processors import csrf
from django.views.decorators.csrf import csrf_protect

# Create your views here.

@login_required
def index(request):
    visit_list = VisitContainer.objects.all()
#     paginator = Paginator(patient_list, 10)
#     page = request.GET.get('page', 1)
#     ## TODO check the criteriea and change the patient_list
#     try:
#         patients = paginator.page(page)
#     except PageNotAnInteger:
#         patients = paginator.page(1)
#     except EmptyPage:
#         patients = paginator.page(paginator.num_pages)

    return render(request, "visit/index.html", {'visit_containers': visit_list})


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
#         if request.session.get('patient_id', None) is None:
#             redirect(reverse("add_patient"))
#             
#         patient_detail = Patient.objects.get(patient_id = request.session.get('patient_id'))
#         if patient_detail is None:
#             raise Http404("Invalid Userid in session!!!!")
        visit_container_id = request.GET.get('visit_container_id',None)
        if visit_container_id:
            visit_container = VisitContainer.objects.get(id = visit_container_id);
        else:
            visit_container = None

        use_as_template = request.GET.get('use_as_template',False)
        if use_as_template:
            visit_id = request.GET.get('visit_id',None)
            if visit_id is None:
                raise Http404("Invalid request Method")
            
            visit = Visit.objects.get(visit_id = visit_id);
            complaints = visit.complaints.all();
            medicines = visit.medicines.all();
            diagnose = visit.diagnose.all();
            return render(request, "visit/add_visit.html", {'medicines': medicines, 'template': True,
                                                        'complaints': complaints, 'diagnose': diagnose})


        return render(request, "visit/add_visit.html", {'visit_container_id': visit_container_id,
                                                        'visit_container': visit_container})
    
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
            visit_container = recv_data.get('visit_container_id', None)
            patient_id = recv_data.get('patient_id', None)

            if visit_container is None:
                visit_container = VisitContainer();
                visit_container.patient_detail = Patient.objects.get(patient_id = patient_id);
                visit_container.save();
            else:
                visit_container = VisitContainer.objects.get(id=visit_container);
            complaints = recv_data.get('complaints', [])
            medicines = recv_data.get('medicines', [])
            vitals = recv_data.get('vitals', None)
            diseases = recv_data.get('diseases', [])
            remark = recv_data.get('remark', None)
            tests = recv_data.get('tests', None)
            
            
            
            visit = Visit()
            visit.remarks = remark
            if tests:
                if vitals:
                    visit.vitals = Vitals.objects.get(vital_id = vitals)
                else:
                    temp_vital = Vitals()
                    temp_vital.tests = tests;
                    temp_vital.save();
                    visit.vitals = temp_vital
            visit.save();
            
            visit_container.visits.add(visit);
            
            if len(medicines) > 0:
                medicine_objs = MedicationList.objects.filter(pk__in=medicines)
                for obj in medicine_objs:
                    visit.medicines.add(obj)
            if len(complaints) > 0:
                complaint_objs = Complaints.objects.filter(pk__in=complaints)
                for obj in complaint_objs:
                    visit.complaints.add(obj)
            if len(diseases) > 0:
                disease_objs = Disease.objects.filter(pk__in=diseases)
                for obj in disease_objs:
                    visit.diagnose.add(obj)

            data = {}
            data['result'] = 'Successfully added'
            data['ret'] = 'True'
            data['visit_container_id'] = visit_container.id
            data['visit_id'] = visit.visit_id
            data['test'] = tests
            r = json.dumps(data)
            return HttpResponse(r, content_type="application/json")
    raise Http404

@login_required
def get_visit_list(request):
    
    field = request.GET.get('field', "")
    query = request.GET.get('q', "")
    
    if len(field) == 0 or len(query) == 0:
        visit_containers = VisitContainer.objects.all()
    elif field == "name":
        entry_query = get_query(query, ['patient_detail__first_name', 'patient_detail__middle_name','patient_detail__last_name'])
        visit_containers = VisitContainer.objects.filter(entry_query).order_by('patient_detail__first_name')[:10]
    elif field == "mobile_number":
        entry_query = get_query(query, ['patient_detail__mobile_number'])
        visit_containers = VisitContainer.objects.filter(entry_query).order_by('patient_detail__first_name')[:10]    
    elif field == "disease":
        entry_query = get_query(query, ['visits__diagnose__name'])
        visit_containers = VisitContainer.objects.filter(entry_query).order_by('patient_detail__first_name')[:10]    
    else:
        visit_containers = VisitContainer.objects.all()[:10]
        

    return render(request, 'visit/visit_list.html', { 'visit_containers': visit_containers})
    
    