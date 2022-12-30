# Generated by Django 3.2 on 2022-12-25 13:36

from django.db import migrations, models
import django.db.models.deletion
import history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
        ('complaints', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalHistory',
            fields=[
                ('medicine_id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.TextField(blank=True, max_length=500, null=True, verbose_name='Status')),
                ('date_of_diagnosis', models.DateField(blank=True, null=True)),
                ('active', models.BooleanField(default=None, verbose_name='Active?')),
                ('infectious_disease', models.BooleanField(default=None)),
                ('allergic_disease', models.BooleanField(default=None)),
                ('disease', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='complaints.disease')),
                ('patient_detail', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.patient')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalFiles',
            fields=[
                ('medical_files_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(blank=True, max_length=255)),
                ('document', models.FileField(upload_to=history.models.user_directory_path)),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('patient_detail', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.patient')),
            ],
        ),
    ]