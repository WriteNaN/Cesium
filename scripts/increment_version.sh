#!/bin/bash

increment_version() {
    local body=$1
    local version=$(echo "$body" | grep -oE '^Version:\s*(.+)$' | sed -E 's/^Version:\s*(.+)$/\1/')
    local changes=$(echo "$body" | sed -n '/# Changes/,$p' | sed '1d')
    local incremented_version=$(echo "$version" | awk -F. '{$NF++; OFS="."; print $0}')
    echo "$incremented_version"
    echo "$changes"
}

increment_version "$1"
