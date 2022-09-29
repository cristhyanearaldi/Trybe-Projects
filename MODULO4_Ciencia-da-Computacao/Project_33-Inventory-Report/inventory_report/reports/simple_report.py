from datetime import date


class SimpleReport:

    def get_manufacture(inventory_data):
        manuf = "data_de_fabricacao"
        get_date = min(
            date.fromisoformat(item[manuf])
            for item in inventory_data
        )
        return get_date.isoformat()

    def get_expiration_date(inventory_data):
        expir = "data_de_validade"
        get_date = min(
            date.fromisoformat(item[expir])
            for item in inventory_data
            if date.fromisoformat(item[expir]) >= date.today()
        )
        return get_date.isoformat()

    def get_company(inventory_data):
        name = "nome_da_empresa"
        company_name = [
            item[name] for item in inventory_data
        ]
        return max(set(company_name), key=company_name.count)

    @classmethod
    def generate(cls, inventory_data):
        manufacture = SimpleReport.get_manufacture(inventory_data)
        expiration_date = SimpleReport.get_expiration_date(inventory_data)
        company = SimpleReport.get_company(inventory_data)
        return (
            f"Data de fabricação mais antiga: {manufacture}\n"
            f"Data de validade mais próxima: {expiration_date}\n"
            f"Empresa com mais produtos: {company}"
        )
