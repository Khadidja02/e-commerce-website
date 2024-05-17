from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin
from .models import *
from django import forms

from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
 # Import the OrderResource class


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = UserAccount


class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    model = UserAccount
    list_display = ('email', 'name', 'is_active', 'is_staff', 'phone','is_superuser')
    ordering = ('email',)
    fieldsets=[
        (None,{'fields':("email","password")}),
        ('Personal info', {'fields':('name','phone')}),
        ('Permissions',{'fields':(
            'is_active',
             'is_staff',
              'is_superuser',
              'groups',
              'user_permissions',
        ),},),
        
    ]
    class CustomUserCreationForm(forms.ModelForm):
        class Meta:
            model = UserAccount
            fields = ('email', 'name', 'phone')  # Add 'phone' field if you want it in the admin form

    class CustomUserChangeForm(forms.ModelForm):
        class Meta:
            model = UserAccount
            fields = ('email', 'name', 'phone')
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','name', 'phone'),
        }),
    )
class ProdcutsAdmin(admin.ModelAdmin):
    list_display = ('title','slug','display_category')
    list_filter = ('category','title')
    def display_category(self, obj):
        return ', '.join([category.name for category in obj.category.all()])
    display_category.short_description = 'Category'
class OrderAdmin(admin.ModelAdmin):
    list_display= ('id','display_products','ordered_date','shipping_address','being_delivered')
    list_filter= ('being_delivered',)
    def display_products(self, obj):
        return ', '.join(obj.get_product_names())
    display_products.short_description = 'Products'


class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_product_name', 'quantity')

    def display_product_name(self, obj):
        return obj.product.title
    display_product_name.short_description = 'Product'

class AddressAdmin(admin.ModelAdmin):
    list_display=('user', 'street_address', 'house_address','country', 'address_type')


admin.site.register(UserAccount, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Products , ProdcutsAdmin)
admin.site.register(OrderProduct, OrderProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(AboutUs)
admin.site.register(ContactFormSubmission)
admin.site.register(Coupon)


