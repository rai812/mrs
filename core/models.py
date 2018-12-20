# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import pytz
from django.utils import timezone
from django import forms
#from django.core.urlresolvers import reverse
from django.urls import reverse
import datetime

# Create your models here.


class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30,
                                   help_text="Please enter Initials / Middle Name",
                                   blank=True, 
                                   null=True)
    last_name = models.CharField(max_length=30, 
                                 blank=True,
                                 null=True,
                                 help_text="Enter Initials / Last Name"
                                 )
    full_name = models.CharField(max_length=100,
                                 editable=False,
                                 null=False,
                                 blank=False
                                 )
    dob = models.DateField(blank=True, null=True)
    age = models.CharField(max_length=10, blank=True, null=True)
    sex = models.CharField(max_length=6,
                           choices=(("Male", "Male"),
                                    ("Female", "Female"),
                                    ("Others", "Others")
                                    ),
                           default = "Male")
    mobile_number = models.CharField(max_length = 20, blank = True, null = True)
    email = models.EmailField(blank = True, null = True)
    class Meta:
        verbose_name = "Patient - Basic Data"
        verbose_name_plural = "Patient - Basic Data"
        ordering = ('first_name', 
                    'middle_name',
                    'last_name', 
                    'age', 'sex',)

    def __unicode__(self):
        if self.middle_name and self.last_name:
            return "%s %s %s" % (self.first_name.capitalize(),
                                 self.middle_name.capitalize(),
                                 self.last_name.capitalize()
                                 )
        elif self.last_name or self.middle_name:
          if self.last_name:
            return "%s %s" % (self.first_name.capitalize(), self.last_name.capitalize())
          else:
            return "%s %s" % (self.first_name.capitalize(), self.middle_name.capitalize())

    def __str__(self):
        if self.middle_name and self.last_name:
            return "%s %s %s" % (self.first_name.capitalize(),
                                 self.middle_name.capitalize(),
                                 self.last_name.capitalize()
                                 )
        elif self.last_name or self.middle_name:
          if self.last_name:
            return "%s %s" % (self.first_name.capitalize(), self.last_name.capitalize())
          else:
            return "%s %s" % (self.first_name.capitalize(), self.middle_name.capitalize())


    def get_age(self):
        """
        Extract the current age from dob field
        """
        return self.age

    def get_absolute_url(self):
        return reverse("get_patient_detail",kwargs={"pk":self.patient_id})
        
    def check_before_you_add(self):
      """
        Checks whether the patient has already been registered in the
        database before adding.
      """
      all_pat = Patient.objects.all()
      full_name = self.full_name
      name_list = []
      if all_pat:
        for p in all_pat:
            name_list.append(p.full_name)
        if full_name in name_list:
            error = "Patient is already registered"
            print(error)
            return False
        else:
            return True
      else:
          return True

    def _set_full_name(self):

        """
            Defines and sets the Full Name for a Model on save.
            This stores the value under the self.full_name attribute.
            This is mainly intented for name display and search
        """

        if self.middle_name and self.last_name:
            self.full_name = str(self.first_name.capitalize() + " " +
                                     self.middle_name.capitalize() + " " +
                                     self.last_name.capitalize()
                                     )
        else:
            if self.last_name:
                self.full_name = str(self.first_name.capitalize() + " " +
                                     self.last_name.capitalize()
                                     )
            elif self.middle_name:
                self.full_name = str(self.first_name.capitalize() + " " +
                                     self.middle_name.capitalize()
                                     )
            else:
                self.full_name = str(self.first_name.capitalize())
        
        print("Set full name as ", self.full_name)
        return self.full_name


    def _set_age(self):

        """ Check DOB and Age. See Which one to set. 
            Dont set age if DOB is given. 
            Dont allow age > 120 to be set.
            This should be called before Form & Model save.
            If this returns false, the save should fail raising proper Exception
        """

        if self.dob:
            min_allowed_dob = datetime.date(1900, 1, 1)
            max_allowed_dob = datetime.date.today()
            if self.dob >= min_allowed_dob and \
                self.dob <= max_allowed_dob:
                if(round((max_allowed_dob - self.dob).days / 365.0, 2) < 1):
                    # check if it is less that one month
                    if(round((max_allowed_dob - self.dob).days / 31.0) < 1):
                        self.age = "%d days" %((max_allowed_dob - self.dob).days)
                    else:
                        self.age = "%d months" %(int((max_allowed_dob - self.dob).days / 31.0))
                else:
                    self.age = "%d " %(int((max_allowed_dob - self.dob).days / 365.0))
                print("Set age as ", self.age, " and dob ", self.dob)
                return True
            else:
                raise Exception(
                    "Invalid Date: Date should be from January 01 1900 to Today's Date")
        else:
            if self.age:
                self.dob = None
                return True
            else:
                raise Exception("Invalid Date of Birth / Age Supplied")
                return False

    def save(self, *args, **kwargs):
        """
          Custom Save Method needs to be defined.
          This should check for:
          1. Whether the patient is registered before.
          2. Patient DOB / Age Verfication and attribute setting
          3. Setting the full_name attribute
        """

        self._set_full_name()
        self._set_age()
        super(Patient, self).save(*args, **kwargs)
        

class Vitals(models.Model):
    vital_id    = models.AutoField(primary_key=True)
    weight      = models.CharField(max_length=30, blank=True,null=True)
    height      = models.CharField(max_length=30, blank=True,null=True)
    oe          = models.CharField(max_length=30, blank=True,null=True)
    p_ce_cn_iol = models.CharField(max_length=30, blank=True,null=True)
    temp        = models.CharField(max_length=30, blank=True,null=True)
    pulse       = models.CharField(max_length=30, blank=True,null=True)
    bp          = models.CharField(max_length=30, blank=True,null=True)
    rr          = models.CharField(max_length=30, blank=True,null=True)
    cns         = models.CharField(max_length=30, blank=True,null=True)
    chest       = models.CharField(max_length=30, blank=True,null=True)
    cvs         = models.CharField(max_length=30, blank=True,null=True)
    pa          = models.CharField(max_length=30, blank=True,null=True)
    tests       = models.TextField(blank=True,null=True)

    def __unicode__(self):
        return "weight - %s Height - %s" % (self.weight, self.height) 

    def __str__(self):
        return "weight - %s Height - %s" % (self.weight, self.height) 


class PatientForm(forms.ModelForm):
    patient_id = forms.IntegerField(required=False)
    class Meta:
        model = Patient
        exclude = ('full_name',)

class PatientSearchForm(forms.Form):
    patient = forms.ModelChoiceField(Patient.objects.all())
