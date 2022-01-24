from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from accounts.views.user import decode_JWT
from accounts.models import Student
from accounts.serializers import StudentSerializer


class StudentView(APIView):
    model = Student
    serializer_class = StudentSerializer

    def get(self, request,school_pk):
        """Get total student of school information
        
        Use school_pk, return total student of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        students : list,
            total student list of school<br>
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        students = Student.objects.filter(school_id=school_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)
    

class ClassroomStudentView(APIView):
    model = Student
    serializer_class = StudentSerializer
    
    def get(self, request,school_pk,classroom_pk):
        """Get classroom student information
        
        Use school_pk and classroom_pk, return classroom student infromation
        
        Request Head
        ------------
        school_pk : int<br>
        classroom_pk : int
        
        Returns
        -------
        200 OK<br>
        students : list,
            classroom student list<br>
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        students = Student.objects.filter(school_id=school_pk,classroom_id=classroom_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)