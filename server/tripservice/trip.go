package trip

import (
	trippb "coolcar/proto/gen/go"
	"golang.org/x/net/context"
)

//type TripServiceClient interface {
//	GetTrip(context.Context, *GetTripRequest) (*GetTripResponse, error)
//GetTrip(context.Context, *GetTripRequest) (*Trip, error)
//}

// Service implements trip service.

type Service struct {
}

func (s *Service) MustEmbedUnimplementedTripServiceServer() {
	// 在这里实现未实现的方法
	// 这个方法的实现可以是空的，或者是一个 panic，因为它不会被调用到
}

func (s *Service) GetTrip(ctx context.Context, req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id: req.Id,
		Trip: &trippb.Trip{
			Start:       "abc",
			End:         "def",
			DurationSec: 3600,
			FeeCent:     10000,
			StartPos: &trippb.Location{
				Latitude:   30,
				Longtitude: 120,
			},
			EndPos: &trippb.Location{
				Latitude:   35,
				Longtitude: 115,
			},
			PathLocations: []*trippb.Location{
				{
					Latitude:   31,
					Longtitude: 119,
				},
				{
					Latitude:   32,
					Longtitude: 118,
				},
			},
			Status: trippb.TripStatus_IN_PROGRESS,
		},
	}, nil

	ctx.Err()
	//TODO implement me
	panic("implement me")
}
