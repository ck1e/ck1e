from django.urls import path, include
from django.views.generic import TemplateView
from .models import Case
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name="portfolio/index.html")),
    path('about', TemplateView.as_view(template_name="portfolio/about.html")),
    path('portfolio', TemplateView.as_view(template_name="portfolio/portfolio.html",
                                           extra_context={'case_list': Case.objects.filter(active=True)})),
    path('portfolio/<str:case>', views.case_list),
]
