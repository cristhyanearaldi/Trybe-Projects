from src.counter import count_ocurrences


def test_counter():
    assert count_ocurrences("src/jobs.csv", "job") == 3454
    assert count_ocurrences("src/jobs.csv", "salary") == 598
    assert count_ocurrences("src/jobs.csv", "industry") == 1346
