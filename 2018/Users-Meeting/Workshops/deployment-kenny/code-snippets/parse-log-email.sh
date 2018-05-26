#!/bin/sh
cat /opt/omero/server/OMERO.server/var/log/Blitz-0.log \
| grep "$(date +%Y-%m-%d)" \
| grep ERROR  \
| grep -Ev 'memo|Unknown\ target|Forced to reload' \
| cut -d ")" -f 2- | cut -d "@" -f1 \
| sort | uniq -c | sort -rn \
| mail -s 'OMERO server daily ERROR roundup' your-admin@your-institution.tld
