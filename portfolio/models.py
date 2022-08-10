from django.db import models
from django.contrib.postgres.fields import CICharField


def img_path(instance, filename):
    path = 'portfolio/img/'
    if isinstance(instance, Case):
        path += 'case-{}/{}'.format(instance.name, filename)
    if isinstance(instance, Work):
        path += 'case-{}/{}/{}'.format(instance.case, instance.name, filename)
    if isinstance(instance, WorkImage):
        work = Work.objects.filter(id=instance.work_id)[0]
        case = Case.objects.filter(id=work.case_id)[0]
        path += 'case-{}/{}/{}'.format(case.name, work.name, filename)

    return path


class Case(models.Model):
    name = CICharField(max_length=50, unique=True, verbose_name="Case name")
    active = models.BooleanField(default=True, verbose_name="Case display activity")
    technology = models.CharField(max_length=200, blank=True, verbose_name="Case creation technologies")
    text = models.TextField(blank=True, verbose_name="Case text")
    img_bg = models.ImageField(upload_to=img_path, blank=True, verbose_name="Case background image")
    img_obj = models.ImageField(upload_to=img_path, blank=True, verbose_name="Case image object")
    img_bg_detail = models.ImageField(upload_to=img_path, blank=True,
                                      verbose_name="Case background image for detail page")

    def __str__(self):
        return self.name


class Work(models.Model):
    case = models.ForeignKey(Case, on_delete=models.SET_NULL, null=True)
    active = models.BooleanField(default=True, verbose_name="Work display activity")
    name = CICharField(max_length=50, verbose_name="Work name")
    img = models.ImageField(upload_to=img_path, blank=True, verbose_name="Work image")
    text = models.TextField(blank=True, verbose_name="Work text")
    link = models.CharField(max_length=50, blank=True, verbose_name="Work view link")

    def __str__(self):
        return self.name


class WorkImage(models.Model):
    work = models.ForeignKey(Work, on_delete=models.CASCADE, verbose_name="Work")
    img = models.ImageField(upload_to=img_path, verbose_name="Additional work image")
