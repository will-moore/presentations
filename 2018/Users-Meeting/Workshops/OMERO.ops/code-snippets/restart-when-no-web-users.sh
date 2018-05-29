# Run as root user, if OMERO.web is controlled via systemd
# Ignoring the user public-user, and the sysadmin
for ((c=1; c<=1440; c++)); do \
sleep 60 && sudo -u omero-web /opt/omero/web/OMERO.web/bin/omero sessions who   \
| grep -Ev public-user\|sysadmin-account\|guest\|root\|name\|----\|rows | grep -i web | wc -l  \
| grep "\b0" && systemctl restart omero-web.service && echo "restarted web" && break; done;

# For a public-user-only server: (i.e. only look at "public-user" sessions)
# Restarting when there are only sessions with 2 digit hitcounts (small one-off requests, like monitoring)
for ((c=1; c<=1440; c++)); do \
sleep 60 && sudo -u omero-web /opt/omero/web/OMERO.web/bin/omero sessions who \
| grep -E public-user | awk -F '|' '{print $6}' | grep -Pv '\b\d\d\b' | wc -l | grep "\b0" \
&& systemctl restart omero-web && break; done; 
