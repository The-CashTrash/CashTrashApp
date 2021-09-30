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
        <div className="container-fluid mx-3 px-5">
            <div className="row login mt-3 pt-5 d-flex justify-content-between">
                <div class="col-6 pl-5 ml-3 d-none d-md-block">
                    <div className="text-blue font-weight-bold">
                        <p className="logo">LOGO</p>
                    </div>
                    <h3 className="text-gray font-weight-bold">Forgot password</h3>
                    <h3 className="text-blue font-weight-bold">Let's help you recover it</h3>
                </div>
                <div className="col-12 d-block d-md-none pb-2">
                    <h3 className="text-gray font-weight-bold">Forgot password</h3>
                    <h3 className="text-blue font-weight-bold">Let's help you recover it</h3>
                </div>
                <div className="col mx-4 d-flex align-items-center">
                    <div className="col forgot-card bg-white round-img">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ errors, touched, isSubmitting }) => (
                                <Form className="">
                                    <div className="card-body">
                                        <h6 className="text-blue you-rock font-weight-bold form-group">We're here to help</h6>
                                        <div className="form-group">
                                            <Field name="email" type="text" id="forgot-field" placeholder="Enter Email" className={'form-control' + 'field' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-row pt-2 px-1 d-flex justify-content-between">
                                            <h6 className="text-gray link">I remember my password
                                                <span><Link to="login"className="text-blue font-weight-bold" > Sign in</Link></span>
                                            </h6>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" disabled={isSubmitting} className=" login-btn float-right btn btn-primary">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                NEXT
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik> 
                    </div>
                </div>
            </div>
            <footer className="row pl-4 ml-4">
            <span>
                <Link to="register" className="text-gray" >Privacy . </Link>
                <Link to="register" className="text-gray"> Terms</Link>
            </span>
        </footer>
        </div>
    )
}

export { ForgotPassword }; 