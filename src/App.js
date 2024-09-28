import Products from "./components/Products";

// Limitations of the web:
// 1. No input validation for user-searched data(ex: if a product is not there, no msg is printed).
// 2. No detailed product view or additional product information.
// 3. Limited responsiveness for different screen sizes.
// 4. No user authentication or authorization.
function App() {
  return (
    <>
    <Products/>
    </>
  );
}

export default App;
