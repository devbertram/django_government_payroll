# Generated by Django 3.1.5 on 2021-06-03 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0025_auto_20210602_0440'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payrollregularmaintenance',
            name='employee_no',
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='category',
            field=models.IntegerField(choices=[(0, 'Modify Parameter'), (1, 'Create Content'), (2, 'Removed Content')], default=0),
        ),
    ]