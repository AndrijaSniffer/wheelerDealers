def checkIfKeyExists(dictionary, key):
    if key in dictionary:
        return True
    return False


def checkIfValueExists(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return None


def safe_int(value):
    try:
        return int(value) if value is not None else None
    except (ValueError, TypeError):
        return None


def reverseBool(value: bool):
    if value:
        return False
    else:
        return True
