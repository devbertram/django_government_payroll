# Generated by Django 3.1.5 on 2021-04-20 06:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0007_auto_20210420_0559'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='plantilla',
            new_name='plantilla_id',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='plantilla_link',
        ),
    ]