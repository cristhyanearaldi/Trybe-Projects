SELECT 
	user.name AS usuario,
  IF(MAX(history.date_song_played) LIKE '2021%', 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
FROM 
	SpotifyClone.users AS user
INNER JOIN SpotifyClone.history AS history
	ON user.user_id = history.user_id
GROUP BY usuario
ORDER BY usuario;