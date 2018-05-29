tail -fn0 /opt/omero/server/OMERO.server/var/log/PixelData-0.log | \
while read line ; do
        echo "$line" | grep "ome.conditions.InternalException:  Wrapped Exception: (java.lang.OutOfMemoryError)"
        if [ $? = 0 ]
        then
                sudo -u omero-server /opt/omero/server/OMERO.server/bin/omero admin ice "server stop PixelData-0" && echo $(date) I restarted PixelData process | tee -a ~/command_log.txt
                # Note, server will start up itself, so only need to run "server stop" ------^
        fi
done
