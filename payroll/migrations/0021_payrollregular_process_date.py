# Generated by Django 3.1.5 on 2021-05-27 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0020_auto_20210527_0625'),
    ]

    operations = [
        migrations.AddField(
            model_name='payrollregular',
            name='process_date',
            field=models.DateField(null=True),
        ),
    ]
