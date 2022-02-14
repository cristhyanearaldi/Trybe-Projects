SELECT 
	t1.name AS usuario, 
  COUNT(t2.song_id) AS qtde_musicas_ouvidas, 
  ROUND(SUM(t3.duration_seconds / 60), 2) AS total_minutos
FROM 
  SpotifyClone.users AS t1
INNER JOIN SpotifyClone.history AS t2
  ON t1.user_id = t2.user_id
INNER JOIN SpotifyClone.songs AS t3
  ON t2.song_id = t3.song_id
GROUP BY usuario
ORDER BY usuario;