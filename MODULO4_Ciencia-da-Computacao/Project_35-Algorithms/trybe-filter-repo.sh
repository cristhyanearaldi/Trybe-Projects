### GIT FILTER-REPO ###

 ## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
 ## Esse script foi feito para uso do
 ## script 'publisher.sh' fornecido 
 ## pela Trybe. 

 [[ $# == 1 ]] && \
 [[ $1 == "trybe-security-parameter" ]] && \
 git filter-repo \
     --path .trybe \
     --path .github \
     --path trybe.yml \
     --path trybe-filter-repo.sh \
     --path tests/test_anagrams.py \
     --path tests/test_find_the_duplicate.py \
     --path tests/test_palindromes_iterative.py \
     --path tests/test_palindromes_recursive.py \
     --path tests/test_study_schedule.py \
     --path README.md \
     --invert-paths --force