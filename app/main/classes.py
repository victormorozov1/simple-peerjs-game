from . import users
from random import randrange as rd


class User:
    def __init__(self, peer_id):
        self.peer_id = peer_id
        users.append(self)
        self.x = rd(0, 700)
        self.y = rd(0, 600)

    def data(self):
        return {'peer_id': self.peer_id, 'x': self.x, 'y': self.y}

    def __str__(self):
        return f'User peer_id={self.peer_id}, x={self.x}, y={self.y}'

    def __repr__(self):
        return f'<{self}>'
