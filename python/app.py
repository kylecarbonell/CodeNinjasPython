from flask import Flask, jsonify, request
import sys
from io import StringIO
import json
from tkinter import *

import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout

from routes import main


def create_app():
    app = Flask(__name__)
    app.register_blueprint(main)
    return app


