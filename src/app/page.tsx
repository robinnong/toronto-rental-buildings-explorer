"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import useSearchContext, {
  SearchContext,
} from "./components/hooks/useSearchFilterContext";
import LandingPage from "./components/LandingPage";
import SearchPage from "./components/SearchPage";

export default function App() {
  const searchContext = useSearchContext();
  const { isInitialized } = searchContext;

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <SearchContext.Provider value={searchContext}>
        {/* TODO: Render the Landing Page and Search Page as routes */}
        {!isInitialized && <LandingPage />}
        {isInitialized && <SearchPage />}
      </SearchContext.Provider>
    </APIProvider>
  );
}
