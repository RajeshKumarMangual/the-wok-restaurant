from django.db import models


class Contact(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("closed", "Closed"),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    # New Fields
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    person_count = models.PositiveIntegerField(null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
class Blog(models.Model):
    CATEGORY_CHOICES = [
        ("signature-dishes", "Signature Dishes"),
        ("chef-specials", "Chef Specials"),
        ("breakfast", "Breakfast"),
        ("lunch", "Lunch"),
        ("dinner", "Dinner"),
        ("desserts", "Desserts"),
        ("beverages", "Beverages"),
        ("food-tips", "Food Tips"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    tags = models.JSONField(default=list, blank=True)
    image_url = models.URLField(max_length=500)
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title    
    

class Menu(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name  