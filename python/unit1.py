import unittest
import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout
from pymongo import MongoClient

import os
from dotenv import load_dotenv

class Activity():
    def __init__(self, code="", output="", tests="", link=""):
        load_dotenv()
        uri = os.getenv("REACT_APP_MONGO_CON")
        client = MongoClient(uri)

        db = client['Testcases']
        col = db["Activity"]

        
        self.code = code
        self.output = self.formatOutput(output)
        self.tests = col.find_one({"name" : link})

        print(self.tests)

    def getRawString(self,string):
        return string.encode('unicode-escape').decode().replace('\\\\', '\\')

    def formatOutput(self, string):
        temp = string.split("\n")
        s = ""
        print(temp)
        for i in temp:
            s += i.strip() + "\n"

        
        return s
        
    def outputTest(self):
        print("HEREING 1: ", self.getRawString(self.tests['Output']))
        print("HEREING 2: ", self.output)

        if(self.tests["Output"] == ""):
            return True
        return self.tests["Output"] in self.output

    def codeTest(self):  
        return self.tests["Code"] in self.code

    def parameterTest(self):
        if self.tests["Parameter"] == "":
            return True
        return True

    def serialize(self):
        return {
            "Test 1": self.outputTest(),
            "Test 2": self.codeTest(),
            "Test 3": self.parameterTest()
        }
    
