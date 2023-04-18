# Frontend

This repository consists of two angular applications:
- [admin UI](https://github.com/YangCatalog/frontend/tree/master/admin-ui)
- [yangcatalog UI](https://github.com/YangCatalog/frontend/tree/master/yangcatalog-ui)

In addition, it also contains some static web content for [yangcatalog.org](https://yangcatalog.org/).

## NGINX Configuration

Server Side Includes must be enabled for the static page to work (mainly to have similar header and footer).

```
location / {
       # Allows for server side includes
       ssi on ;
       ssi_last_modified on ;
}
```

## SSL Certificate Renewing

**NOTE**: to switch to the `yang` user use the following command: `sudo su - yang`, to go back to your sudo user: `su your_sudo_user_name`

1. **(as sudo user)** Ssh into the production machine: `ssh yc-prod`
2. **(as yang user)** Stop running containers because port 80 has to be free: `cd /home/yang/deployment && ./k8s-full-delete.sh`
3. **(as sudo user)** Use the following command: `sudo certbot certonly --standalone` and enter the following domain names:
   `yangcatalog.org,www.yangcatalog.org,yangvalidator.com,www.yangvalidator.com`
   - after executing this command, something like this should be displayed:
   ```
   Successfully received certificate.
   Certificate is saved at: /etc/letsencrypt/live/yangcatalog.org-0003/fullchain.pem
   Key is saved at:         /etc/letsencrypt/live/yangcatalog.org-0003/privkey.pem
   This certificate expires on 2023-07-17.
   ```
4. **(as yang user)** Start the PROD, so it is not down while the frontend image is being rebuilt: `cd /home/yang/deployment && ./k8-deploy.sh`
   - some pods might fail/restart for several minutes, it's okay
5. **(as sudo user)** Copy `fullchain.pem` and `privkey.pem` files (using the directory from the result of the 3rd step) into the `deployment/resources/`:
   - `sudo cp /etc/letsencrypt/live/yangcatalog.org-0003/fullchain.pem /home/yang/deployment/resources/fullchain.pem`
   - `sudo cp /etc/letsencrypt/live/yangcatalog.org-0003/privkey.pem /home/yang/deployment/resources/privkey.pem`
6. **(as yang user)** Rebuild the frontend image: `docker-compose build --no-cache frontend`
   - in case of such an error: `ERROR: Service 'frontend' failed to build: cgroups: cgroup mountpoint does not exist: unknown`
   run the following command: `sudo mkdir /sys/fs/cgroup/systemd && sudo mount -t cgroup -o none,name=systemd cgroup /sys/fs/cgroup/systemd`
7. **(as yang user)** Upload rebuilt Docker image: `cd /home/yang/deployment && ./k8s-push-images.sh`
8. **(as yang user)** Stop the currently running pods: `cd /home/yang/deployment && ./k8s-full-delete.sh`
9. **(as yang user)** Deploy the updated image: `cd /home/yang/deployment && ./k8-deploy.sh`
