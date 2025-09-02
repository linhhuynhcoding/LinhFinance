package schemas

type InvestTargetPerYear struct {
	Id        string
	Type      TypeInvest
	Name      string
	Amount    int64 // VND * 1000
	Year      int64
	Note      string
	APYTarget int64 // % * 100
}

// InvestRecord current investing
type InvestRecord struct {
	Id          string
	Type        TypeInvest
	Name        string
	Amount      int64 // VND * 1000
	Note        string
	APYCurrent  int64
	InvestAsset []InvestAsset
}

type TypeInvest string

const (
	STOCK  TypeInvest = "STOCK"
	BOND   TypeInvest = "BOND"
	CRYPTO TypeInvest = "CRYPTO"
	BANK   TypeInvest = "BANK"
	OTHER  TypeInvest = "OTHER"
)

type InvestAsset struct {
	Name          string
	AssetType     TypeInvest
	CurrentAmount int64 // VND * 1000
	ValueInCash   int64 // VND * 1000
	Note          string
}
