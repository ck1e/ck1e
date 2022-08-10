from pathlib import PurePath
from django.conf import settings


def upload_file(request, form):
    """Uploads a file to the server

    Uploads a file to the server and writes the path to it in the session

    Parameters
    ----------
    request : standard Django request

    form : form inherited from class ModelForm
        The form for which the file is uploaded

    Returns
    -------
    File path or False
    """

    if request.FILES:
        file = form(request.POST, request.FILES)
        if file.is_valid():
            file = file.save(commit=False)
            if request.user.is_authenticated:
                file.user = request.user
            file.save()
            request.session['file_path'] = str(PurePath(settings.MEDIA_ROOT, str(file.path)))
        else:
            request.session['file_path'] = None
    else:
        request.session['file_path'] = None

    return request.session['file_path'] if request.session['file_path'] else False
