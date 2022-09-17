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
Head to: http://localhost:8000/
```

## NoSQL Injection:

```
Visit: http://localhost:8000/login?username=james&password[%24ne]=
```
