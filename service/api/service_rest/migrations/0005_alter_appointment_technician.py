# Generated by Django 4.0.3 on 2023-07-25 03:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_alter_appointment_technician'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='technician',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointments', to='service_rest.technician'),
        ),
    ]
