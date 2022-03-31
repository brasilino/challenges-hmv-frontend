import React, { Component } from "react";
import {Row, Col, Card, Table} from 'react-bootstrap';
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

import Aux from "../../hoc/_Aux";

import avatar2 from '../../assets/images/user/avatar-2.jpg';



class Dashboard extends Component {
    constructor() {
        super();
        this.state = { 
            items: [],
            emergencies: [],
        };
    }

    async componentDidMount() {
        this.client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        const result = await this.client.query({
            query: gql`
                query {
                    findAllByStatusEmergency {
                        content {
                            codigo_emergencia
                            id_paciente
                            primeiro_nome_paciente
                            score_prioridade
                            status
                        }
                    }
                }
            `
        })

        const { data: { findAllByStatusEmergency: { content } } } = result
        
        this.setState({ emergencies: content });
    }

    render() {

        const { emergencies } = this.state

        const status = {};

        emergencies.forEach(item => {

            if(!status[item.status]) status[item.status] = []

            status[item.status].push((
                <tr key={item.id} className="unread">
                    <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                    <td>
                        <p className="m-0">{item.primeiro_nome_paciente}</p>
                    </td>
                    <td>
                        <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{item.status}</h6>
                    </td>
                    <td>
                        <h6 className="text-muted">{item.score_prioridade}</h6>
                    </td>
                    <td><a href="#" className="label theme-bg text-white f-12">Ver mais</a></td>
                </tr>
            ))
        })

        let tables = []

        const table = Object.entries(status).map(([key]) => (
                <Col md={6} xl={6}>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>{key}</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                    <th>Paciente</th>
                                    <th>Nome</th>
                                    <th>Status</th>
                                    <th>Score</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {status[key].map(item => item)}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
        ))

        tables.push(table);

        return (
            <Aux>
                <Row>
                    {tables}
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;