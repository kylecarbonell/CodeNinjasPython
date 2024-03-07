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


class activity1(unittest.TestCase):
    def setUp():
        f = StringIO()
        with redirect_stdout(f):
            exec('print("hi")', {'a':  "poopoop"})
            s = f.getvalue().strip()
            return s
    def test_activity1(self):
            s = self.setUp()
            self.assertEqual(s, "hs", "Incorrect output 1")

    def test_activity2(self):
        f = StringIO()
        with redirect_stdout(f):
            exec('print("hi")', {'a':  "poopoop"})
            s = f.getvalue().strip()
            self.assertEqual(s, "hi", "Incorrect output 1 2")

if __name__ == '__main__':
    unittest.main(activity1())