from inventory_report.inventory.product import Product
import factory

factory.Faker._DEFAULT_LOCALE = "pt_BR"


class ProductFactory(factory.Factory):
    class Meta:
        model = Product

    id = factory.Sequence(int)
    nome_do_produto = factory.Faker("word")
    nome_da_empresa = factory.Faker("company")
    data_de_fabricacao = str(factory.Faker("past_date"))
    data_de_validade = str(factory.Faker("future_date"))
    numero_de_serie = factory.Sequence(int)
    instrucoes_de_armazenamento = factory.Faker("paragraph")
