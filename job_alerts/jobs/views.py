from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Job
from .serializers import JobSerializer

# for testing using scrapers data directly
from .scrapers.internshala import fetch_jobs

class AllJobs(APIView):
    
    serializer_class = JobSerializer
    
    def get(self, request, format=None):
        query_set = fetch_jobs()[:50:]
        filters = request.GET
        ## Adding foltering logic
        # query_set = list(filter(lambda n: filters['location'][0] in n['location'], query_set))
        # print('hello', query_set)
        res = {
            'size': len(query_set),
            'result': query_set
        }
        return Response(res, status=200)
        
class FilterJobs(APIView):
    serializer_class = JobSerializer
    
    
     

