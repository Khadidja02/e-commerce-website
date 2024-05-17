from rest_framework import serializers
from .models import Products, Category, OrderProduct, Order, Coupon, Address, UserAccount,AboutUs, ContactFormSubmission
from djoser.serializers import UserCreateSerializer


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['name', 'email', 'phone']

class ContactFormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormSubmission
        fields = '__all__'

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ('id', 'email', 'name', 'password')



class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Products
        fields = (
            'title',
            'price',
            'discount_price',
            'category',
            'slug',
            'description',
            'image',
        )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"        


class OrderProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField() 
    price = serializers.SerializerMethodField()  # Add this field

    class Meta:
        model = OrderProduct
        fields = (
            'id',
            'product',
            'quantity',
            'price',
            'final_price',
            'product_image'
        )
    def get_product(self, obj):
        return ProductSerializer(obj.product).data

    def get_final_price(self, obj):
        return obj.get_final_price() 
    def get_product_image(self, obj):
        # Assuming get_product_image is a method in the OrderProduct model
        return obj.get_product_image()  
    def get_price(self, obj):
        return obj.product.price        
    

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = (
            'id',
            'code',
            'amount'
        )        

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    order_products = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'ordered_date',
            'order_products',
            'total',
            'coupon'
        )

    def get_order_products(self, obj):
        return OrderProductSerializer(obj.products.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()

    def get_coupon(self, obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
