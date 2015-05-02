from rest_framework import serializers

from authentication.serializers import UserSerializer
from jobs.models import Job


class JobSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Job

        fields = ('id', 'author', 'name', 'description', 'location',
                  'location_coords', 'hours', 'salary', 'slots_count',
                  'slots_left', 'day', 'job_url',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(JobSerializer, self).get_validation_exclusions()

        return exclusions + ['author']
