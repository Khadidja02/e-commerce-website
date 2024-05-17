from django.db import models
from django.conf import settings
from django.utils import timezone
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models
class UserAccountManager(BaseUserManager):
    def create_user(self, name, email, password=None,phone=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, name, email, password=None):
        user = self.create_user(name, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user 


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email= models.EmailField(max_length=300, unique= True)
    name= models.CharField(max_length=300)
    
    phone = models.PositiveIntegerField(blank=True, null=True) 
    is_active= models.BooleanField(default= True)
    is_staff = models.BooleanField(default= False)
    date_joined = models.DateTimeField(default=timezone.now)  # Adding date_joined field


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name
    def __str__(self):
        return self.email    


ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)
class Category(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='category/', blank=True, null=True)
    details = models.TextField(blank=True, null=True)

    

    class Meta:
        db_table= 'Categories' 
  
    @staticmethod
    def get_all_categories():
        return Category.objects.all()
  
    def __str__(self):
        return self.name

class Products(models.Model):
    title= models.CharField(max_length=100)
    price= models.FloatField()
    discount_price = models.FloatField(blank=True, null= True)
    category = models.ManyToManyField(Category)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField(upload_to="images/")

    class Meta:
        db_table= 'Product' 

    @staticmethod
    def get_all_products_by_categoryid(category_id):
        if category_id:
            return Products.objects.filter(category=category_id)
        else:
            return Products.get_all_products()     




class OrderProduct(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Products, on_delete= models.CASCADE)
    quantity = models.IntegerField(default=1)


    class Meta:
        db_table= 'OrderProduct'  


    def __str__ (self):
        return f"{self.quantity} of {self.product.title}"

    def get_total_product_price(self):
        return self.quantity * self.product.price 


    def get_total_discount_product_price(self):
        return self.quantity * self.product.discount_price


    def get_amount_saved(self):
        return self.get_total_product_price() - self.get_total_discount_product_price()

    def get_final_price(self):
        if self.product.discount_price:
            return self.get_total_discount_product_price()
        return self.get_total_product_price()  
    def get_product_image(self):
        return self.product.image.url     

class Cart(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    items = models.ManyToManyField('CartItem', related_name='carts', blank=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.title}"

    def get_total_price(self):
        return self.quantity * self.product.price




class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.CASCADE)
    ref_code= models.CharField(max_length=30, blank=True, null=True)
    products = models.ManyToManyField(OrderProduct)
    start_date= models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered= models.BooleanField(default=False)
    shipping_address = models.ForeignKey('Address', related_name='shipping_address', on_delete= models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey('Address', related_name='billing_address', on_delete= models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey('Coupon', on_delete= models.SET_NULL, blank=True, null=True)
    being_delivered= models.BooleanField(default=False)
    received = models.BooleanField(default=False)

    class Meta:
        db_table= 'Order'  


    def __str__(self):
        return  self.user.name

    def get_total(self):
        total = 0
        for order_product in self.products.all():
            total += order_product.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total

    def get_user_name(self):
        return self.user.name


    def get_shipping_address_name(self):
        print("Shipping Address:", self.shipping_address)
        if self.shipping_address:
            address_name = f"{self.shipping_address.street_address}, {self.shipping_address.house_address}, {self.shipping_address.country}, {self.shipping_address.zip}"
            print("Address Name:", address_name)
            return address_name
        else:
            print("No shipping address provided")
            return "No shipping address provided"

    def get_product_names(self):
        return [order_product.product.title for order_product in self.products.all()]


class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.CASCADE)
    street_address= models.CharField(max_length=200)
    house_address= models.CharField(max_length=200) 
    country= CountryField(multiple=False)
    zip = models.CharField(max_length=100)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural= 'Adresses'

    def __str__(self):
        return f"{self.street_address}, {self.house_address}, {self.country}, {self.zip}"    

class AboutUs(models.Model):
    title = models.CharField(max_length=100)
    paragraph = models.TextField()
    q_and_a = models.TextField()
    image = models.ImageField(upload_to='about_us_images/')
class ContactFormSubmission(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()

    def __str__(self):
        return self.code


    class Meta:
        db_table= 'Coupon'    

