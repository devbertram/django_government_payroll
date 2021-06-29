# Generated by Django 3.1.5 on 2021-06-15 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0030_auto_20210611_0056'),
    ]

    operations = [
        migrations.AddField(
            model_name='payrollregulardata',
            name='is_new',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='atm_account_no',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='is_atm',
            field=models.BooleanField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='monthly_salary',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='plantilla_item',
            field=models.CharField(blank=True, default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='salary_grade',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='payrollregulardata',
            name='step_increment',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='payrollregulardataallowances',
            name='code',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='payrollregulardatadeductions',
            name='code',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
