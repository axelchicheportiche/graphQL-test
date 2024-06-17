#!/usr/bin/env bash

BASE_URL="https://cdn.rebrickable.com/media/downloads"
DB_NAME="db.sqlite"

CSV_FILES=(
    themes
    colors
    part_categories
    parts
    part_relationships
    elements
    sets
    minifigs
    inventories
    inventory_parts
    inventory_sets
    inventory_minifigs
) 

# We check if sqlite is intalled 
if ! command -v sqlite3 &> /dev/null; then
    echo "sqlite3 could not be found. Please install sqlite3 to proceed."
    exit 1
fi

# Download all the required csv files from rebrickable



function download_csvs() {
  echo "Downloading CSVs to the current directory..."
    curl --progress-bar "$BASE_URL/{$(IFS=, ; echo "${CSV_FILES[*]}")}.csv.gz" -o "#1.csv.gz" 
    gzip -df *.csv.gz
}

echo "Do you wish to download the latest csv definitions from Rebrickable?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) download_csvs; break;;
        No ) break;;
    esac
done


# We check if database already exists

if [ -f "$DB_NAME" ]; then
    echo "Database $DB_NAME already exists."
else
    echo "Creating database $DB_NAME."
    sqlite3 "$DB_NAME" "VACUUM;"
fi

# Loop over all the csv files

for csv_file in *.csv; do
    if [ -f "$csv_file" ]; then
        table_name=$(basename "$csv_file" .csv)
        echo "Importing $csv_file into $DB_NAME as table $table_name."
        # Import the CSV data into the table
        sqlite3 "$DB_NAME" ".mode csv" ".import $csv_file $table_name"
    else
        echo "No CSV files found."
    fi
done

echo "Database setup complete !"