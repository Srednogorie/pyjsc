from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin

# Register your models here.

from backend.snippets.models import Snippet


class MyMarkdownxModelAdmin(MarkdownxModelAdmin):
	list_display = ("title", "language", "category")
	class Media:
		css = {
			"all": ('/static/snippets/colorful.css', )
		}


admin.site.register(Snippet, MyMarkdownxModelAdmin)
