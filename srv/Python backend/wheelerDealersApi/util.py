def checkIfKeyExists(dictionary, key):
    if key in dictionary:
        return True
    return False

def checkIfValueExists(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return None