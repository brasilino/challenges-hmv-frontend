import React, { Component } from "react";
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import Moment from 'moment';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import imgHealthPlan from '../../assets/images/widget/shape1.png';


import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

class HealthPlanConsult extends Component {
    constructor() {
        super();
        this.state = { healthPlans: [] };
        Moment.locale('pt-br');
    }

    async componentDidMount() {
        this.client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        const result = await this.client.query({
            query: gql`
                query {
                    findAllHealthPlans {
                        content {
                            id
                            descricao
                            dataCriacao
                            dataAtualizacao
                            status
                        }
                    }
                }
            `
        })

        console.log('test:', result)

        const { data: { findAllHealthPlans: { content } } } = result
        
        this.setState({ healthPlans: content });
    }

    render() {

        console.log('healthPlans:', this.state.healthPlans)

        const { healthPlans } = this.state

        const itens = healthPlans.map(item => (
            <tr key={item.id} className="unread">
                <td><img className="rounded-circle" style={{width: '40px'}} src={imgHealthPlan} alt="activity-user"/></td>
                <td>
                    <h6 className="mb-1">Ativo</h6>
                    <p className="m-0">{item.descricao}</p>
                </td>
                <td>
                    <h6 className="mb-1">Última atualização</h6>
                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{Moment(item.dataAtualizacao).format('DD/MM/YYYY')}</h6>
                </td>
                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Editar</a><a href="#" className="label theme-bg text-white f-12">Deletar</a></td>
            </tr>
        ))

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Convênios</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        {itens}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default HealthPlanConsult;