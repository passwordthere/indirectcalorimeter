from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from datetime import datetime

class DataView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        data = [
            {"id": 1, "name": "Item 1", "value": "Value 1"},
            {"id": 2, "name": "Item 2", "value": "Value 2"},
            {"id": 3, "name": "Item 3", "value": "Value 3"},
        ]
        return Response(data, status=status.HTTP_200_OK)

class SubjectInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        admission_time = datetime(2024, 6, 20, 8, 0, 0)  # Example admission time
        current_time = datetime.now()
        elapsed_time = current_time - admission_time
        elapsed_minutes = divmod(elapsed_time.total_seconds(), 60)[0]

        subject_info = {
            "name": "John Doe",
            "gender": "Male",
            "age": 30,
            "height": 180,
            "weight": 75,
            "admission_time": admission_time.strftime("%Y-%m-%d %H:%M:%S"),
            "elapsed_time": elapsed_minutes,
            "remarks": "Healthy"
        }
        return Response(subject_info, status=status.HTTP_200_OK)

class SystemInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        system_info = {
            "room_volume": 50,
            "airflow": 500,
            "algorithm": "Algorithm A",
            "temperature": 22.5,  # example value
            "humidity": 45.0      # example value
        }
        return Response(system_info, status=status.HTTP_200_OK)