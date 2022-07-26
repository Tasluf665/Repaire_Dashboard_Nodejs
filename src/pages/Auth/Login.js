import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (ex) {
      setError(ex.message);
    }

    return () => {
      setError("");
      setLoading(false);
    };
  }

  const handleFailer = (result) => {
    alert(JSON.stringify(result));
  };

  const handleLogin = async (googleData) => {
    const name = googleData.profileObj.name;
    const email = googleData.profileObj.email;
    const googleId = googleData.profileObj.googleId;

    try {
      setError("");
      setLoading(true);
      await loginWithGoogle(name, email, googleId);
      history.push("/");
    } catch (ex) {
      setError(ex.message);
    }

    return () => {
      setError("");
      setLoading(false);
    };
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                autoComplete="on"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                autoComplete="on"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div className="w-100 text-center mt-2">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailer}
        ></GoogleLogin>
      </div>
    </AuthContainer>
  );
}
