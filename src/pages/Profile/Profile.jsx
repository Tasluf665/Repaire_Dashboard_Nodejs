import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SubmitButton from "../../features/Form/SubmitButton";
import ProfileInput from "./Component/ProfileInput";
import ProfileSelect from "./Component/ProfileSelect";
import { updateUserDetails } from "./utils/updateUserDetails";

import { useAuth } from "../../context/AuthContext";

export default function Profile(props) {
  const [validated, setValidated] = React.useState(false);
  const [user, setUser] = React.useState();
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": currentUser.token,
            },
          }
        );

        let result = await response.json();

        if (!result.error) {
          setUser(result.data);
        }
      } catch (ex) {
        console.log("🚀 ~ file: Profile.jsx ~ line 35 ~ getData ~ ex", ex);
      }
    };

    getData();
  }, [currentUser]);

  const handleSubmit = async (event, setValidated) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const name = event.target.name.value;
      const phone = event.target.phone.value;
      const gender = event.target.gender.value;
      const birthday = event.target.birthday.value;

      updateUserDetails({ name, phone, gender, birthday }, currentUser);
    }
    setValidated(true);
  };

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          handleSubmit(event, setValidated);
        }}
      >
        <hr className="mb-5" />
        <Row className="col-12 mb-5 justify-content-around">
          <ProfileInput
            name="name"
            title="Name"
            placeholder="Enter your Name"
            type="text"
            defaultValue={user ? user.name : null}
          />
          <ProfileInput
            name="phone"
            title="Phone"
            placeholder="Enter your Phone"
            type="text"
            defaultValue={user ? user.phone : null}
          />
        </Row>

        <Row className="col-12 mb-5 justify-content-around">
          <ProfileSelect defaultValue={user ? user.gender : null} />
          <ProfileInput
            name="birthday"
            title="Birthday"
            type="date"
            defaultValue={user ? user.birthday : null}
          />
        </Row>

        <SubmitButton title="Submit" />
      </Form>
    </div>
  );
}
