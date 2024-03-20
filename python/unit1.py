import unittest
import sys
from io import StringIO
import contextlib
from contextlib import redirect_stdout

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

def newSum(arr):
    s = 0
    for i in arr:
        s += i
    print(s)


class activity1():

    def __init__(self):
        f = StringIO()
        with redirect_stdout(f):
            exec('print("hi")', {'a':  "poopoop"})
            s = f.getvalue().strip()
            self.output =  s
    
        
    def test_activity1(self):
        return self.output == "Test"

    def test_activity2(self):
        self.assertEqual(self.output, "hi", "Incorrect output 1 2")

if __name__ == '__main__':
    temp = activity1()
    print(temp.test_activity1())
    # unittest.main(temp)