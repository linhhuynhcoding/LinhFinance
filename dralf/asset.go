package schemas

type AssetRecord struct {
	Id     string
	Type   TypeAsset
	Name   string
	Amount int64 // VND * 1000
	Date   string
	Note   string
}

type TypeAsset string

const (
	ASSET_CASH               TypeAsset = "CASH"
	ASSET_INVEST             TypeAsset = "INVEST"
	ASSET_PROPERTY           TypeAsset = "PROPERTY"
	ASSET_PROPETTY_WITH_LOAN TypeAsset = "PROPETTY_WITH_LOAN"
	ASSET_OTHER              TypeAsset = "OTHER"
)
