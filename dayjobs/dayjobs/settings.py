"""
Django settings for dayjobs project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^3x)#n#+ss1*lc3rb**m+9c1ic5irzxose_2@7i6s%7&nsbeqg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'compressor',
    'oauth2_provider',
    'social.apps.django_app.default',
    'rest_framework_social_oauth2',
    'authentication',
    'jobs',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.ext.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
    ),
}

AUTHENTICATION_BACKENDS = (
    # Facebook OAuth2
    'social.backends.facebook.FacebookAppOAuth2',
    'social.backends.facebook.FacebookOAuth2',

    # django-rest-framework-social-oauth2
    'rest_framework_social_oauth2.backends.DjangoOAuth2',

    # Django
    'django.contrib.auth.backends.ModelBackend',
)

PROPRIETARY_APPLICATION_NAME = "Owner"
PROPRIETARY_BACKEND_NAME = "Facebook"

# Facebook configuration
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.mail.mail_validation',
    'social.pipeline.social_auth.associate_by_email',
    'social.pipeline.user.get_username',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',

    'authentication.pipeline.save_profile',
)

SOCIAL_AUTH_FACEBOOK_KEY = '861972850543003'
SOCIAL_AUTH_FACEBOOK_SECRET = 'aaf94d3391631fbccf4d213dc6a9ba71'

# Define SOCIAL_AUTH_FACEBOOK_SCOPE to get extra permissions from facebook.
# Email is not sent by default, to get it,
# you must request the email permission:
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']

ROOT_URLCONF = 'dayjobs.urls'

WSGI_APPLICATION = 'dayjobs.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

if 'RDS_DB_NAME' in os.environ:
    DATABASES = {
       'default': {
             'ENGINE':'django.db.backends.postgresql_psycopg2',
             'NAME': os.environ['RDS_DB_NAME'],
             'USER': os.environ['RDS_USERNAME'],
             'PASSWORD': os.environ['RDS_PASSWORD'],
             'HOST': os.environ['RDS_HOSTNAME'],
             'PORT': os.environ['RDS_PORT'],
             }
          }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'dayjobs',
            'USER': 'dayjobs',
            'PASSWORD': 'dayjobs',
            'HOST' : 'localhost',
            'PORT' : '5432',
        }
    }

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

STATIC_ROOT = os.path.join(BASE_DIR, "..", "www", "static")
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)

#MEDIA FILE (user uploaded files)
MEDIA_ROOT = os.path.join(BASE_DIR, "..", "www", "media")
MEDIA_URL = '/media/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

COMPRESS_ENABLED = os.environ.get('COMPRESS_ENABLED', False)


# GRAPELLI SETTINGS
GRAPPELLI_ADMIN_TITLE = '1 Day Jobs'

