import os

from bottle import route, run, static_file, post, request

dirname = os.path.dirname(__file__)

@route('/')
def index():
    return static_file("index.html", os.path.join(dirname, "media"))

@post('/submit')
def submit(*args, **kwargs):
    request.forms.comment
    request.forms.purpose
    return {}


@route('/media/<path:path>')
def callback(path):
    return static_file(path, os.path.join(dirname, "media"))


if __name__ == "__main__":
    run(host='localhost', port=8080)
