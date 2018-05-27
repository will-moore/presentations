#!/bin/sh
blitz_log="/opt/omero/server/OMERO.server/var/log/Blitz-0.log"
grep "$(date +%Y-%m-%d)" $blitz_log | grep -q ERROR && \
grep "$(date +%Y-%m-%d)" $blitz_log                    \
| grep ERROR                                           \
| grep -Ev 'memo|Unknown\ target|Forced to reload'     \
| cut -d ")" -f 2- | cut -d "@" -f1                    \
| sort | uniq -c | sort -rn                            \
| mail -s 'OMERO server daily ERROR roundup' your-admin@your-institution.tld
