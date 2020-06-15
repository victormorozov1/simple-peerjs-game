from flask_socketio import emit, join_room, leave_room
from .. import socketio
from .classes import User
from . import users


@socketio.on('join', namespace='/')
def join(data):
    peer_id = data['peer_id']
    new_user = User(peer_id)
    print('new user joined: ', new_user)

    emit('all_users', {'all_users': [user.data() for user in users]})

    join_room(0)


