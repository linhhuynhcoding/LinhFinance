-- name: CreateIncome :one
INSERT INTO income (type_id, title, amount, account_id, purpose_id, notes, date, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
RETURNING *;

-- name: GetIncome :one
SELECT * FROM income WHERE id = $1 LIMIT 1;

-- name: ListIncomes :many
SELECT * FROM income ORDER BY date DESC;

-- name: UpdateIncome :one
UPDATE income
SET type_id = $2, title = $3, amount = $4, account_id = $5,
    purpose_id = $6, notes = $7, date = $8, updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteIncome :exec
DELETE FROM income WHERE id = $1;

-- name: CreateIncomeType :one
INSERT INTO income_type (name, description)
VALUES ($1, $2)
RETURNING *;

-- name: GetIncomeType :one
SELECT * FROM income_type WHERE id = $1 LIMIT 1;

-- name: ListIncomeTypes :many
SELECT * FROM income_type ORDER BY id;

-- name: UpdateIncomeType :one
UPDATE income_type
SET name = $2, description = $3
WHERE id = $1
RETURNING *;

-- name: DeleteIncomeType :exec
DELETE FROM income_type WHERE id = $1;

-- name: CreateIncomeTag :one
INSERT INTO income_tag (name) VALUES ($1) RETURNING *;

-- name: GetIncomeTag :one
SELECT * FROM income_tag WHERE id = $1 LIMIT 1;

-- name: ListIncomeTags :many
SELECT * FROM income_tag ORDER BY id;

-- name: DeleteIncomeTag :exec
DELETE FROM income_tag WHERE id = $1;

-- name: AddTagToIncome :exec
INSERT INTO income_tag_map (income_id, tag_id) VALUES ($1, $2)
ON CONFLICT DO NOTHING;

-- name: RemoveTagFromIncome :exec
DELETE FROM income_tag_map WHERE income_id = $1 AND tag_id = $2;

-- name: ListTagsByIncome :many
SELECT it.* FROM income_tag_map itm
JOIN income_tag it ON itm.tag_id = it.id
WHERE itm.income_id = $1;
