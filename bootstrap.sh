#!/usr/bin/env bash

repo_dir="$( cd "$(dirname "${BASH_SOURCE[0]}")" && pwd )"

attach() {
    plane_path="$( find ~/.vscode/extensions -maxdepth 1 -type d -name 'plane*' )"
    if [[ "$plane_path" ]]; then
        plane_dir="$( basename "$plane_path" )"
        mkdir -p ~/.vscode/extensions/disabled
        mv "$plane_path" ~/.vscode/extensions/disabled/"$plane_dir"
    fi
    ln -s "$repo_dir" ~/.vscode/extensions/plane
}

eject() {
    rm -f ~/.vscode/extensions/plane
    if [ -d ~/.vscode/extensions/disabled ]; then
        disabled_path="$( find ~/.vscode/extensions/disabled -maxdepth 1 -type d -name 'plane*' )"
        plane_dir="$( basename "$disabled_path" )"
        mv "$disabled_path" ~/.vscode/extensions/"$plane_dir"
        rm -r ~/.vscode/extensions/disabled
    fi
}

case "$1" in
    attach)
        attach
        ;;
    eject)
        eject
        ;;
esac
