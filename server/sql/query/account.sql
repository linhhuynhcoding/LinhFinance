-- name: CreateAccount :one
INSERT INTO account (name, type, balance, currency, created_at, updated_at)
VALUES ($1, $2, COALESCE($3, 0), COALESCE($4, 'VND'), NOW(), NOW())
RETURNING *;

-- name: GetAccount :one
SELECT * FROM account WHERE id = $1 LIMIT 1;

-- name: ListAccounts :many
SELECT * FROM account ORDER BY id;

-- name: UpdateAccount :one
UPDATE account
SET name = $2, type = $3, balance = $4, currency = $5, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteAccount :exec
DELETE FROM account WHERE id = $1;
