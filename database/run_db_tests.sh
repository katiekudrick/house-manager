#!/bin/bash
# to run in command line: ./run_db_tests.sh

# delete old test database
rm database.db

# recreate empty tables for test database
python3 tables.py

# run tests
cd ..

python3 database/tests_db.py

