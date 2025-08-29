# Toronto Rental Buildings Explorer

![Landing page](./public/home-page-screenshot.jpg)

**Toronto Rental Buildings Explorer** is a **Next.js** web application that allows users to sort and filter an index of registered rental buildings in Toronto.

Live project deployed with Vercel at [toronto-rental-buildings-explorer.vercel.app](https://toronto-rental-buildings-explorer.vercel.app/)

This project is my first full-stack application, allowing me to learn new tools and showcase my coding style. Currently a work-in-progress.

**New skills learned from this project, as well as challenges I encountered:**

- **Data transformation**. I took the public **Apartment Building Registration** dataset from the **City of Toronto's Open Data Portal** to optimized it for querying. This involved writing a script to convert stringified numbers to actual number types and removing unnecessary fields to reduce the record size. I also converted relevant fields from `string` to `boolean` for faster queries. For example, the raw data for `Air Conditioning` specifies the type (e.g., Central Air, Forced, Individual Window Unit, None Available), but my filter only needs a simple `true` or `false` value.
- Learning how to **write to a DB using Node**, to upload JSON data to the Firestore DB using the admin SDK in the command line.
- Compared deployment options (**GitHub Pages + Github Actions**, **Netlify**, **Vercel**) and chose Vercel for its seamless Next.js integration requiring no configuration.
- Managed environment variables and secrets in production.
- Researching different solutions for **free-tier DB solutions** for storing and querying data. The 2 options I considered were **MongoDB Atlas Community Edition** and **Google Firestore DB** (a no-SQL cloud database). The first option still requires self-hosting, so I chose the Firesore DB option since it is quick to implement and has an easy-to-use SDK. However, the consequence of choosing the no-SQL Firestore DB where:
  - These queries must not be complex (whatever methods are provided in the Firestore library are what you get for query building)
  - No support for pagination/offset
  - No support for full-text search, so I integrated **Algolia** (chosen over Elastic Search for its free tier and sufficient index limits). As Algolia supports text search as well as SQL-like queries, I migrated all storage and filtering from Firestore DB to Algolia.

## TODO

- [x] Clean and upload the remaining records (currently uploaded 1200 of 3600 in the search index)
- [x] Migrate queries from Firestore to Algolia
- [x] Remove all Firestore DB implementation code
- [x] Add pagination using react-paginate
- [x] Inject filters as URL query param
- [x] Inject text search as URL query param
- [x] Inject sort as URL query param
- [x] Inject page as URL query param
- [x] Fix issue with initializing the dual range slider value
- [x] Fix issue with 'Clear All' button in fitlers modal not resetting the range filter
- [ ] Fix issue with some event handlers not firing on some touch interactions on mobile devices
- [ ] Fix issue with dual range slider not clickable on mobile
- [ ] Error messaging for failed queries
- [ ] Error handling for invalid queries in URl query params
- [ ] Add filters for 'NO_OF_ACCESSIBLE_PARKING_SPACES' and 'VISITOR_PARKING'

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
- Text search service: [Algolia](https://www.algolia.com/doc/api-client/javascript/getting-started/#install)
- Pagination library: [react-paginate](https://www.npmjs.com/package/react-paginate)
