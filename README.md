# Flickr gallery (demo-ready)

Explore recent pictures uploaded to Flickr worldwide.

This repo is **client-side** and is ready to deploy on **Cloudflare Pages**.

## How it works (no separate backend needed)

Browsers can’t call the Flickr public feed directly due to CORS, so this project includes a tiny Cloudflare Pages Function:

- `functions/api/pictures.js` serves `GET /api/pictures` and proxies the Flickr public feed with permissive CORS headers.

In local development, Vite proxies `GET /api/pictures` to Flickr as well (see `vite.config.js`).

## Local development

Install dependencies:

```bash
yarn install
```

Start the dev server:

```bash
yarn dev
```

## Deploy to Cloudflare Pages

- **Build command**: `yarn build`
- **Build output directory**: `dist`

Cloudflare Pages Functions are picked up automatically from `functions/`.

### Optional config

You can override the pictures endpoint:

- `VITE_PICTURES_API_URL` (defaults to `/api/pictures`)



## Built with

* [React](https://github.com/facebook/react) - Front end library for building user interfaces

* [Redux](https://github.com/reduxjs/redux) - Centralized state manager for React.

  


## Contributing

Any contribution is welcome! UI improvements, features... you name it! Just fork the repository and go nuts, then submit a pull request pointing to this repo.

Some ideas that come to mind:
  - Responsiveness: Make more mobile friendly.
  - Feature: filter out dirty images.
  - Feature: filter images by topic or category.

... or any other idea!



## Author

Jon Portella - [Github](https://github.com/jportella93) - [LinkedIn](https://www.linkedin.com/in/jonportella/) - [Twitter](https://twitter.com/jportella93)




## License

This project is licensed under the MIT License.
