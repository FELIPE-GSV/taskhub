# Generated by Django 5.2.3 on 2025-07-10 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='accepted_invite',
        ),
        migrations.AddField(
            model_name='notification',
            name='invite_status',
            field=models.IntegerField(choices=[(1, 'Sem convite'), (2, 'Pendente'), (3, 'Aceito'), (4, 'Recusado')], default=1),
        ),
    ]
