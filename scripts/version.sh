#!/bin/bash

extract_version_and_changes() {
    local body=$1
    local version=$(echo "$body" | grep -oE '^Version:\s*(.+)$' | sed -E 's/^Version:\s*(.+)$/\1/')
    local changes=$(echo "$body" | sed -n '/# Changes/,$p' | sed '1d')
    echo "::set-output name=version::$version"
    echo "::set-output name=changes::$changes"
}

extract_version_and_changes "$1"
