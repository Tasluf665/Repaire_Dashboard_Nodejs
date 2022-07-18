import React from "react";
import "./table.css";
import { Link } from "react-router-dom";

export default function Table({
  tableHeader,
  tableBodyData,
  currPage,
  linkAddress,
}) {
  const getItem = (item) => {
    const arr = [];
    for (const key in item) {
      arr.push(<td>{item[key]}</td>);
    }
    return arr;
  };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBodyData.map((item, index) => {
            return (
              <tr>
                <th scope="row">{currPage * 10 + index + 1}</th>
                {getItem(item)}
                <td>
                  <Link
                    to={{
                      pathname: linkAddress,
                      state: item,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
