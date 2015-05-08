from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework_nested import routers

from .views import IndexView
from authentication.views import AccountViewSet, UserView
from jobs.views import (JobViewSet, UserJobPostsViewSet,
                        JobMatchViewSet, UserJobMatchesViewSet,
                        FreshJobsView, AllJobMatchesView,
                        AcceptedJobMatchesView, ActiveJobMatchesView,
                        PreviousJobMatchesView,
                        ActiveJobListingsView, PreviousJobListingsView,
                        DetailJobMatchesViewSet)


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'users', AccountViewSet)
router.register(r'jobs', JobViewSet, 'Job')
router.register(r'job_matches', JobMatchViewSet, 'JobMatch')

accounts_router = routers.NestedSimpleRouter(
    router, r'users', lookup='account', trailing_slash=False
)
accounts_router.register(r'jobs', UserJobPostsViewSet)
accounts_router.register(r'job_matches', UserJobMatchesViewSet)

jobs_router = routers.NestedSimpleRouter(
    router, r'jobs', lookup='job', trailing_slash=False
)
jobs_router.register(r'job_matches', DetailJobMatchesViewSet)

urlpatterns = patterns('',
    url(r'^api/v1/jobs/fresh', FreshJobsView.as_view()),
    url(r'^api/v1/job_matches/all', AllJobMatchesView.as_view()),
    url(r'^api/v1/job_matches/active', ActiveJobMatchesView.as_view()),
    url(r'^api/v1/job_matches/accepted', AcceptedJobMatchesView.as_view()),
    url(r'^api/v1/job_matches/previous', PreviousJobMatchesView.as_view()),
    url(r'^api/v1/job_listings/active', ActiveJobListingsView.as_view()),
    url(r'^api/v1/job_listings/previous', PreviousJobListingsView.as_view()),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/', include(jobs_router.urls)),
    url(r'^api/v1/me', UserView.as_view()),

    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
