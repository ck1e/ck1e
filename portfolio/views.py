from django.shortcuts import render
from .models import Case, Work, WorkImage


def case_list(request, case):
    case = Case.objects.filter(name=case)[0]
    work = Work.objects.filter(case=case.pk, active=True)
    previous_case = Case.objects.filter(id=case.pk-1)[0].name if Case.objects.filter(id=case.pk-1) else False
    next_case = Case.objects.filter(id=case.pk+1)[0].name if Case.objects.filter(id=case.pk+1) else False

    return render(request, 'portfolio/case.html', {
        'case': case,
        'work_list': work,
        'work_img_list': [WorkImage.objects.filter(work=w.pk) for w in work],
        'previous_case': previous_case,
        'next_case': next_case
    })


