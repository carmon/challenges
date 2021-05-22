#!/bin/bash

OPTIND=1         

printHelp()
{
   echo "Export your git repo to another folder"
   echo
   echo "Syntax: script [-b branch|h|v] repo_folder target_folder"
   echo "options:"
   echo "b     Name of the branch to export. Default is 'main'"
   echo "h     Print this Help."
   echo "v     Verbose mode."
   echo
}

branch_name="main"
verbose=0

while getopts "h?vb:" opt; do
    case "$opt" in
    h|\?)
        printHelp
        exit 0
        ;;
    v)  verbose=1
        ;;
    b)  branch_name=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

from_dir=$1
to_dir=$2

if [ verbose = 1 ]; then
    echo "Git repo exporter"
    echo "================="
    echo "-> Exporting contents in repo with directory $from_dir to directory $to_dir"
    echo 
fi

if [[ -d "$to_dir" ]]
then
    if [ verbose = 1 ]; then 
        echo "-> $to_dir already exists on your filesystem."
        echo
    fi
else
    if [ verbose = 1 ]; 
    then 
        echo "-> $to_dir does not exists on your filesystem, using mkdir"
        echo
        mkdir -v $to_dir
    else
        mkdir $to_dir
    fi
fi

cd $from_dir
git archive $branch_name | tar -x -C ../$to_dir