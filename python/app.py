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

from unit1 import Activity
import json

import asyncio


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

def runCode(code):
    # print("POOOOOOOOOOOOo")

    try:
        f = StringIO()
        with redirect_stdout(f):
            now = datetime.now()
            date = now.strftime("%m/%d/%Y %H:%M:%S")
            exec(code, {'a':  "poopoop"})
            s = f.getvalue()
            return {"output": s, "time": date}
    except Exception as e:
        print("THIS IS E ", e)
        res = {"output": "Error: " + str(e), "time": date}
        return res

@app.route('/execute', methods=["GET", "POST"])
def execute():
    data = json.loads(request.data)
    code = data['code']


    res = jsonify(runCode(code))
    res.headers.add('Access-Control-Allow-Origin', '*')
    
    return res
   

@app.route('/submit', methods=["GET", "POST"])
def submit():
    data = json.loads(request.data)
    code = data['code']
    link = data['link']

    print(code)


    res = runCode(code)['output']
    f = open("python/Test.json")
    tests = json.load(f)[link]

    t = Activity(code=code, output=res, tests=tests, link=link)
    temp = jsonify(t.serialize())
    temp.headers.add('Access-Control-Allow-Origin', '*')


    f.close()
    return temp
    


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8080)
    # app.run()


