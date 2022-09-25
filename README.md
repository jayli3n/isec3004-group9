# isec3004-group9

### Demo for:

-   NoSQL Injection
-   DOM Based XSS

# For lecturer / testing

### Build: hand in for lecturer:

-   download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   run `make -i docker-build`
-   go to: `http://localhost:8001/`

# For developers

### Initial setup:

-   download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   install node and npm
-   run `make init`

### Daily dev:

-   run `make dev`
-   go to: `http://localhost:8000/`

### NoSQL Injection:

```bash
# Injection #1
Visit: http://localhost:8001/login?username=james&password[%24ne]=
```
