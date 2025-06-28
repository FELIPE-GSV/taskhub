from django.db import models

class StatusTask(models.IntegerChoices):
    TO_DO = 1, ("A fazer")
    IN_PROGRESS = 2, ("Em andamento")
    DONE = 3, ("Concluído")