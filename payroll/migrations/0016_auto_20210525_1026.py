# Generated by Django 3.1.5 on 2021-05-25 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0015_mock'),
    ]

    operations = [
        migrations.AddField(
            model_name='template',
            name='description',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AddField(
            model_name='template',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
