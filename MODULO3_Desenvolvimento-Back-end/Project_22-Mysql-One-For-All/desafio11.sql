SELECT 
	song.name AS nome_musica,
  (CASE
		WHEN song.name LIKE '%Streets' THEN REPLACE(song.name, 'Streets', 'Code Review')
    WHEN song.name LIKE '%Her Own' THEN REPLACE(song.name, 'Her Own', 'Trybe')
    WHEN song.name LIKE '%Inner Fire' THEN REPLACE(song.name, 'Inner Fire', 'Project')
    WHEN song.name LIKE '%Silly' THEN REPLACE(song.name, 'Silly','Nice')
    WHEN song.name LIKE '%Circus' THEN REPLACE(song.name, 'Circus','Pull Request')
	END) 
    AS novo_nome
FROM SpotifyClone.songs AS song
WHERE 
	song.name LIKE '%Streets'
	OR song.name LIKE '%Her Own'
  OR song.name LIKE '%Inner Fire'
  OR song.name LIKE '%Silly'
  OR song.name LIKE '%Circus' 
ORDER BY nome_musica;

/*Source: https://www.w3schools.com/sql/func_mysql_replace.asp*/