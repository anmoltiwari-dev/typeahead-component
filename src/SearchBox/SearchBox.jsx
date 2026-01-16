import { useState } from "react";
import useFetchPromise from "./useFetchPromise";

const SearchBox = ({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  maxItems,
  styles,
  debounceWait,
  listBox,
  noItemMessage,
  errorMessage,
  transformData,
  dataPromise,
}) => {
  const [isAutoComplete, setIsAutComplete] = useState(autoComplete);
  const [activeIndex, setActiveIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [data, setData, error] = useFetchPromise(
    query,
    transformData,
    dataPromise,
    debounceWait,
    isAutoComplete
  );
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (!data || data?.length === 0) return;
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      //user enter
      if (activeIndex === null) return;
      setQuery(data[activeIndex].name);
      setData(null);
      setActiveIndex(null);
      setIsAutComplete(false);
      return;
    }
    setIsAutComplete(true);
    if (keyCode === 40) {
      // move down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((ai) => ai + 1);
      }
      return;
    }
    if (keyCode === 38) {
      // move up
      if (activeIndex === 0) {
        setActiveIndex(data.length - 1);
      } else {
        setActiveIndex((ai) => ai - 1);
      }
      return;
    }
  };
  return (
    <>
      <label className={styles.label} for="name">
        {label}
      </label>
      <br />
      <input
        className={styles.input}
        name
        placeholder={placeholder}
        id
        value={query}
        onChange={handleChange}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      />
      {data?.length > 0 && listBox(data, activeIndex)}
      {data?.length === 0 && noItemMessage()}
      {error && errorMessage()}
    </>
  );
};

export default SearchBox;
