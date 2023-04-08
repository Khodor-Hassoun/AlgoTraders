import django
from django.apps import apps
from django.contrib import admin
from django.contrib.auth.models import User, Group


admin.site.unregister(User)
admin.site.unregister(Group)

class ListAdminMixin:
    def __init__(self, model: django.db.models.base.ModelBase, admin_site: django.contrib.admin.sites.AdminSite):
        self.list_display = [field.name for field in model._meta.fields]
        super(ListAdminMixin, self).__init__(model=model, admin_site=admin_site)


models = apps.get_app_config("movie").get_models()
for model in models:
    admin_class = type("AdminClass", (ListAdminMixin, admin.ModelAdmin), {})
    try:
        admin.site.register(model, admin_class)
    except admin.sites.AlreadyRegistered:
        pass
