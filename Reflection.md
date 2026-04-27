
# Reflection Questions - Lab 4

## 1. API Integration

**How did you handle the asynchronous nature of fetch?**
I used async/await syntax with try-catch blocks for cleaner error handling. This approach makes the code more readable and easier to debug compared to .then() chains.

**Why is error handling critical for public APIs?**
Public APIs can fail for many reasons: network issues, rate limiting, invalid data, or server errors. Without proper error handling, the app would crash or show blank screens, providing a poor user experience. Graceful error handling with helpful messages keeps users informed and maintains trust.

## 2. Data Transformation

**Why transform raw API data instead of using directly?**
API responses often contain unnecessary data, nested structures, or inconsistent formats. Transforming data simplifies the display logic, makes components more maintainable, and creates a clean separation between API data and UI needs.

**What could go wrong without validation?**
Without validation, missing or malformed data could cause crashes (e.g., accessing properties of undefined), display incorrect information, or break the UI. Validation ensures the app gracefully handles edge cases and unexpected API changes.

## 3. Caching

**How did caching improve performance?**
Caching eliminated redundant API calls, reducing load time from seconds to milliseconds for previously fetched data. This also reduces server load and bandwidth usage, while providing instant data display for returning users.

**What's the tradeoff between fresh data and speed?**
Fresh data ensures accuracy but requires network requests (slower). Cached data is fast but might be outdated. The TTL (Time-To-Live) strategy balances this by using cached data within a reasonable timeframe while regularly checking for updates.

## 4. User Experience

**Why debounce the search input?**
Debouncing prevents excessive API calls while the user is typing. Without debouncing, every keystroke would trigger a request, potentially overwhelming the API, wasting bandwidth, and creating a laggy experience. A 300ms delay feels responsive while significantly reducing API calls.

**Why show cached data while fetching fresh?**
This "stale-while-revalidate" pattern provides immediate feedback by showing last known data while updating in the background. Users see content instantly rather than staring at loading spinners, creating a much smoother experience.

## 5. Advanced Topics

**How did AbortController prevent memory leaks?**
When a component unmounts before an API call completes, the AbortController cancels the request. Without this, the response would try to update state on an unmounted component, causing React warnings and potential memory leaks. The cleanup function in useEffect ensures resources are properly released.

**Why is localStorage useful for this app?**
localStorage persists user preferences (temperature unit, recent cities) across browser sessions and page reloads. This means users don't have to re-search for their favorite cities every time they visit, creating a more personalized and convenient experience.