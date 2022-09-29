def exists_word(word, instance):
    occurrences = []
    result = []

    for index in range(len(instance)):
        data = instance.search(index)

        for line in range(data["qtd_linhas"]):
            if word in data["linhas_do_arquivo"][line].lower():
                occurrences.append({"linha": line + 1})

        if len(occurrences) > 0:
            result.append({
                "palavra": word,
                "arquivo": data["nome_do_arquivo"],
                "ocorrencias": occurrences,
            })
    return result


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
