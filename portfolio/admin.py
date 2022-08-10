from django.contrib import admin
from .models import Case, Work, WorkImage


class WorkInline(admin.TabularInline):
    model = Work
    extra = 1


class WorkImageInline(admin.TabularInline):
    model = WorkImage
    extra = 1


class CaseAdmin(admin.ModelAdmin):
    field = '__all__'

    inlines = [WorkInline, ]


class WorkAdmin(admin.ModelAdmin):
    field = '__all__'

    inlines = [WorkImageInline, ]


admin.site.register(Case, CaseAdmin)
admin.site.register(Work, WorkAdmin)
admin.site.register(WorkImage)
