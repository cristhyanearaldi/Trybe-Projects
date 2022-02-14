SELECT 
	COUNT(history.song_id) AS quantidade_musicas_no_historico
FROM 
  SpotifyClone.history AS history
INNER JOIN SpotifyClone.users AS user
	ON history.user_id = user.user_id
WHERE user.name = 'Bill';