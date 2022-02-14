SELECT 
	artist.name AS artista,
  album.name AS album
FROM 
	SpotifyClone.artists AS artist
INNER JOIN SpotifyClone.albums AS album
	ON artist.artist_id = album.artist_id
WHERE artist.name = 'Walter Phoenix'
ORDER BY album;