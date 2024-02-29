from flask import Flask, jsonify
import sys
from io import StringIO
app = Flask(__name__)


@app.route("/test", methods=['GET'])
def test():

    
    s = '''
def foo():
    return 3
a = foo()
b=5
ab = print("heelllo")
    '''
    loc = {}
    exec(s, None, loc)
    print(loc['ab'])
    print(loc['b'])

    response = jsonify({"a" : loc['a'], "b" : loc['b']})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()