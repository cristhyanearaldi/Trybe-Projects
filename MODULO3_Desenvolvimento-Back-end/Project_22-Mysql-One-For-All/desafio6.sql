SELECT 
	MIN(plan.price) AS faturamento_minimo,
  MAX(plan.price) AS faturamento_maximo,
  ROUND(AVG(plan.price), 2) AS faturamento_medio,
  SUM(plan.price) AS faturamento_total
FROM 
	SpotifyClone.plans AS plan
INNER JOIN SpotifyClone.users AS users 
	ON plan.plan_id = users.plan_id;