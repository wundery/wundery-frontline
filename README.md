# Wundery Frontline

Frontline is a javascript utility that brings interactive functionalities to Wundery storefronts. It is already setup in all Wundery default designs. If you have special customization requirements, you may find this document valuable.

For all Frontline features -- such as search or cart -- the library has to be embedded in the head of your page and initialized before the closing body tag.

### Embed

Place this in the `<head>` of your page:

```html
<script src="https://sdk.wundery.com/frontline/vx.x.x/frontline.js" />
```

For a list of available versions, click on the releases tab in this repo.

### Initialization

Place this before the closing body tag:

```html
<script type="text/javascript">
  var frontline = new Frontline({
    // Used API endpoint (required)
    apiEndpoint: 'https://api.wundery.com',

    // Used checkout endpoint (required)
    checkoutEndpoint: 'http://checkouts.wundery.com',

    // Current store ID (required)
    storeId: '1337',

    // Auth data. This is non-sensitive but we deliver it encoded because thats more easier
    // to transfer between systems. You cannot define this value by yourself. It is rendered
    // by our storefront engine (required)
    auth: '{{ store.sdk.auth }}',
    
    // Debug mode enabled (optional, default: false)
    debug: true,
  });
</script>
```

## Search

To inject the search box you have to place a target element anywhere into your page. This will be replaced by the search input box:

```html
<span data-wundery-search />
```

Also, add the following lines to the initialization snippet:

```javascript
// Initializes the search
var search = frontline.newSearch({
  // Triggered on every search keystroke. You may use this callback
  // to send data to your own analytics backend, collecting statistics
  // about what users search on your page.
  onSearch: function (term) { /* Add your own stuff */ },
});

// Injects the search into the page
search.mount();
```

## Custom styling

You can apply custom css styling to all Frontline features by overriding the generated css classes after the Frontline `script` tag in the `<head>` section;

# Development

Run integration server:

`yarn run integration`
