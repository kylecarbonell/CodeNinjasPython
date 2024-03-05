from datetime import datetime

from flask import Flask, jsonify, request
import sys
from io import StringIO
import json
from tkinter import *

import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout
from waitress import serve



app = Flask(__name__)


@app.route("/test", methods=['GET', 'POST'])
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
            now = datetime.now()
            date = now.strftime("%m/%d/%Y %H:%M:%S")
            exec(code, {'a':  "poopoop"})
            s = f.getvalue()
            res = jsonify({"output": s, "time": date})
            res.headers.add('Access-Control-Allow-Origin', '*')
            return res
    except Exception as e:
        print("THIS IS E ", e)
        res = jsonify({"output": "Error: " + str(e), "time": date})
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res

if __name__ == "__main__":
    # serve(app, host="0.0.0.0", port=8080)
    app.run()

