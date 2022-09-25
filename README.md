# isec3004-group9

## Demo for:

-   NoSQL Injection
-   DOM Based XSS

## Initial setup:

-   Download and install Docker for your OS `https://www.docker.com/products/docker-desktop/`
-   Install node and npm to OS
-   run `make init`

## Daily dev:

```bash
make dev
Head to: http://localhost:8000/
```

## NoSQL Injection:

```bash
# Injection #1
Visit: http://localhost:8000/login?username=james&password[%24ne]=
```
