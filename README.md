# Toronto Rental Buildings Explorer

![Landing page](./public/home-page-screenshot.jpg)

**Toronto Rental Buildings Explorer** is a **Next.js** web application that allows users to sort and filter an index of registered rental buildings in Toronto.

Live project deployed with Vercel at [toronto-rental-buildings-explorer.vercel.app](https://toronto-rental-buildings-explorer.vercel.app/)

This project is my first full-stack application, allowing me to learn new tools and showcase my coding style. Currently a work-in-progress.

**New skills learned from this project, as well as challenges I encountered:**

  - **Data transformation**. For example, I took the public **Apartment Building Registration** data from the **City of Toronto's Open Data Portal** and cleaned the data in order to make querying more efficient. I wrote a script that parses all stringified numbers as actual number types. The script also deletes fields where the values will not be displayed to the user (i.e fields I don't really care about to keep record sizes small). In addition, I transformed relevant fields from `string` to `boolean` to make querying faster. If I needed to check if an apartment has `Air Conditioning`, the raw data value tells us what kind of Air Conditioning the building has (Central Air, Forced, Individual Window Unit, None Available etc.), but my filter only needs to check if this field is `true` or `false`.
  - Learning how to **write to a DB using Node**, to upload JSON data to the Firestore DB using the admin SDK in the command line.
  - Compared deployment options (**GitHub Pages + Github Actions**, **Netlify**, **Vercel**) and chose Vercel for its seamless Next.js integration requiring no configuration.
  - Managed environment variables and secrets in production.
  - Researching different solutions for **free-tier DB solutions** for storing and querying data. The 2 options I looked at were **MongoDB Atlas Community Edition** and **Google Firestore DB** (a no-SQL cloud database). The first option still requires self-hosting, so I went with the Firesore DB option since it is quick to implement and has an easy-to-use SDK. However, the consequence of choosing the no-SQL Firestore DB where:
      - These queries must not be complex (whatever methods are provided in the Firestore library are what you get for query building)
      - No support for pagination/offset
      - No support for full-text search, so I integrated **Algolia** (chosen over Elastic Search for its free tier and sufficient index limits). As Algolia only supports text search, I need to maintain duplicate data in both Firestore and Algolia across multiple indices, so this is another downside of choosing a database that does not support both complex querying and text search.


## TODO
- [ ] Clean and load the remaining records (currently loaded 1100 of 3500 in both Firestore DB and Algolia search index)
- [ ] Build the indices to support all types of filter combinations for querying the Firestore DB
- [ ] Error messaging for failed queries
- [ ] Add support for pagination
- [ ] Inject search filters as query params
- [ ] Fix issue with some event handlers not firing on some touch interactions on mobile devices
- [ ] Fix issue with initializing the dual range slider value
- [ ] Fix issue with dual range slider not clickable on mobile
- [ ] Enhancement - use Redux state management to store data which has already been fetched

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
