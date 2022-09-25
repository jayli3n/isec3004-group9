# ISEC3004 Group 9

### Demo for:

-   NoSQL Injection
-   DOM Based XSS

# For lecturer / testing

### Build:

-   Download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   Run `make -i docker-build`
-   Go to: `http://localhost:8001/`

### NoSQL Injection:

```bash
# Injection #1
Visit: http://localhost:8001/login?username=james&password[%24ne]=
```

# For developers

### Initial setup:

-   Download and install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   Install node and npm
-   Run `make init`

### Daily dev:

-   Run `make dev`
-   Go to: `http://localhost:8000/`
