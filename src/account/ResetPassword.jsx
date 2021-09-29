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
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form className="col bg-white mx-auto px-4 round mt-4">
                        <h4 className="font-weight-bold pt-3 text-blue">Reset Password</h4>
                        <div className="form-group">
                            <Field name="password" type="password" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Reset Password
                                </button>
                                <Link to="login" className="btn btn-link">Back to Login</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
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
        <div className="container reset-password mx-auto round">
            <div className=" px-3 row">
                <div className="d-none d-md-block col-6 my-auto">
                    <h2 className="font-weight-bold">Reset Password</h2>
                </div>
                <div className="col-6 mt-5 card-body d-none d-md-block">{getBody()}</div>
                <div className="col mt-5 card-body d-md-none">{getBody()}</div>
            </div>
        </div>
    )
}

export { ResetPassword }; 