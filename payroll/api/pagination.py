from rest_framework.pagination import PageNumberPagination

class DeductionListPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'

class AllowanceListPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'

class PayrollRegularListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class PayrollRegularDataListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'