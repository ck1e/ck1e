from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('FurnitureShop', TemplateView.as_view(template_name="layout/FurnitureShop/index.html")),
    path('Creative', TemplateView.as_view(template_name="layout/Creative/index.html")),
    path('MinimalPortfolio', TemplateView.as_view(template_name="layout/MinimalPortfolio/index.html")),
    path('MinimalPortfolio/<str:template>', views.get_template),
]
