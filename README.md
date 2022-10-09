# ISEC3004 Group 9

### Demo for:

-   NoSQL Injection
-   DOM Based XSS

![image](https://user-images.githubusercontent.com/44139980/194742763-326707fd-b4b5-4204-ad38-fd8070b988ae.png)

![image](https://user-images.githubusercontent.com/44139980/194742786-406554e6-a6b4-4512-9fdb-292100b918cb.png)

# For lecturer / testing

### ✅ Build:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Run `make -i docker-build`
-   Go to: `http://localhost:8001/`

### 1️⃣ NoSQL Injection #1:

Log in as any existing user.

-   Enter `http://localhost:8000/login?username=james&password[%24ne]=` into the address bar.

##### <u>Problem:</u>

The server will interpret that as

```Javascript
db.collection("users").findOne({ username: 'james', password: { '$ne': '' })
```

The password is passed into MongoDb as a JSON object, where the criteria (password not equal to nothing) will always evaluate to `true`.

##### <u>Fix:</u>

We perform a basic validation check on any user input before passing it into the database, if the user input is NOT a `string`, i.e. a JSON object, we return an error.

![image](https://user-images.githubusercontent.com/44139980/194741238-f26250cf-af51-48c4-ba48-8609113ca76c.png)

### 2️⃣ NoSQL Injection #2:

Get every user's private todo list.

-   Enter `') || ('a'=='a) //` into the search box.

##### <u>Problem:</u>

The code uses the `$where` query operator with un-validated user input, it is susceptible to Javascript script injections where an attacker can inject any arbitrary Javascript code.

![image](https://user-images.githubusercontent.com/44139980/194741293-74fddb38-3758-498a-839f-f75c391f0ff2.png)

The server will interpret the user input as

```Javascript
this.title.toLowerCase().includes('') || ('a'=='a) //') && this.username == 'james'
```

where the check for the username is commented out and doesn't run, which causes the query to return every user's private todo list.

##### <u>Fix:</u>

Instead of using the `$where` query operator, we use a `$regex` search which does NOT execute javascript code, the user input will remain as `string` type.

![image](https://user-images.githubusercontent.com/44139980/194741455-b1944b93-1e84-4bd8-8830-6c75cada7dc6.png)

### 1️⃣ DOM-Based XSS #1:

Execute any arbitrary Javascript code on user's browser.

-   Enter `asdf<script>alert("Malicious code executed, cookies stolen!");</script>` in the Text to Binary Converter.

##### <u>Problem:</u>

The code uses `document.write(...)` API to write elements into the DOM. This method is strongly discouraged as it evaluates an input string into HTML markup and inserts HTML elements into the DOM. Since the input string comes from the text input field, an attacker can include a `<script>` tag into the input string and perform any arbitrary Javascript code.

![image](https://user-images.githubusercontent.com/44139980/194741528-17eb8a81-90d2-4716-aef7-1f82e89072c4.png)

##### <u>Fix:</u>

Instead of using the `document.write(...)` API, we use a much safer method `element.innerText = "..."` to inject user input into the DOM, the input string will not evaluate into a HTML element, it will remain as a string.

![image](https://user-images.githubusercontent.com/44139980/194741689-14b83bc5-da6c-4b0a-813e-a25a4b2fee19.png)

### 2️⃣ DOM-Based XSS #2:

Execute any arbitrary Javascript code on user's browser.

-   Enter `http://localhost:8000/dom-xss2#Christine Bui"><img src="x" onerror="function f(){alert('Malicious code executed, cookies stolen!');} f()">` into the address bar.

##### <u>Problem:</u>

The code uses `element.innerHTML = "..."` to inject an input string into an element, the risk of this is that the input string can be evaluated into HTML elements. An attacker can include `<script>` tags or an `<img>` tag with Javascript code attacked to it to execute any arbitrary Javascript code.

![image](https://user-images.githubusercontent.com/44139980/194741790-dc1553f6-7f91-4c2f-b733-d23eda47d9e1.png)

##### <u>Fix:</u>

Instead of using the `element.innerHTML = "..."`, we use a much safer method `element.textContent = "..."` to inject user input into the DOM, the input string will not evaluate into a HTML element, it will remain as a string.

![image](https://user-images.githubusercontent.com/44139980/194741942-345497d4-f021-4d22-bec2-a1f01d78b6bf.png)

# For developers

### ⚒️ Initial setup:

-   Download and install [Docker](https://www.docker.com/products/docker-desktop/)
-   Install node and npm
-   Run `make install`

### 🧑‍💻 Daily dev:

-   Run `make docker-start`
-   Run `make dev`
-   Go to: `http://localhost:8000/`
-   Click `/seed-data` to create dummy data and fake accounts
