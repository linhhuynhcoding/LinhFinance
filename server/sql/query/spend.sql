-- name: CreateSpend :one
INSERT INTO spend (type_id, title, amount, account_id, purpose_id, notes, date, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
RETURNING *;

-- name: GetSpend :one
SELECT * FROM spend WHERE id = $1 LIMIT 1;

-- name: ListSpends :many
SELECT * FROM spend ORDER BY date DESC;

-- name: UpdateSpend :one
UPDATE spend
SET type_id = $2, title = $3, amount = $4, account_id = $5,
    purpose_id = $6, notes = $7, date = $8, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteSpend :exec
DELETE FROM spend WHERE id = $1;

-- name: CreateSpendType :one
INSERT INTO spend_type (name, description)
VALUES ($1, $2)
RETURNING *;

-- name: GetSpendType :one
SELECT * FROM spend_type WHERE id = $1 LIMIT 1;

-- name: ListSpendTypes :many
SELECT * FROM spend_type ORDER BY id;

-- name: UpdateSpendType :one
UPDATE spend_type
SET name = $2, description = $3
WHERE id = $1
RETURNING *;

-- name: DeleteSpendType :exec
DELETE FROM spend_type WHERE id = $1;

-- name: CreateSpendTag :one
INSERT INTO spend_tag (name) VALUES ($1) RETURNING *;

-- name: GetSpendTag :one
SELECT * FROM spend_tag WHERE id = $1 LIMIT 1;

-- name: ListSpendTags :many
SELECT * FROM spend_tag ORDER BY id;

-- name: DeleteSpendTag :exec
DELETE FROM spend_tag WHERE id = $1;

-- name: AddTagToSpend :exec
INSERT INTO spend_tag_map (spend_id, tag_id) VALUES ($1, $2)
ON CONFLICT DO NOTHING;

-- name: RemoveTagFromSpend :exec
DELETE FROM spend_tag_map WHERE spend_id = $1 AND tag_id = $2;

-- name: ListTagsBySpend :many
SELECT st.* FROM spend_tag_map stm
JOIN spend_tag st ON stm.tag_id = st.id
WHERE stm.spend_id = $1;
