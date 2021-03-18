# Meli SDK

## Get started

```
Meli
  .init()
  .then(() => {
    // Auto detect forms
    Meli.Forms.init()
      .then(forms => {
        console.log('initialized forms', forms);
      })
      .catch(console.error);

    // // Pass your own <form> elements
    // Meli.Forms.init([
    //     document.getElementById('my-form'),
    //   ])
    //   .then(forms => {
    //     console.log('initialized forms', forms);
    //   })
    //   .catch(console.error);

    // Manually bind forms
    // Meli.Forms.init([])
    //   .then(() => {
    //     const htmlForm = document.getElementById('my-form');
    //     const form = new Meli.Forms.Form(htmlForm);
    //     console.log('initialized form', form);
    //   })
    //   .catch(console.error);
  })
  .catch(console.error);
```

## Forms

