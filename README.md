# ISEC3004 Group 9

### Demo for:

-   NoSQL Injection
-   DOM Based XSS

# For lecturer / testing

### Build:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Run `make -i docker-build`
-   Go to: `http://localhost:8001/`

### NoSQL Injection:

-   Enter `james` as the username
-   Enter `{ "$ne": "" }` as the password

# For developers

### Initial setup:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Install node and npm
-   Run `make init`

### Daily dev:

-   Run `make dev`
-   Go to: `http://localhost:8000/`
-   Click `/seed-data` to create dummy data and fake accounts
