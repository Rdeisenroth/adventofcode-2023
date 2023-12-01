#! /bin/bash

# This script creates the files for a new day in the Advent of Code
# challenge. It takes a single argument, the day number, and creates
# the files for that day. It also creates a Makefile for the day.


# Check that we have a day number
if [ $# -ne 1 ]; then
    echo "Usage: $0 day"
    exit 1
fi

# Check that the day number is valid
if [ $1 -lt 1 -o $1 -gt 25 ]; then
    echo "Day must be between 1 and 25"
    exit 1
fi

# Create the files
day=$(printf "%02d" $1)

# source file
mkdir -p src/$day
# copy the template from src/template/dayXX.ts to src/$day/day$day.ts
cp src/template/dayXX.ts src/$day/day$day.ts
# replace "XX" or "template" with "$day"
sed -i "s/XX/$day/g; s/template/$day/g" src/$day/day$day.ts
# replace "day = 1;" with "day = $day;"
sed -i "s/day = 1;/day = $1;/" src/$day/day$day.ts

# Data files
mkdir -p data
mkdir -p data_test
touch data/day$day.txt
touch data_test/day$day.txt

# test file
mkdir -p test/$day
# copy the template from test/template/index.ts to test/$day/index.ts
cp test/template/index.ts test/$day/index.ts
# replace "XX" or "template" with "$day"
sed -i "s/XX/$day/g; s/template/$day/g" test/$day/index.ts

# Done
echo "Created files for day $day."
