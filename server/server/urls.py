"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    # Authentication
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),

    # Contact APIs
    path("contacts/", views.get_contacts, name="get_contacts"),
    path("contacts/create/", views.create_contact, name="create_contact"),
    path("contacts/<int:pk>/", views.get_contact, name="get_contact"),
    path("contacts/<int:pk>/update/", views.update_contact, name="update_contact"),
    path("contacts/<int:pk>/delete/", views.delete_contact, name="delete_contact"),

    # Blog APIs
    path("blogs/", views.get_blogs, name="get_blogs"),
    path("blogs/create/", views.create_blog, name="create_blog"),
    path("blogs/<int:pk>/", views.get_blog, name="get_blog"),
    path("blogs/<int:pk>/update/", views.update_blog, name="update_blog"),
    path("blogs/<int:pk>/delete/", views.delete_blog, name="delete_blog"),
 
    path("menu/", views.menu_list, name="menu_list"),
    path("menu/<int:pk>/", views.menu_detail, name="menu_detail"),


    # Django Admin
    path("admin/", admin.site.urls),
]
