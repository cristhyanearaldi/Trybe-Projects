SELECT 
	artist.name AS artista,
  album.name AS album,
  COUNT(follower.artist_id) AS seguidores
FROM 
	SpotifyClone.artists AS artist
INNER JOIN SpotifyClone.albums AS album
	ON artist.artist_id = album.artist_id
INNER JOIN SpotifyClone.followers AS follower
	ON artist.artist_id = follower.artist_id
GROUP BY album.album_id
ORDER BY seguidores DESC, artista, album;