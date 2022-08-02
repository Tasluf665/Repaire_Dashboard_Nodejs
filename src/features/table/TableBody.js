import React from "react";
import "./table.css";
import { Link } from "react-router-dom";

export default function TableBody({
  tableHeader,
  tableBodyData,
  linkAddress,
  get_td_item,
}) {
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
