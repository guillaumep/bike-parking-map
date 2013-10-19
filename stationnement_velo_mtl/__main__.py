import sys
import os
import pymongo

from bottle import route, run, static_file, post, request

dirname = os.path.dirname(__file__)
db = None

@route('/')
def index():
    return static_file("index.html", os.path.join(dirname, "media"))


@post('/submit')
def submit(*args, **kwargs):
    value = db["requests"].insert(dict(
        comment = request.forms.comment,
        purpose = request.forms.purpose,
        lat = request.forms.lat,
        lng = request.forms.lng
    ))
    return {"status": str(value)}

@route('/media/<path:path>')
def callback(path):
    return static_file(path, os.path.join(dirname, "media"))


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        raise Exception("Missing password")
    conn = "mongodb://velomtl:%s@ds049888.mongolab.com:49888/velomtl"
    conn = conn % sys.argv[1]
    db = pymongo.MongoClient(conn)["velomtl"]
    run(host='localhost', port=8080)
