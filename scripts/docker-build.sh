#!/bin/bash
docker build --rm --pull -f "./Dockerfile" -t "flarenetwork/flare-price-provider:latest" "."
