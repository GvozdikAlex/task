import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../App";

const btns = [10, 20, 50];
const url = "https://cataas.com/api/";

export default function Filter() {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [limit, setLimit] = useState(10);
  const { setDataCats } = useContext(DataContext);

  async function getData() {
    try {
      const response = await fetch(`${url}tags`);
      const data = await response.json();
      data && setTags(data);
    } catch (error) {
      console.error("Something went wrong");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleFilterChange(e) {
    setTag(e.target.value);
  }

  function changeLimit(limit) {
    setLimit(limit);
  }
  async function handleApply(tag, limit) {
    try {
      const response = await fetch(
        `${url}cats?${tag ? `tags=${tag}` : ""}&limit=${limit}`
      );
      const data = await response.json();
      data && setDataCats(data);
    } catch (error) {
      console.error("Something went wrong");
    }
  }
  return (
    <div className="filter-wrapper">
      <h2>Filters: {tag ? `Tag is ${tag} ${limit}` : "no tag pressed"}</h2>
      <select name="" id="" className="select" onChange={handleFilterChange}>
        {tags && tags.map((tag) => <option value={tag}>{tag}</option>)}
      </select>
      <div>
        <ul className="btns-list">
          {btns.map((btn) => (
            <li className="btn-li">
              <button
                onClick={() => changeLimit(btn)}
                style={{ background: btn === limit ? "red" : "transparent" }}
              >
                {btn}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleApply(tag, limit)}>Apply</button>
    </div>
  );
}
