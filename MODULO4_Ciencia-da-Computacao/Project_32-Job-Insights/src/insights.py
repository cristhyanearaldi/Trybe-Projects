from src import jobs


def get_unique_job_types(path):
    jobs_list = jobs.read(path)

    job_types = {job["job_type"] for job in jobs_list}

    return job_types


def filter_by_job_type(jobs, job_type):
    filtered_jobs = [job for job in jobs if job["job_type"] == job_type]

    return filtered_jobs


def get_unique_industries(path):
    industries_list = jobs.read(path)

    industries = {
        industry["industry"] for industry in industries_list
        if industry["industry"]
    }

    return industries


def filter_by_industry(jobs, industry):
    filtered_industries = [
        data for data in jobs if data["industry"] == industry
    ]

    return filtered_industries


def get_max_salary(path):
    jobs_list = jobs.read(path)

    max_salaries = max([
        int(salary["max_salary"]) for salary in jobs_list
        if salary["max_salary"].isdigit()
    ])

    return max_salaries


def get_min_salary(path):
    jobs_list = jobs.read(path)

    min_salaries = min([
        int(salary["min_salary"]) for salary in jobs_list
        if salary["min_salary"].isdigit()
    ])

    return min_salaries


def matches_salary_range(job, salary):
    if (
        "max_salary" not in job
        or "min_salary" not in job
        or not isinstance(job["max_salary"], int)
        or not isinstance(job["min_salary"], int)
        or not isinstance(salary, int)
        or job["max_salary"] < job["min_salary"]
    ):
        raise ValueError

    if job["max_salary"] >= salary >= job["min_salary"]:
        return True
    else:
        return False


def filter_by_salary_range(jobs, salary):
    filtered_salaries = [
        job for job in jobs
        if (
            isinstance(job["max_salary"], int)
            and isinstance(job["min_salary"], int)
            and isinstance(salary, int)
            and int(job["max_salary"]) >= salary >= int(job["min_salary"])
        )
    ]

    return filtered_salaries
