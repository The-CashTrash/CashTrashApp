import React from 'react';

import { accountService } from '@/_api_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <div className="">
            <div className="">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged into CashTrash App</p>
            </div>
        </div>
    );
}

export { Home };