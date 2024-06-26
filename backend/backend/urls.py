from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from api.views import DataView, SubjectInfoView, SystemInfoView
from users.views import UserInfoView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/user/', UserInfoView.as_view(), name='user-info'),
    path('api/data/', DataView.as_view(), name='data'),
    path('api/subject-info/', SubjectInfoView.as_view(), name='subject-info'),
    path('api/system-info/', SystemInfoView.as_view(), name='system-info'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
