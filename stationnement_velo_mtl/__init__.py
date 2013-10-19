from bottle import route, run, static_file

@route('/')
def index():
    return static_file("media/index.html")


if __name__ == "__main__":
    run(host='localhost', port=8080)
