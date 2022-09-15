# isec3004-group9

## Demo for:

-   NoSQL Injection
-   DOM Based XSS

## Initial setup:

-   Install node and npm to OS
-   run `npm install`
-   Download and install mongoDB for your OS `https://www.mongodb.com/try/download/community`
-   Create db folder for MongoDB to work:
    ```
    cd C:\
    md "\data\db"
    ```

## Daily dev:

```
npm run dev
Head to: http://localhost:8000
```

## End points:

-   home (prints hell world):

```
/
```

-   seed basic data and return to browser for debug only

```
/seed
```

-   login form

```
/login
```

-   welcome page after logged in

```
/welcome
```
