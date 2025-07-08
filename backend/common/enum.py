from django.db import models

class StatusTask(models.IntegerChoices):
    TO_DO = 1, ("A fazer")
    IN_PROGRESS = 2, ("Em andamento")
    DONE = 3, ("Concluído")
    
class PriorityTaskEnum(models.IntegerChoices):
    LOW = 1, ("Baixa")
    MEDIUM = 2, ("Média")
    HIGH = 3, ("Alta")
    
class NotificationTypeEnum(models.IntegerChoices):
    REMINDER = 1, ("Lembrete")
    GROUP_INVITE = 2, ("Convite para grupo")
    GROUP_EVENT = 3, ("Evento no grupo")
    
class PrivacyGroupEnum(models.IntegerChoices):
    PUBLIC = 1, ("Público")
    PRIVATE = 2, ("Privado")
    
class RoleMemberGroupEnum(models.IntegerChoices):
    ADMIN = 1, ("Admin")
    MEMBER = 2, ("Membro")