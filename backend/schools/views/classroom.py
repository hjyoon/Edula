from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from accounts.views.user import decode_JWT
from ..models import Classroom
from ..serializers import ClassroomSerializer


class ClassroomView(APIView):
    model = Classroom
    serializer_class = ClassroomSerializer
    
    def get(self, request,school_pk):
        """Get total classroom of school information
        
        Use school_pk, return total classroom of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        classroom : list,
            total classroom list of school<br>
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        classrooms = Classroom.objects.filter(school_id=school_pk)
        serializer = ClassroomSerializer(classrooms, many=True)  
        return Response(serializer.data)
    
    def post(self, request,*arg, **kwargs):
        """Post classroom of school information
        
        Save classroom of school infromation
        
        Request Head
        ------------
        class_grade : int,
            학년<br>
        class_num : int,
            반<br>
        school : int,
            학교<br>
        
        Returns
        -------
        201 Created<br>
        classroomS : list,
            classrooms list of school<br>
        
        400 Bad Request
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

