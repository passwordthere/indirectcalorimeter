from django.contrib.auth.models import User
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='profile.avatar', required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'avatar']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        avatar = profile_data.get('avatar')

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if avatar:
            instance.profile.avatar = avatar
            instance.profile.save()

        return instance
