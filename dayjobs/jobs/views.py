from datetime import datetime, timedelta

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import generics
from oauth2_provider.ext.rest_framework import (TokenHasReadWriteScope,
                                                TokenHasScope)

from jobs.models import Job, JobMatch
from jobs.permissions import IsAuthorOfJob, IsApplicantOfJob, IsAdmin
from jobs.serializers import (JobSerializer, JobMatchSerializer)


class JobViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'
    queryset = Job.listings.get_active_jobs()
    serializer_class = JobSerializer
    paginate_by = 30
    paginate_by_param = 'page_size'
    max_paginate_by = 50

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (IsAuthorOfJob(), )

    def get_queryset(self):
        queryset = self.queryset
        location = self.request.QUERY_PARAMS.get('location', None)
        date = self.request.QUERY_PARAMS.get('date', None)

        if location is not None:
            print location
            queryset = queryset.filter(location__icontains=location)
        if date is not None:
            date = date.split(' ')
            date =  datetime.strptime('/'.join(date[1:4]), "%b/%d/%Y")
            print date
            queryset = queryset.filter(date__year=date.year,
                                            date__month=date.month,
                                            date__day=date.day)

        return queryset

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(JobViewSet, self).perform_create(serializer)


class UserJobPostsViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Job.objects.select_related('author').all()
    serializer_class = JobSerializer
    paginate_by = 30
    paginate_by_param = 'page_size'
    max_paginate_by = 50
    lookup_url_kwarg = "account_username"

    def get_queryset(self):
        account_username = self.kwargs.get(self.lookup_url_kwarg)
        queryset = self.queryset.filter(author__username=account_username)

        return queryset


class JobMatchViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = JobMatch.objects.order_by('-created_at')
    serializer_class = JobMatchSerializer
    paginate_by = 30
    paginate_by_param = 'page_size'
    max_paginate_by = 50

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (IsApplicantOfJob(), )

    def perform_create(self, serializer):
        job = Job.objects.get(pk=int(self.request.data['job']))
        instance = serializer.save(worker=self.request.user, job=job)

        return super(JobMatchViewSet, self).perform_create(serializer)


class UserJobMatchesViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = JobMatch.objects.select_related('worker').all()
    serializer_class = JobMatchSerializer
    paginate_by = 30
    paginate_by_param = 'page_size'
    max_paginate_by = 50
    lookup_url_kwarg = "account_username"

    def get_queryset(self):
        account_username = self.kwargs.get(self.lookup_url_kwarg)
        queryset = self.queryset.filter(worker__username=account_username)

        return queryset


class FreshJobsView(generics.ListAPIView):
    queryset = Job.listings.get_active_jobs()[:5]
    serializer_class = JobSerializer


class AllJobMatchesView(generics.ListAPIView):
    queryset = JobMatch.objects.all()
    serializer_class = JobMatchSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(worker=self.request.user)

        return queryset


class ActiveJobMatchesView(generics.ListAPIView):
    queryset = JobMatch.matches.get_active_matches()
    serializer_class = JobMatchSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(worker=self.request.user,
                                        status='W')

        return queryset


class AcceptedJobMatchesView(generics.ListAPIView):
    queryset = JobMatch.matches.get_active_matches()
    serializer_class = JobMatchSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(worker=self.request.user,
                                        status='A')

        return queryset


class PreviousJobMatchesView(generics.ListAPIView):
    queryset = JobMatch.matches.get_previous_matches()
    serializer_class = JobMatchSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(worker=self.request.user)

        return queryset


class DetailJobMatchesViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = JobMatch.objects.select_related('job').all()
    serializer_class = JobMatchSerializer
    lookup_url_kwarg = "job_slug"

    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = self.queryset.filter(job__slug=slug).order_by('status')

        return queryset


class ActiveJobListingsView(generics.ListAPIView):
    queryset = Job.listings.get_active_jobs()
    serializer_class = JobSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(author=self.request.user)

        return queryset


class PreviousJobListingsView(generics.ListAPIView):
    queryset = Job.listings.get_previous_jobs()
    serializer_class = JobSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = self.queryset.filter(author=self.request.user)

        return queryset
