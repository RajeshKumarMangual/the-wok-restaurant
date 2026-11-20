
from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Contact,Blog,Menu

class RegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password'
        ]       
        
        extra_kward = {
            'password' : {'write_only':True},
        }
        
    def  create(self, validate_data):
        
        user = User.objects.create_user(
            username = validate_data['username'],
            email=validate_data['email'],
            password=validate_data['password'],
        )
        
        return user 
  
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"  
        
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"        
     
     
class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"     
        