package service

import (
	"context"

	"github.com/linhhuynhcoding/LinhFinance/internal/repository"
	"github.com/linhhuynhcoding/LinhFinance/pkg/config"
	"go.uber.org/zap"
)

type Adapter struct {
}

type Service struct {
	logger  *zap.Logger
	cfg     config.Config
	queries repository.Store

	adapter *Adapter
}

func NewService(ctx context.Context, logger *zap.Logger, cfg config.Config, store repository.Store) *Service {
	return &Service{
		logger:  logger,
		cfg:     cfg,
		queries: store,
		adapter: &Adapter{},
	}
}
