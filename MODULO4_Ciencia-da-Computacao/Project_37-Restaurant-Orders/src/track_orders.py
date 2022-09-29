from src.analyze_log import (
    get_maria_restaurant_orders,
    get_joao_restaurant_orders,
    get_joao_days_never_visited,
)


class TrackOrders:
    def __init__(self):
        self._data = []

    def __len__(self):
        return len(self._data)

    def add_new_order(self, customer, order, day):
        self._data.append([customer, order, day])

    def get_most_ordered_dish_per_customer(self, customer):
        return get_maria_restaurant_orders(self._data, customer)

    def get_never_ordered_per_customer(self, customer):
        return get_joao_restaurant_orders(self._data, customer)

    def get_days_never_visited_per_customer(self, customer):
        return get_joao_days_never_visited(self._data, customer)

    def get_busiest_day(self):
        pass

    def get_least_busy_day(self):
        pass
