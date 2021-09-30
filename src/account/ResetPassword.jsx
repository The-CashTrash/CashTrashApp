import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_api_services';

function ResetPassword({ history }) {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }
    
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        function onSubmit({ password, confirmPassword }, { setSubmitting }) {
            alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    history.push('login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }

        return (
            <div className="col forgot-card bg-white round-img">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="">
                            <div className="card-body">
                                <h6 className="text-blue you-rock font-weight-bold form-group">We're here to help</h6>
                                <div className="form-group">
                                    <Field name="password" type="password" placeholder="Password" id="reset-password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <Field name="confirmPassword" type="password" placeholder="Confirm Password" id="reset-confirm" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" disabled={isSubmitting} className="login-btn float-right btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        RESET
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
        }
    }

    return (
        <div className="container-fluid mx-3 px-5">
            <div className="row login mt-3 pt-5 d-flex justify-content-between">
                <div class="col-6 pl-5 ml-3 d-none d-md-block">
                    <div className="text-blue font-weight-bold">
                        <p className="logo">LOGO</p>
                    </div>
                    <h3 className="text-gray font-weight-bold">Reset password</h3>
                </div>
                <div className="col-12 d-block d-md-none pb-2">
                    <h3 className="text-gray font-weight-bold">Reset password</h3>
                </div>
                <div className="col mx-4 d-flex align-items-center">{getBody()}</div>
                {/* <div className="col mt-5 card-body d-md-none">{getBody()}</div> */}
            </div>
        </div>
    )
}

export { ResetPassword }; 