from rest_framework import permissions


class IsAuthorOfJob(permissions.BasePermission):
    def has_object_permission(self, request, view, job):
        if request.user:
            return job.author == request.user
        return False


class IsApplicantOfJob(permissions.BasePermission):
    def has_object_permission(self, request, view, job):
        if request.user:
            return job.worker == request.user
        return False


class IsAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        if request.user:
            return request.user.is_superuser
        return False
