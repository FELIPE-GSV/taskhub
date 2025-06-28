from django.db import models
from model_utils.fields import AutoCreatedField, AutoLastModifiedField
class TrackableMixin(models.Model):
    created_at = AutoCreatedField(("created_at"), db_index=True, null=True)
    updated_at = AutoLastModifiedField(
        ("updated_at"), db_index=True, null=True
    )
    created_by = models.ForeignKey(
        "common.CustomUser",
        db_column="created_by",
        related_name="created_%(class)s_set",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    updated_by = models.ForeignKey(
        "common.CustomUser",
        db_column="updated_by",
        related_name="updated_%(class)s_set",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    class Meta:
        abstract = True