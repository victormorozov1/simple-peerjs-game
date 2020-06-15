from app import create_app, socketio
from os import environ

app = create_app()

if __name__ == '__main__':
    host = '0.0.0.0'
    port = int(environ.get('PORT', 5000))
    socketio.run(app, host=host, port=port)
