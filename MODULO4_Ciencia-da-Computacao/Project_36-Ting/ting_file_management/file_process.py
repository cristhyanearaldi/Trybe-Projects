from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    file = txt_importer(path_file)
    processedData = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(file),
        "linhas_do_arquivo": file,
    }

    for index in range(len(instance)):
        if instance.search(index)["nome_do_arquivo"] == path_file:
            return None

    instance.enqueue(processedData)
    return sys.stdout.write(str(processedData))


def remove(instance):
    if len(instance) == 0:
        return sys.stdout.write("Não há elementos\n")
    else:
        path_file = instance.dequeue()["nome_do_arquivo"]
        return sys.stdout.write(f"Arquivo {path_file} removido com sucesso\n")


def file_metadata(instance, position):
    try:
        file = instance.search(position)
        return sys.stdout.write(str(file))
    except IndexError:
        return sys.stderr.write("Posição inválida")
