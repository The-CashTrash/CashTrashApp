import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_api_services';

function ForgotPassword() {
    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });

    function onSubmit({ email }, { setSubmitting }) {
        alertService.clear();
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions'))
            .catch(error => alertService.error(error))
            .finally(() => setSubmitting(false));
    }

    return (
        <div className="forgot-password container mx-auto round">
            <div className="row px-5 forgot-password">
                <div className="d-none d-md-block col-6 my-auto">
                    <h2 className="font-weight-bold text-blue">Forgot Password?</h2>
                </div>
                <div className=" col mx-auto">
                    <h5 className=" d-md-none">Forgot Password?</h5>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="bg-white round">
                                <div className="card-body">
                                <h5 className="py-2 font-weight-bold text-blue">Kindly enter your email address</h5>
                                    <div className="form-group">
                                        <Field name="email" type="text" id="forgot-field" placeholder="Email address" className={'form-control' + 'field' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group d-flex justify-content-between col">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Submit
                                            </button>
                                            <div><Link to="login" className="font-weight-bold btn-link"> Back to Login</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik> 
                </div>
            </div>
        </div>
    )
}

export { ForgotPassword }; 