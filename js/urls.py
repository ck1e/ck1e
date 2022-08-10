from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('GenPass', TemplateView.as_view(template_name="js/GenPass/index.html")),
]
