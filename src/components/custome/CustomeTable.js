import React from "react";
import "../table/table.css";
import { Link } from "react-router-dom";

export default function CustomeTable(props) {
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
            {props.tableHeader.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.allAgents.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                {getItem(item)}
                <td>
                  <Link
                    to={{
                      pathname: "/updateagents",
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
