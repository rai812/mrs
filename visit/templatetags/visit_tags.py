import datetime
from django import template

register = template.Library()

@register.simple_tag
def get_visits(visit_container):
    """
    expect an object of visit container
    """
    return visit_container.visits.all()

@register.simple_tag
def get_visits_count(visit_container):
    """
    expect an object of visit container
    """
    return visit_container.visits.all().count()


@register.simple_tag
def get_complaints(visit):
    """
    expect an object of visit
    """
    return visit.complaints.all()

@register.simple_tag
def get_complaints_count(visit):
    """
    expect an object of visit
    """
    return visit.complaints.all().count()


@register.simple_tag
def get_diagnose(visit):
    """
    expect an object of visit
    """
    return visit.diagnose.all()

@register.simple_tag
def get_diagnose_count(visit):
    """
    expect an object of visit
    """
    return visit.diagnose.all().count()


@register.simple_tag
def get_medicines(visit):
    """
    expect an object of visit
    """
    return visit.medicines.all()

@register.simple_tag
def get_medicines_count(visit):
    """
    expect an object of visit
    """
    return visit.medicines.all().count()