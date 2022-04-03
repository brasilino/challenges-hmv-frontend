import React from 'react';

const SignIn = React.lazy(() => import('./Pages/Authentication/SignIn'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn }
];

export default route;