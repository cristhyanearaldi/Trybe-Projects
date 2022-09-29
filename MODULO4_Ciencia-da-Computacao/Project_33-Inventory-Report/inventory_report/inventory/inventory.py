import csv
import json
import xmltodict
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    def read_file(path, extension):
        with open(path) as file:
            if extension[1] == "csv":
                csv_reader = list(
                    csv.DictReader(file, delimiter=",", quotechar='"')
                )
                return csv_reader
            elif extension[1] == "json":
                json_reader = json.load(file)
                return json_reader
            elif extension[1] == "xml":
                xml_reader = xmltodict.parse(file.read())["dataset"]["record"]
                return xml_reader

    @classmethod
    def import_data(cls, path, report):
        extension = path.split(".")
        products_list = Inventory.read_file(path, extension)
        if report == "simples":
            return SimpleReport.generate(products_list)
        elif report == "completo":
            return CompleteReport.generate(products_list)
