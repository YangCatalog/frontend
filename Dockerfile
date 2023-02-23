FROM ubuntu:20.04

ARG YANG_ID
ARG YANG_GID
ARG NGINX_FILES

ENV YANG_ID "$YANG_ID"
ENV YANG_GID "$YANG_GID"
ENV NGINX_FILES "$NGINX_FILES"

RUN echo postfix postfix/mailname string yangcatalog.org | debconf-set-selections
RUN echo postfix postfix/main_mailer_type string 'Internet Site' | debconf-set-selections

RUN set -ex && apt-get update && apt-get install -y --no-install-recommends \
    vim rsync xinetd rsyslog postfix systemd libnginx-mod-http-geoip nginx

RUN apt-get autoremove -y

# Turn off daemon mode
# Reference: http://stackoverflow.com/questions/18861300/how-to-run-nginx-within-docker-container-without-halting
RUN echo "\ndaemon off;" >>/etc/nginx/nginx.conf

# Remove the default configuration
RUN rm /etc/nginx/sites-enabled/default

RUN sed -i '/imklog/s/^/#/' /etc/rsyslog.conf

# Mount volumes
VOLUME ["/etc/nginx/certs", "/etc/nginx/conf.d", "/var/www/html"]

RUN groupadd -g ${YANG_GID} -r yang && useradd --no-log-init -r -g yang -u ${YANG_ID} -m -d /home/yang yang

COPY ./resources/rsync /etc/xinetd.d/rsync
# Enable rsync
RUN sed -i 's/disable[[:space:]]*=[[:space:]]*yes/disable = no/g' /etc/xinetd.d/rsync

RUN /etc/init.d/xinetd restart

RUN mkdir -p /usr/share/nginx/html/assets/
COPY --chown=yang:yang frontend/downloadables /usr/share/nginx/html/downloadables/
COPY --chown=yang:yang yangre/app/static/. /usr/share/nginx/html/assets/.
COPY --chown=yang:yang yang-validator-extractor/static/swagger-yangvalidator.json /usr/share/nginx/html/assets/
COPY --chown=yang:yang conf/nginx/${NGINX_FILES} /etc/nginx/conf.d/

COPY ./resources/main.cf /etc/postfix/main.cf
COPY ./resources/rsyncd.conf /etc/rsyncd.conf

RUN /etc/init.d/xinetd start
RUN ln -s /usr/share/nginx/html/stats/statistics.html /usr/share/nginx/html/statistics.html

RUN chown -R yang:yang /usr/share/nginx/html

CMD /etc/init.d/xinetd start && service postfix start && service rsyslog start && nginx

# Set the current working directory
WORKDIR /var/www/html

# Expose both the HTTP (80) and HTTPS (443) ports
EXPOSE 80 443
