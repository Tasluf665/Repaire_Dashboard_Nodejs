import React from "react";
import CustomeSpinner from "./CustomeSpinner";

export default function WrapperComponent({ error, loading, children }) {
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
        <div>{loading ? <CustomeSpinner /> : <>{children}</>}</div>
      )}
    </>
  );
}
