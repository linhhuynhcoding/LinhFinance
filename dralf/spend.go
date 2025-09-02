package schemas

type Spend struct {
	Id     string
	Type   TypeSpend
	Name   string
	Amount int64 // VND * 1000
	Date   string
	Year   int64
	Note   string
}

type SpendPlanning struct {
	Id     string
	Type   TypeSpend
	Amount int64 // VND * 1000
	Year   int64
	Note   string
}

type TypeSpend string

const (
	FOOD           TypeSpend = "FOOD"
	STUDY          TypeSpend = "STUDY"
	HOUSING        TypeSpend = "HOUSING"
	TRANSPORTATION TypeSpend = "TRANSPORTATION"
	ORTHER         TypeSpend = "ORTHER"

	BIG_FAMILY   TypeSpend = "BIG_FAMILY"
	SMALL_FAMILY TypeSpend = "SMALL_FAMILY"
	CHILDREN     TypeSpend = "CHILDREN"
)
