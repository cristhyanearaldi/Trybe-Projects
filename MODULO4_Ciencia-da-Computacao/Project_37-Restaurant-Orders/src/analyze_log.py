import csv


def get_data(path):
    data = []

    with open(path) as file:
        for row in csv.reader(file):
            data.append(row)
        return data


def get_maria_restaurant_orders(data, customer):
    most_ordered = {}

    for row in data:
        if row[0] == customer:
            if row[1] not in most_ordered:
                most_ordered[row[1]] = 1
            else:
                most_ordered[row[1]] += 1

    return max(most_ordered, key=most_ordered.get)


def get_arnaldo_restaurant_orders(data, customer, dish):
    total_orders = {}

    for row in data:
        if row[0] == customer:
            if row[1] not in total_orders:
                total_orders[row[1]] = 1
            else:
                total_orders[row[1]] += 1

    return total_orders[dish]


def get_joao_restaurant_orders(data, customer):
    all_orders = set()
    customer_orders = set()

    for row in data:
        all_orders.add(row[1])
        if row[0] == customer:
            customer_orders.add(row[1])

    return all_orders.difference(customer_orders)


def get_joao_days_never_visited(data, customer):
    open_days = set()
    customer_days = set()

    for row in data:
        open_days.add(row[2])
        if row[0] == customer:
            customer_days.add(row[2])

    return open_days.difference((customer_days))


def analyze_log(path_to_file):
    if not path_to_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")

    try:
        data = get_data(path_to_file)
        maria = get_maria_restaurant_orders(data, 'maria')
        arnaldo = get_arnaldo_restaurant_orders(data, 'arnaldo', 'hamburguer')
        joao_orders = get_joao_restaurant_orders(data, 'joao')
        joao_days = get_joao_days_never_visited(data, 'joao')

        new_file = open('data/mkt_campaign.txt', 'w')
        new_file.write(
            f'{maria}\n'
            f'{arnaldo}\n'
            f'{joao_orders}\n'
            f'{joao_days}\n'
        )

    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")
