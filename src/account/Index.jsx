import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { accountService } from '@/_api_services';

import { Login } from './Login';
import { Register } from './Register';
import { VerifyOtp } from './VerifyOtp';
import { OtpEntry } from './OtpEntry';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

function Account({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <div>
            <Switch>
                <Route path={`${path}/login`} component={Login} />
                <Route path={`${path}/register`} component={Register} />
                <Route path={`${path}/verify-otp`} component={VerifyOtp} />
                <Route path={`${path}/enter-otp`} component={OtpEntry} />
                {/* <Route path={`${path}/verify-email`} component={VerifyEmail} /> */}
                <Route path={`${path}/forgot-password`} component={ForgotPassword} />
                <Route path={`${path}/reset-password`} component={ResetPassword} />
            </Switch>
        </div>
    );
}

export { Account };