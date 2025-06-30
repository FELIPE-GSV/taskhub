from django.db import models

class StatusTask(models.IntegerChoices):
    TO_DO = 1, ("A fazer")
    IN_PROGRESS = 2, ("Em andamento")
    DONE = 3, ("Concluído")
    
class PriorityTaskEnum(models.IntegerChoices):
    LOW = 1, ("Baixa")
    MEDIUM = 2, ("Média")
    HIGH = 3, ("Alta")