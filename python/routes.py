from flask import Flask, jsonify, request, Blueprint
import sys
from io import StringIO
import json

import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout

main = Blueprint('main', __name__)

@main.route("/test", methods=['GET', 'POST'])
def test():
    data = json.loads(request.data)
    print(data['code'])

    loc = {}
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

@main.route('/execute', methods=["GET", "POST"])
def execute():
    data = json.loads(request.data)
    code = data['code']
    # print(data)
    # print(code)

    response = {}
    print("before")
    print('in')
    try:
        f = StringIO()
        with redirect_stdout(f):
            # print("HELLO\n")
            exec(code, {'a':  "poopoop"})
            # print("\nDONE")
            s = f.getvalue()
            res = jsonify(s)
            res.headers.add('Access-Control-Allow-Origin', '*')
            return res
    except Exception as e:
        print("THIS IS E ", e)
        res = jsonify("Error: " + str(e))
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res

