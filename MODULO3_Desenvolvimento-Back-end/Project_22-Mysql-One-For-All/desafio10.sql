SELECT
	song.name AS nome,
  COUNT(DISTINCT history.user_id) AS reproducoes
FROM 
	SpotifyClone.songs AS song
INNER JOIN SpotifyClone.history AS history
	ON song.song_id = history.song_id
INNER JOIN SpotifyClone.users AS user
	ON history.user_id = user.user_id
WHERE 
	user.plan_id = 1 OR user.plan_id = 3
GROUP BY song.name
ORDER BY nome;