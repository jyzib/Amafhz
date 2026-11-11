# AMAFHZ

Static AMAFHZ nuts and dry-fruits storefront. Website files and images are in `dist/`.

## Run locally

From the project directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/.

## Hosting

Publish `dist/` using a static web host. No build step is needed.

## Preview status

Product sizes and prices are samples. The bag and saved products use browser local storage. Online ordering, checkout and payments are not implemented; the bag displays a Coming Soon message.
