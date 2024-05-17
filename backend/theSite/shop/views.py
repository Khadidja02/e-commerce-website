from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count, DateTimeField
from django.db.models.functions import TruncDay # Import the Count function
from .models import Products, CartItem, Category, OrderProduct, Order, Coupon, Address, AboutUs, ContactFormSubmission, UserAccount
from .serializers import ( ProductSerializer, CategorySerializer, OrderProductSerializer, 
OrderSerializer, CouponSerializer,AddressSerializer, AboutUsSerializer, ContactFormSubmissionSerializer, UserUpdateSerializer )
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
)
from django.contrib.auth.decorators import login_required
from datetime import datetime

from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.views import PasswordChangeView
from django.urls import reverse_lazy
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from django.utils import timezone
from decimal import Decimal
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import get_user_model
from django.utils import timezone
import xlwt


from datetime import timedelta

# views.py

from django.shortcuts import render

from .myresources import OrderResource



def new_custom_users_count(request):

    # Define a time range, for example, users registered in the last 30 days
    start_date = timezone.now() - timedelta(days=30)

    # Count new custom users based on your criteria
    new_custom_users_count = UserAccount.objects.filter(
        is_staff=False, is_active=True, date_joined__gte=start_date
    ).count()

    return JsonResponse({'new_custom_users_count': new_custom_users_count})

def active_users(request):
    active_users = UserAccount.objects.filter(is_active=True)
    # Serialize active_users to JSON or create a JSON response
    serialized_users = [{'name': user.name, 'email': user.email} for user in active_users]
    return JsonResponse(serialized_users, safe=False)

def custom_users_api(request):
    client_user_count = UserAccount.objects.filter(is_staff=False).count()
    context = {'client_user_count': client_user_count}
    return JsonResponse(context)


def count_orders(request):
    order_count = Order.objects.filter(ordered=True).count()
    context = {'order_count': order_count}
    return JsonResponse(context)  

class ContactFormSubmissionCreate(generics.CreateAPIView):
    queryset = ContactFormSubmission.objects.all()
    serializer_class = ContactFormSubmissionSerializer

class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id}, status=HTTP_200_OK)


class ProductListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Modify the queryset to select only 8 products
        return Products.objects.all()[:8]
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            'total_pages': self.page.paginator.num_pages  # Add total_pages to the response
        })        

