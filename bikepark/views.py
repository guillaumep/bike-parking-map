# -*- coding: utf-8 -*-

""" Bottle routes """

import os

from json import dumps

from bottle import route, static_file, post, request, response

dirname = os.path.dirname(__file__)
db = None


@route('/')
def index():
    return static_file("index.html", os.path.join(dirname, "media"))


@route('/favicon.ico')
def favicon():
    return static_file("favicon.ico", os.path.join(dirname, "media"))


@route('/requests')
def requests():
    values = []
    for v in db.requests.find():
        values.append(dict(lat=v["lat"], lon=v["lng"], value=1))
    response.content_type = 'application/json'
    return dumps(values)


@post('/submit')
def submit(*args, **kwargs):
    value = db.requests.insert(dict(
        comment = request.forms.comment,
        purpose = request.forms.purpose,
        lat = request.forms.lat,
        lng = request.forms.lng
    ))
    return {"status": str(value)}


@route('/media/<path:path>')
def callback(path):
    return static_file(path, os.path.join(dirname, "media"))
