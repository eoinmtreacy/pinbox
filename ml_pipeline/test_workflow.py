def satisfy(x, y):
    return x == y 

def test_satisfy():
    assert satisfy(1, 1) == True
    assert satisfy(1, 2) == False