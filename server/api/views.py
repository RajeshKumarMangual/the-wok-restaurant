from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import RegisterSerializer,ContactSerializer,BlogSerializer,MenuSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from api.models import Contact,Blog,Menu


# Create your views here.
@api_view(['POST'])
def register(request):
    
    serData = RegisterSerializer(data=request.data)
    
    if(serData.is_valid()):
        serData.save()
        
        return Response({
            "message":"Regsiter Successfully",
            "user":serData.data
        })
        
    return Response(serData.errors)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(
        username=username,
        password=password
    )
    
    if user:
       
       token, created = Token.objects.get_or_create(user=user) 
       
       return Response({
           "token":token.key,
           "username":user.username,
           "is_superuser": user.is_superuser
       })
    
    return Response({
        "message":"Invalid Cred"
    })
   
@api_view(["POST"])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Contact submitted successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

@api_view(["GET"])
def get_contacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)

    return Response(
        {
            "success": True,
            "count": contacts.count(),
            "data": serializer.data,
        }
    )
    
@api_view(["GET"])
def get_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ContactSerializer(contact)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        }
    )
    
@api_view(["PUT"])
def update_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ContactSerializer(contact, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Contact updated successfully.",
                "data": serializer.data,
            }
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


@api_view(["DELETE"])
def delete_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"success": False, "message": "Contact not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    contact.delete()

    return Response(
        {
            "success": True,
            "message": "Contact deleted successfully.",
        }
    ) 

@api_view(["POST"])
def create_blog(request):
    serializer = BlogSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "success": True,
                "message": "Blog created successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)

    return Response(
        {
            "success": True,
            "count": blogs.count(),
            "data": serializer.data,
        }
    )


@api_view(["GET"])
def get_blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Blog not found.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = BlogSerializer(blog)

    return Response(
        {
            "success": True,
            "data": serializer.data,
        }
    )


@api_view(["PUT"])
def update_blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Blog not found.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = BlogSerializer(blog, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Blog updated successfully.",
                "data": serializer.data,
            }
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Blog not found.",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    blog.delete()

    return Response(
        {
            "success": True,
            "message": "Blog deleted successfully.",
        }
    )


@api_view(["GET", "POST"])
def menu_list(request):
    if request.method == "GET":
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    serializer = MenuSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def menu_detail(request, pk):
    try:
        menu = Menu.objects.get(pk=pk)
    except Menu.DoesNotExist:
        return Response(
            {"error": "Menu item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = MenuSerializer(menu, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    menu.delete()

    return Response(
        {"message": "Menu item deleted successfully"},
        status=status.HTTP_204_NO_CONTENT,
    )