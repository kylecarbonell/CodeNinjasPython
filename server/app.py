from flask import Flask, jsonify, request
import sys
from io import StringIO
import json
from tkinter import *
from ast import literal_eval

import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout

app = Flask(__name__)




@app.route("/test", methods=['GET', 'POST'])
def test():
    data = json.loads(request.data)
    print(data['code'])

    loc = {}
    # exec(code, None, loc)
    # print(loc['ab'])
    # print(loc['b'])

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

@app.route('/execute', methods=["GET", "POST"])
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
    

if __name__ == '__main__':
    app.run()