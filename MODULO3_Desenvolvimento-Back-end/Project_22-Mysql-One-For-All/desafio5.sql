SELECT 
	song.name AS cancao,
  COUNT(DISTINCT history.user_id) AS reproducoes
FROM
  SpotifyClone.songs AS song
INNER JOIN SpotifyClone.history AS history
	ON song.song_id = history.song_id
GROUP BY history.song_id
ORDER BY reproducoes DESC, cancao
LIMIT 2;