export default {
    items: [
        {
            id: 'navigation',
            title: 'EmergĂȘncia',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'convenios',
            title: 'Administrativo',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'basic',
                    title: 'ConvĂȘnio',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'cadastrar',
                            title: 'Cadastrar',
                            type: 'item',
                            url: '/health-plan/register'
                        },
                        {
                            id: 'consultar',
                            title: 'Consultar',
                            type: 'item',
                            url: '/health-plan/Consult'
                        }
                    ]
                },
                {
                    id: 'specialties',
                    title: 'Especialidades',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'cadastrar',
                            title: 'Cadastrar',
                            type: 'item',
                            url: '/Specialties/register'
                        },
                        {
                            id: 'consultar',
                            title: 'Consultar',
                            type: 'item',
                            url: '/Specialties/Consult'
                        }
                    ]
                }
                ,
                {
                    id: 'hospitals',
                    title: 'Hospitais',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'cadastrar',
                            title: 'Cadastrar',
                            type: 'item',
                            url: '/Hospitals/register'
                        }
                    ]
                }
            ]
        },
    ]
}