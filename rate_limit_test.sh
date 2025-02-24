#!/bin/bash

for i in {1..20}
do
   curl -i http://localhost:5000/api/v1/country/list
   echo "\n--- Request $i ---\n"
done
