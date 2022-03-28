import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const SignIn = React.lazy(() => import('./Pages/Authentication/SignIn'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn }
];

export default route;