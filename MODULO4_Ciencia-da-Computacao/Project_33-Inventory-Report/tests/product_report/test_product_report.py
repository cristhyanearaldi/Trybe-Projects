from inventory_report.inventory.product import Product


def test_relatorio_produto():
    product_report = Product(
        "1",
        "Nicotine Polacrilex",
        "Target Corporation",
        "2020-02-18",
        "2022-09-17",
        "CR25 1551 4467 2549 4402 1",
        "instrucao 1",
    )
    assert repr(product_report) == (
        "O produto Nicotine Polacrilex "
        "fabricado em 2020-02-18 "
        "por Target Corporation com validade "
        "até 2022-09-17 "
        "precisa ser armazenado instrucao 1."
    )
