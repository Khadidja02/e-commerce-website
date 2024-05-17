from django.urls import path
from .views import (ProductListView, ProductDetailView, ProductListViewPage,
 CategoryProductView, CategoryListView, AddToCartView, 
 OrderDetailView, AddCouponView,
 ConfirmOrderView,UserUpdateAPIView,OrderProductDeleteView,
 OrderQuantityUpdateView,CustomPasswordChangeView,
  OrderHistoryView,AddressCreateView, AddressDeleteView,
   AddressUpdateView, AddressListView,UserIDView,
   ContactFormSubmissionCreate, AboutUsDetail,active_users,custom_users_api,
    count_orders,new_custom_users_count, check_authentication_status,clear_cart,export_excel, orders_over_time
 )



urlpatterns = [
    path('clear-cart/', clear_cart, name='clear_cart'),
    path('orders-over-time/', orders_over_time, name='orders_over_time'),
    path('check-auth/', check_authentication_status, name='check-auth'),
    path('user-update/', UserUpdateAPIView.as_view(), name='user-update'),
    path('export-excel', export_excel, name='export-excel'),
    path('products/', ProductListView.as_view(), name='products'),
    path('user-id/', UserIDView.as_view(), name='user-id'),
    path('contact/', ContactFormSubmissionCreate.as_view(), name='contact-form-submission-create'),
    path('about-us/<int:pk>/', AboutUsDetail.as_view(), name='about-us-detail'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('production/', ProductListViewPage.as_view(), name='production'),
    path('categories/', CategoryListView.as_view(), name='category'),
    path('category-products/<int:category_id>/', CategoryProductView.as_view(), name='category-products'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('confirm-order/', ConfirmOrderView.as_view(), name='confirm-order'),
    path('my-addresses/', AddressListView.as_view(), name='address-list'),
    path('addresses/', AddressCreateView.as_view(), name='address-create'),
    path('addresses/<pk>/update/', AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<int:pk>/delete/', AddressDeleteView.as_view(), name='address-delete'),
    path('addresses/<int:pk>/delete/', AddressDeleteView.as_view(), name='address-delete'),
    path('order-products/<pk>/delete/',OrderProductDeleteView.as_view(), name='order-item-delete'),
    path('history-order/', OrderHistoryView.as_view(), name='history-order'),
    path('change-password/', CustomPasswordChangeView, name='password-change'),
    path('active-users/', active_users, name='active_users'),
    path('order-product/update-quantity/',OrderQuantityUpdateView.as_view(), name='order-product-update-quantity'),
    
    # Update cart item quantity
    
]
urlpatterns+= [
    path('active-users/', active_users, name='active_users'),
    path('custom-users/', custom_users_api, name='custom_users'),
    path('count-orders/', count_orders, name='count_orders'),
    path('new-custom/', new_custom_users_count, name='new_custom'),



    # Other backend API endpoints
]
