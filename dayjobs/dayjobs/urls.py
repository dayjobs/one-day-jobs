from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework_nested import routers

from .views import IndexView
from authentication.views import AccountViewSet, UserView
from jobs.views import JobViewSet, UserJobPostsViewSet, FreshJobsView


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'users', AccountViewSet)
router.register(r'jobs', JobViewSet, 'Job')

accounts_router = routers.NestedSimpleRouter(
    router, r'users', lookup='account', trailing_slash=False
)
accounts_router.register(r'jobs', UserJobPostsViewSet)

urlpatterns = patterns('',
    url(r'^api/v1/jobs/fresh', FreshJobsView.as_view()),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/me', UserView.as_view()),

    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
