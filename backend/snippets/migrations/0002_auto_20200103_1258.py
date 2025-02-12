# Generated by Django 2.1.11 on 2020-01-03 12:58

from django.db import migrations, models
import django.db.models.deletion
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Title',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='snippet',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='code',
            field=markdownx.models.MarkdownxField(),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='language',
            field=models.CharField(choices=[('PY', 'Python'), ('JS', 'JavaScript'), ('C', 'C')], default='Python', max_length=12),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='title',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='snippets.Title'),
        ),
    ]
