from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'profile')

    def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(UserSerializer, self).get_validation_exclusions()

            return exclusions + ['profile']