class ProductListViewPage(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset= Products.objects.all()
    pagination_class = CustomPageNumberPagination
    page_size = 10 
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description'] 
   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_authentication_status(request):
    # If the request reaches this point, it means the user is authenticated
    return Response({'authenticated': True})
    

class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()
    lookup_field = 'slug'
    
class UserUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user

class CategoryListView(APIView):
    permission_classes = [AllowAny]
    def get_queryset(self):  # Implement get_queryset() method
        return Category.objects.all()
    
    def get(self, request):
        queryset = self.get_queryset()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class CategoryProductView(APIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Products.objects.all()

    def get(self, request: HttpRequest, category_id):
        products = self.get_queryset().filter(category=category_id)
        serializer = ProductSerializer(products, many=True, context={'request': request})
        for product_data in serializer.data:
            if 'image' in product_data:
                product_data['image'] = request.build_absolute_uri(product_data['image'])
        return Response(serializer.data)


# Create a new view for adding products to the cart using a generic CreateAPIView

class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid request"}, status= HTTP_400_BAD_REQUEST)
        user = request.user
        if not request.user.is_authenticated:
            return Response({"message": "Authentication required"}, status=HTTP_401_UNAUTHORIZED)
    
        product = get_object_or_404(Products, slug=slug)
        

        # Get or create an open (unordered) cart for the user
        order, created = Order.objects.get_or_create(user=user, ordered=False)
        order_product, created = OrderProduct.objects.get_or_create(
            product=product,
            user=request.user,
            ordered=False
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.products.filter(product__slug=product.slug).exists():
                order_product.quantity += 1
                order_product.save()
                return Response(status=HTTP_200_OK)
            else:
                order.products.add(order_product)
                return Response(status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.products.add(order_product)
            return Response(status=HTTP_200_OK)

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")        




        return Response(status=HTTP_200_OK)

class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)

        if coupon.user == self.request.user:
            return Response({"message": "Coupon has already been used by this user"}, status=status.HTTP_400_BAD_REQUEST)

        if coupon.amount:


            # Percentage discount
            total_amount = order.get_total()
            discount_amount = (coupon.amount * total_amount)/100
            total_amount -= discount_amount

            # Make sure the total doesn't go below zero
            total_amount = max(total_amount, Decimal('0.00'))

            # Update the order's total with the discount applied
            order.total = total_amount
            order.coupon = coupon
            order.save()

    # Return the updated total in the response
            return Response({"message": "Coupon applied successfully", "total": total_amount}, status=HTTP_200_OK)

        else:
            return Response({"message": "Invalid coupon type"}, status=HTTP_400_BAD_REQUEST)    

class ConfirmOrderView(CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        try:
            order_data = request.data
            shipping_address_data = order_data.get('shipping_address', {})
            
            if not shipping_address_data:
                return Response({"error": "Shipping address is required."}, status=status.HTTP_400_BAD_REQUEST)
            user = request.user
            if not request.user.is_authenticated:
                return Response({"message": "Authentication required"}, status=HTTP_401_UNAUTHORIZED)    
            

            # Extract and validate shipping address data
            street_address = shipping_address_data.get('street_address', "")
            house_address = shipping_address_data.get('house_address', "")
            country = shipping_address_data.get('country', "")
            zip = shipping_address_data.get('zip', "")

            

            # Create and save the shipping address associated with the user
            shipping_address = Address(
                user=user,
                street_address=street_address,
                house_address=house_address,
                country=country,
                zip=zip,
                address_type='S',
                default=True,
            )
            shipping_address.save()

            # Create a new order instance and populate it with order data
            new_order = Order(
                user=user,
                shipping_address=shipping_address,
            )

            # Save the order
            new_order.save()

            # Associate products with the order (you may need to modify this part based on your data)
            for product_data in order_data.get('products', []):
                order_product = OrderProduct.objects.get(id=product_data['id'])
                new_order.products.add(order_product)

            # Mark the order as ordered (you may have an 'ordered' field in your model)
            new_order.ordered = True
            new_order.save()

            order = Order.objects.filter(user=request.user, ordered=False).first()
            if order:
                order.products.clear()

            return Response({"message": "Order confirmed successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class OrderHistoryView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(user=user, ordered=True)


@require_POST
def clear_cart(request):
    user = request.user
    try:
        cart_items = CartItem.objects.filter(user=user)
        cart_items.delete()
        return JsonResponse({'message': 'Cart cleared successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
class AboutUsDetail(generics.RetrieveAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
    lookup_field = 'pk'
class AddressListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer

    def get_queryset(self):
        address_type = self.request.query_params.get('address_type', None)
        qs = Address.objects.all()
        if address_type is None:
            return qs
        return qs.filter(user=self.request.user, address_type=address_type)


class AddressCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Address.objects.all()        

class OrderProductDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = OrderProduct.objects.all()

class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        product = get_object_or_404(Products, slug=slug)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.products.filter(product__slug=product.slug).exists():
                order_product = OrderProduct.objects.filter(
                    product=product,
                    user=request.user,
                    ordered=False
                )[0]
                if order_product.quantity > 1:
                    order_product.quantity -= 1
                    order_product.save()
                else:
                    order.products.remove(order_product)
                return Response(status=HTTP_200_OK)
            else:
                return Response({"message": "This product was not in your cart"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def CustomPasswordChangeView(PasswordChangeView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"message": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Important for keeping the user session

        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

    return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

def export_excel(request):


    order_resource = OrderResource()
    
    # Export data using the OrderResource
    dataset = order_resource.export()

    
   
    # Create a workbook and add a worksheet
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Orders')

    # Write data to the worksheet
    print("Headers:", dataset.headers)

# Write headers
    for col_num, header in enumerate(dataset.headers):
        ws.write(0, col_num, header)

    # Write data rows
    for row_num, row in enumerate(dataset, start=1):
        for col_num, value in enumerate(row):
            ws.write(row_num, col_num, value)

    # Create an HTTP response with the appropriate content type
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="orders_export_{0}.xls"'.format(datetime.now().strftime('%Y-%m-%d'))

    # Save the workbook to the response
    wb.save(response)

    return response



def orders_over_time(request):
    orders_over_time = Order.objects.annotate(
            ordered_day=TruncDay('ordered_date', output_field=DateTimeField())
        ).values('ordered_day').annotate(
            total_orders=Count('id')
        ).order_by('ordered_day')
    data = list(orders_over_time.values('ordered_date', 'total_orders'))  # Restructure the data
    return JsonResponse(data, safe=False)    