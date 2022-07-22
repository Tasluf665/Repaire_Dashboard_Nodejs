import React from "react";
import "./table.css";
import { Link } from "react-router-dom";

import { get_td_item } from "../../utils/table/get_td_item";

export default function TableBody({ tableHeader, tableBodyData, linkAddress }) {
  return (
    <div>
      <table className="table">
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
              <tr key={item._id}>
                <th scope="row">{item.id}</th>
                {get_td_item(item)}
                <td>
                  <Link
                    to={{
                      pathname: linkAddress,
                      state: item._id,
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
