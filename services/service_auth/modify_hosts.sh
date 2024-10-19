#!/bin/sh
# modify_hosts.sh

# Add the entry to /etc/hosts
echo "copying on the file /etc/hosts 128.110.217.179 mysql-test maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan"
echo "128.110.217.179 mysql-test" >> /etc/hosts
echo "finished modifying on /etc/hosts"

# Execute the main command (Java application)
exec "$@"
