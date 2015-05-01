from requests import request, HTTPError

from django.core.files.base import ContentFile

from authentication.models import Profile


def save_profile(backend, user, response, *args, **kwargs):
    img_url = 'http://graph.facebook.com/%s/picture?width=150&height=150' \
        % response['id']

    try:
        profile = user.profile
    except:
        profile = Profile(user_id=user.id)
    profile.picture = img_url
    profile.save()
