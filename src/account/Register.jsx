import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "@/_api_services";

function Register({ history }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    bvnNin: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    bvnNin: Yup.string().required("BVN/NIN is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        alertService.success(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("login");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <div className="container register-card my-5 mx-auto">
      <div className="row bg-white mx-3 round">
        <div className="col bg-white round">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="px-3 pt-3">
                  <h4 className="font-weight-bold text-blue pb-2">Register</h4>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>First Name</label>
                      <Field
                        name="firstName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Last Name</label>
                      <Field
                        name="lastName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.lastName && touched.lastName ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label>BVN/NIN</label>
                    <Field
                      name="bvnNin"
                      type="text"
                      className={
                        "form-control" +
                        (errors.bvnNin && touched.bvnNin ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="bvnNin"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label>Password</label>
                      <Field
                        name="password"
                        type="password"
                        className={
                          "form-control" +
                          (errors.password && touched.password ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col">
                      <label>Confirm Password</label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={
                          "form-control" +
                          (errors.confirmPassword && touched.confirmPassword
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-group form-check">
                    <Field
                      type="checkbox"
                      name="acceptTerms"
                      id="acceptTerms"
                      className={
                        "form-check-input " +
                        (errors.acceptTerms && touched.acceptTerms
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <label htmlFor="acceptTerms" className="text-blue form-check-label">
                      Accept Terms & Conditions
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Register
                    </button>
                    <span className="font-weight-bold text-blue"> Have an account? 
                    <Link to="login" className="text-gray"> Login</Link>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-5 d-none d-md-block register-img round-img"></div>
      </div>
    </div>
    
  );
}

export { Register };
