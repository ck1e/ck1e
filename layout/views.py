from django.shortcuts import render


def get_template(request, template):
    return render(request, 'layout/MinimalPortfolio/'+template)