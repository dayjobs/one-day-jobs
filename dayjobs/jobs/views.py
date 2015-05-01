from datetime import datetime, timedelta

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import generics
from oauth2_provider.ext.rest_framework import (TokenHasReadWriteScope,
                                                TokenHasScope)

from jobs.models import Job
from jobs.permissions import IsAuthorOfJob, IsAdmin
from jobs.serializers import (JobSerializer, )


class JobViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'
    queryset = Job.objects.order_by('-created_at')
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


class FreshJobsView(generics.ListAPIView):
    queryset = Job.objects.all().order_by('-created_at')[:5]
    serializer_class = JobSerializer
