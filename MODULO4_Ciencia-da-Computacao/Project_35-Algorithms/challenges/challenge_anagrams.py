def is_anagram(first_string, second_string):
    string_one = first_string.lower()
    list_one = list(string_one)

    string_two = second_string.lower()
    list_two = list(string_two)

    if len(list_one) != len(list_two):
        return False

    for index in list_one:
        if index in list_two:
            list_two.remove(index)
        else:
            return False
    return True
