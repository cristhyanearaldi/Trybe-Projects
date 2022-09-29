from inventory_report.reports.simple_report import SimpleReport
from collections import Counter


class CompleteReport(SimpleReport):

    @staticmethod
    def get_products_quantity(inventory_data):
        response = ""

        products_quantity = Counter(
          company["nome_da_empresa"] for company in inventory_data
        )
        for company, count in products_quantity.items():
            response += f"- {company}: {count}\n"
        return response

    @classmethod
    def generate(cls, inventory_data):
        simple_report = SimpleReport.generate(inventory_data)
        quantity = CompleteReport.get_products_quantity(inventory_data)
        return (
            f"{simple_report}\n"
            f"Produtos estocados por empresa:\n"
            f"{quantity}"
        )
