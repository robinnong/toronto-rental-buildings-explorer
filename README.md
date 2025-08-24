# Toronto Rental Buildings Explorer

![Landing page](./public/home-page-screenshot.jpg)

Toronto Rental Buildings Explorer allows users to sort and filter an index of registered rental buildings in Toronto.

Live project at [toronto-rental-buildings-explorer.vercel.app](https://toronto-rental-buildings-explorer.vercel.app/)

## TODO
- [ ] Clean and load the remaining records (currently loaded 1100 of 3500 in both Firestore DB and Algolia search index)
- [ ] Add support for pagination
- [ ] Inject search filters as query params

## Data Sources

This project pulls data from the following City of Toronto's Open Data Portal datasets:

- [Apartment Building Registration](https://open.toronto.ca/dataset/apartment-building-registration/)
- [Ward Profiles (25-Ward Model)](https://open.toronto.ca/dataset/ward-profiles-25-ward-model/).

Maps Embed API:

- [Google Maps Embed](https://developers.google.com/maps/documentation/embed/get-started)

## Tools

- Languages: TypeScript, JavaScript, CSS
- Frameworks: React, [Tailwind CSS](https://tailwindcss.com), [Next.js](https://nextjs.org/docs)
- Bundler: Turbopack
- Cloud DB: [Firestore Database](https://firebase.google.com/docs/firestore)
- Text search service: [Algolia](https://www.algolia.com/doc/api-client/javascript/getting-started/#install)
