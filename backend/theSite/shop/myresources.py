from import_export import resources, fields
from .models import Order

class OrderResource(resources.ModelResource):
    user_name = fields.Field(attribute='get_user_name', column_name='User_Name')
    product_names = fields.Field(attribute='get_product_names', column_name='Products')
    shipping_address = fields.Field(column_name='Shipping_Address', attribute='get_shipping_address')



    class Meta:
        model = Order
        fields =  ("id", "user_name", "ref_code", "product_names", "start_date", "ordered_date", "ordered", "shipping_address", "coupon", "being_delivered", "received")
        export_order = ("id", "user_name", "ref_code", "product_names", "start_date", "ordered_date", "ordered", "shipping_address", "coupon", "being_delivered", "received")

    def dehydrate_user_name(self, order):
        return order.get_user_name()

    def dehydrate_shipping_address(self, order):
        if order.shipping_address:
            return f"{order.shipping_address.street_address}, {order.shipping_address.house_address}, {order.shipping_address.country}, {order.shipping_address.zip}"
        else:
            return ""

    def dehydrate_product_names(self, order):
        return ", ".join(order.get_product_names())

    def export(self, queryset=None, *args, **kwargs):
        print("Export method called")
        dataset = super().export(queryset=queryset, *args, **kwargs)
        print("Exported dataset:", dataset)
        return dataset    
