# Generated by Django 3.1.5 on 2021-06-22 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0034_payrollregularmaintenance_deduc_priority_seq'),
    ]

    operations = [
        migrations.AddField(
            model_name='payrollregulardatadeductions',
            name='priority_seq',
            field=models.IntegerField(blank=True, default=0),
            preserve_default=False,
        ),
    ]
