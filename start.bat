@echo off
cd /d C:\Users\gpon\Documents\mrs
start python manage.py runserver 
TIMEOUT /T 10
start http://127.0.0.1:8000/visit/
