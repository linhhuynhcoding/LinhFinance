package schemas

// INCOME Record (per year)
type Income struct {
	Id     string
	Type   TypeIncome
	Amount int64 // VND * 1000
	Year   int

	SalaryInfo    []SalaryInfo
	BonusInfo     []BonusInfo
	FreelanceInfo []FreelanceInfo
}

// INCOME Target (per year)
type IncomeTarget struct {
	Id string
	Amount int64 // VND * 1000
	Year int
}

type TypeIncome string

const (
	SALARY    TypeIncome = "SALARY"
	BONUS     TypeIncome = "BONUS"
	FREELANCE TypeIncome = "FREELANCE"
)

type SalaryInfo struct {
	Company    string
	Net        int64 // VND * 1000
	Gross      int64
	ReceivedAt string
}

type BonusInfo struct {
	Title      string
	From       string
	Amount     int64 // VND * 1000
	ReceivedAt string
}

type FreelanceInfo struct {
	Title       string
	Amount      int64 // VND * 1000
	WorkingHour *int64
	ReceivedAt  string
}
