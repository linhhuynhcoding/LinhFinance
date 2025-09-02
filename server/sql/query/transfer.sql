-- name: CreateTransfer :one
INSERT INTO transfer (from_account_id, to_account_id, amount, notes, date, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
RETURNING *;

-- name: GetTransfer :one
SELECT * FROM transfer WHERE id = $1 LIMIT 1;

-- name: ListTransfers :many
SELECT * FROM transfer ORDER BY date DESC;

-- name: DeleteTransfer :exec
DELETE FROM transfer WHERE id = $1;
