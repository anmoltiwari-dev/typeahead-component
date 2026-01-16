import ListBox from "./ListBox/ListBox";
import SearchBox from "./SearchBox/SearchBox";
import "./styles.css";

/**
 * 1. make input box with props of input component
 * 2. provide flag feature for autoComplete
 * 3. max number of results to be provided
 * 4. discuss props contract before starting with the component
 * 5. List Box component is being used as a render prop pattern
 * 6. use debounce from lodash to debounce the function call
 * 7. use AbortController to abort consecutive requests to the same domain
 * 8. Do not throw error on network call abort
 * 9. High customizability with response transformer function and a custom fetch function
 */

export default function App() {
  const dataPromise = async (query, signal) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`, {
      signal,
    });
  const transformData = (data) => {
    return data.results;
  };
  return (
    <div className="wrapper">
      <SearchBox
        id="personName"
        name="personName"
        label="Enter person name"
        placeholder="Enter your favourite starwars character"
        autoComplete={true}
        maxItems={5}
        styles={{
          label: "label",
          input: "input",
        }}
        debounceWait={400}
        listBox={(items, activeIndex) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )}
        noItemMessage={() => <div>Sorry, no results found</div>}
        errorMessage={() => <div>Sorry, an error occured</div>}
        transformData={transformData}
        dataPromise={dataPromise}
      />
    </div>
  );
}
