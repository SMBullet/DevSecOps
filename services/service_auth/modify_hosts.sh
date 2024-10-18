#!/bin/sh
# modify_hosts.sh

# Add the entry to /etc/hosts
echo "128.110.217.179 mysql-test" >> /etc/hosts

# Execute the main command (Java application)
exec "$@"
