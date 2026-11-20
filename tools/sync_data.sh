#!/usr/bin/env bash
# Copy the exported study data (scripts/p40_site_export.py in projectFMs/paper1_benchmark) into the site.
set -euo pipefail
SRC=/mnt/data/tusharlab/dataset_dir/output_projectFMs/Paper1_Benchmark/site_data
HERE="$(cd "$(dirname "$0")/.." && pwd)"
rm -rf "$HERE/public/data" && mkdir -p "$HERE/public/data"
cp -r "$SRC"/. "$HERE/public/data/"
mkdir -p "$HERE/src/data"
for f in meta tasks cohorts models task_models setups_index guidance; do cp "$SRC/$f.json" "$HERE/src/data/$f.json"; done
cp "$SRC/cases/cases.json" "$HERE/src/data/cases.json"
echo "synced $(find "$HERE/public/data" -type f | wc -l) files"
