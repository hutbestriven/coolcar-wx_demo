package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	trip "coolcar/tripservice"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net"
	"net/http"
)

func main() {
	go startGRPCGateWay()
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	var service *trip.Service = &trip.Service{}
	s := grpc.NewServer()
	trippb.RegisterTripServiceServer(s, service)
	log.Fatal(s.Serve(lis))
}

func startGRPCGateWay() {
	log.SetFlags(log.Lshortfile)
	c := context.Background()
	c, cancel := context.WithCancel(c)

	defer cancel()
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseEnumNumbers: true,
				UseProtoNames:  true,
			},
		}))
	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		mux,
		"localhost:8081",
		[]grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())},
	)
	if err != nil {
		log.Fatalf("cannot grpc gateway : %v", err)
	}

	err = http.ListenAndServe("localhost:8080", mux)
	if err != nil {
		log.Fatalf("cannot listen and server : %v", err)
	}
}
