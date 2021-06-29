# Generated by Django 3.1.5 on 2021-06-11 00:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('payroll', '0029_auto_20210607_1414'),
    ]

    operations = [
        migrations.AddField(
            model_name='payrollregularmaintenance',
            name='field_description',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollRegularMnt_created_by_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='payroll_regular',
            field=models.ForeignKey(db_column='payroll_regular_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollRegularMnt_payrollRegular', to='payroll.payrollregular'),
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='payroll_regular_data',
            field=models.ForeignKey(db_column='payroll_regular_data_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollRegularMnt_payrollRegularData', to='payroll.payrollregulardata'),
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='updated_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollRegularMnt_updated_by_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
