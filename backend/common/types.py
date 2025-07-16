from dataclasses import dataclass
from typing import List
from datetime import datetime

@dataclass
class TaskGroupData:
    title: str
    description: str
    expiration_date: datetime
    status: str
    priority: str
    assignedTo: List[int]