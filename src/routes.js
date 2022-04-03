import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./Pages/Dashboard/Default'));
const Emergency = React.lazy(() => import('./Pages/Dashboard/Emergency'));
const HealthPlanRegister = React.lazy(() => import('./Pages/HealthPlan/Register'));
const HealthPlanConsult = React.lazy(() => import('./Pages/HealthPlan/Consult'));
const SpecialtiesRegister = React.lazy(() => import('./Pages/Specialties/Register'));
const SpecialtiesConsult = React.lazy(() => import('./Pages/Specialties/Consult'));
const HospitalRegister = React.lazy(() => import('./Pages/Hospitals/Register'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: Dashboard },
    { path: '/dashboard/emergency/:id', exact: true, name: 'Default', component: Emergency },
    { path: '/health-plan/register', exact: true, name: 'Health Plan Register', component: HealthPlanRegister },
    { path: '/health-plan/consult', exact: true, name: 'Health Plan Consult', component: HealthPlanConsult },
    { path: '/specialties/register', exact: true, name: 'specialties Register', component: SpecialtiesRegister },
    { path: '/specialties/consult', exact: true, name: 'specialties Consult', component: SpecialtiesConsult },
    { path: '/hospitals/register', exact: true, name: 'Hospital Register', component: HospitalRegister },
];

export default routes;