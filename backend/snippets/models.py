from django.db import models
from markdownx.models import MarkdownxField


# Create your models here.
class Snippet(models.Model):
    LANGUAGE_CHOICES = [
        ('PY', 'Python'),
        ('JS', 'JavaScript'),
        ('C', 'C')
    ]
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=30)
    code = MarkdownxField()
    language = models.CharField(choices=LANGUAGE_CHOICES, default='Python', max_length=12)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['created']
