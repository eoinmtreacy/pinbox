USE DBdev;
-- https://stackoverflow.com/questions/30901462/people-who-liked-this-also-liked-query-in-mysql-php

SELECT also_likes.place_id, COUNT(also_likes.place_id)
FROM userlikes AS did_like
JOIN userlikes AS also_likes
	ON also_likes.user_id = did_like.user_id
    AND also_likes.place_id <> did_like.user_id
WHERE did_like.place_id = 357608159
AND did_like.category_swipe = "love_it"
GROUP BY also_likes.place_id
ORDER BY COUNT(also_likes.place_id) desc
limit 1;