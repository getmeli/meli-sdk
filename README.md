# Meli SDK

## Forms

### Using <script/>

Place a `.meli.yml` at your site root:

```yaml
forms:
    form1:
        type: email
        recipient: test@test.com
```

Create an HTML form:

```html
<!doctype html>
<html>
<head>
    <!-- ... other scripts -->
    <script async src="https://unpkg.com/@getmeli/sdk@^1/build/browser.js"></script>
</head>
<body>

<form data-form="form1" id="my-form">
    <input type="text" name="name">
    <input type="file" name="logo">
    <button type="submit">Submit</button>
</form>

</body>
</html>
```

By default, the lib will automatically load and look for forms with the `data-form` attribute. You can disable this by:

- adding the `data-meli-init="false"` to your script tag
- removing the `async` directive from your script tag

```html

<script ... data-meli-init="false"></script>
<script>
    Meli.Forms.init().catch(console.error);
</script>
```

In this case, you will need to initialize

### Using Npm

Install the lib:

```
npm i @getmeli/sdk
```

Use it in your code:

```js
import Meli from 'meli';

Meli.Forms.init().catch(console.error);
```

### Api

To pass your own forms:

```js
const form = document.getElementById('my-form');

Meli.Forms
    .init([form])
    .catch(console.error);
```

Manually create a form and bind it:

```js
Meli.Forms
    .init([])
    .then(() => {
        const formElement = document.getElementById('my-form');
        const form = new Meli.Forms.Form(form);
    })
    .catch(console.error);
```

To remove all listeners:

```js
// ...
const form = new Meli.Forms.Form(form);
forms.remove();
```

## Development

1. Run Meli locally
1. Ship a site with a form
1. Run `npx http-server -p 3030 .`
1. In your site's `index.html`, use `http://localhost:3030/build/browser.js` for the SDK src
1. Start the build `npm i && npm start`
