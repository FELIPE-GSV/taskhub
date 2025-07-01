
from django.utils import timezone
def datahora_local_atual():
    return timezone.localtime(timezone.now(), timezone.get_current_timezone())