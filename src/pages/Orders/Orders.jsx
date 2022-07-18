import React from "react";
import { Link } from "react-router-dom";

import CommonTable from "../../components/custome/CommonTable";
import { useAuth } from "../../context/AuthContext";
import { getOrders } from "../../server/Order";

export default function Orders() {
  const [loading, setLoading] = React.useState(true);
  const [allOrders, setAllOrders] = React.useState([]);
  const [filterAllOrders, setFilterAllOrders] = React.useState([]);
  const [dataShow, setDataShow] = React.useState();
  const [error, setError] = React.useState();

  const { currentUser, logout } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await currentUser.accessToken;
      const allOders = await getOrders(accessToken);

      if (allOders.error) {
        if (allOders.error === "Auth token is expired") {
          logout();
        }
        setError(allOders.error);
      } else {
        const pending = allOders.filter(
          (item) => item.status[item.status.length - 1].state === "Pending"
        );
        const delivered = allOders.filter(
          (item) =>
            item.status[item.status.length - 1].state === "Payment Complete"
        );
        const others = allOders.filter(
          (item) =>
            item.status[item.status.length - 1].state !== "Pending" &&
            item.status[item.status.length - 1].state !== "Payment Complete"
        );
        const finalData = [...pending, ...others, ...delivered];

        setAllOrders(finalData);
        setDataShow(finalData);
        setFilterAllOrders(finalData);
        setLoading(false);
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    const value = event.target.value;
    let filterData = allOrders.filter((item) => item.phone.includes(value));
    setDataShow(filterData);
    setFilterAllOrders(filterData);
  };

  const customerTableHead = [
    "Category",
    "Type",
    "Booking Time",
    "Arrival Time",
    "Phone",
    "Status",
    "",
  ];

  const colorCode = {
    Pending: "Red",
    Accepted: "Yellow",
    "Technician Assigned": "Yellow",
    "Product Repaired": "Yellow",
    "Payment Complete": "Green",
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.category}</td>
      <td>{item.categoryType}</td>
      <td>{`${new Date(item.bookingTime).getDate()}-${
        new Date(item.bookingTime).getMonth() + 1
      }-${new Date(item.bookingTime).getFullYear()}`}</td>
      <td>{item.date}</td>
      <td>{item.phone}</td>
      <td
        style={{
          color: `${colorCode[item.status[item.status.length - 1].state]}`,
        }}
      >
        {item.status[item.status.length - 1].state}
      </td>
      <td>
        <Link
          to={{
            pathname: "/updateorder",
            state: item,
          }}
          style={{ textDecoration: "none" }}
        >
          Details
        </Link>
      </td>
    </tr>
  );

  return (
    <>
      {error ? (
        <div
          className="col-12 d-flex justify-content-center"
          style={{ marginTop: "30px" }}
        >
          <h1>{error}</h1>
        </div>
      ) : (
        <CommonTable
          loading={loading}
          title="Orders"
          linkAdd="/orders"
          btnName="Add Order"
          handleSearch={handleSearch}
          customerTableHead={customerTableHead}
          filterData={filterAllOrders}
          dataShow={dataShow}
          setDataShow={setDataShow}
          renderBody={renderBody}
        />
      )}
    </>
  );
}
