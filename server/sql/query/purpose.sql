-- name: CreatePurpose :one
INSERT INTO purpose (name, description)
VALUES ($1, $2)
RETURNING *;

-- name: GetPurpose :one
SELECT * FROM purpose WHERE id = $1 LIMIT 1;

-- name: ListPurposes :many
SELECT * FROM purpose ORDER BY id;

-- name: UpdatePurpose :one
UPDATE purpose
SET name = $2, description = $3
WHERE id = $1
RETURNING *;

-- name: DeletePurpose :exec
DELETE FROM purpose WHERE id = $1;
