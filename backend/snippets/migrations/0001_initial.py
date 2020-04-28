# Generated by Django 2.1.11 on 2019-12-16 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('code', models.TextField()),
                ('language', models.CharField(choices=[('PY', 'Python'), ('JS', 'JavaScript'), ('C', 'C')], default='python', max_length=12)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]
