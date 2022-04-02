import React, { Component } from "react";
import {Row, Col, Card, Form} from 'react-bootstrap';
import Moment from 'moment';
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

import Aux from "../../hoc/_Aux";


class Emergency extends Component {
    constructor() {
        super();
        this.state = { 
            emergency: {
                detalhes_pedido_atendimento: { 
                    dores: null, 
                    sintomas: [], 
                    data_nascimento: null, 
                    relato_motivo_pedido_atendimento: null, 
                    habitos_paciente: [], 
                    eventos_traumaticos: [],
                }
            },
        };
        Moment.locale('pt-br');
    }

    async componentDidMount() {
        this.client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        const { id } = this.props.match.params

        const result = await this.client.query({
            query: gql`
                query {
                    findById(id: "${id}") {
                        content {
                            codigo_emergencia
                            id_paciente
                            primeiro_nome_paciente
                            score_prioridade
                            status
                            detalhes_pedido_atendimento {
                                dores {
                                    regiao
                                        escala_de_dor
                                }
                                sintomas {
                                id
                                descricao
                                }
                                data_nascimento
                                relato_motivo_pedido_atendimento
                                habitos_paciente {
                                id
                                descricao
                                }
                                eventos_traumaticos {
                                    id
                                    descricao
                                }
                            }
                            data_criacao
                            data_atualizacao
                        }
                    }
                }
            `
        })

        const { data: { findById: { content } } } = result
        
        this.setState({ emergency: content });
    }

    render() {
        const { emergency } = this.state

        const { detalhes_pedido_atendimento: { 
            dores, sintomas, data_nascimento, relato_motivo_pedido_atendimento, habitos_paciente, eventos_traumaticos,
        } } = emergency

        const sintomasList = sintomas.map(item => (
            <Form.Check type="checkbox" defaultChecked="true" label={item.descricao} />
        ))

        const habitosPacienteList = habitos_paciente.map(item => (
            <Form.Check type="checkbox" defaultChecked="true" label={item.descricao} />
        ))

        const eventosTraumaticosList = habitos_paciente.map(item => (
            <Form.Check type="checkbox" defaultChecked="true" label={item.descricao} />
        ))
        

        return (dores &&
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Emergência</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>{emergency.status}</h5>
                                <hr/>
    
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nome</Form.Label>
                                                    <Form.Control 
                                                        readOnly 
                                                        type="text" 
                                                        placeholder="Nome" 
                                                        name="name"
                                                        value={emergency.primeiro_nome_paciente}/>
                                                </Form.Group>
                                            </Col>

                                            <Col md={2}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Data de nascimento</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Data de nascimento" 
                                                        name="data_nascimento"
                                                        value={Moment(data_nascimento).format('DD/MM/YYYY')}/>
                                                </Form.Group>
                                            </Col>

                                            <Col md={1}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Score</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Score" 
                                                        name="score"
                                                        value={emergency.score_prioridade}/>
                                                </Form.Group>
                                            </Col>

                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Data de Criação</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Data de Criação" 
                                                        name="data_criacao"
                                                        value={Moment(emergency.data_criacao).format('DD/MM/YYYY')}/>
                                                </Form.Group>
                                            </Col>

                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Data de Atualização</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Data de Atualização" 
                                                        name="data_atualizacao"
                                                        value={Moment(emergency.data_atualizacao).format('DD/MM/YYYY')}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            
                                            {/* <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Relato motivo pedido atendimento</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Relato motivo pedido atendiment" 
                                                        name="relato_motivo_pedido_atendimento"
                                                        value={relato_motivo_pedido_atendimento}/>
                                                </Form.Group>
                                            </Col> */}

                                            <Col md={12}>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Relato motivo pedido atendimento</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        as="textarea"
                                                        rows="3" 
                                                        placeholder="Relato motivo pedido atendiment" 
                                                        name="relato_motivo_pedido_atendimento"
                                                        value={relato_motivo_pedido_atendimento}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <br/>
                                        <h5>Dores</h5>
                                        <hr/>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Regiâo</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Regiâo" 
                                                        name="regiao"
                                                        value={dores[0].regiao}/>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Escala de dor</Form.Label>
                                                    <Form.Control 
                                                        readOnly
                                                        type="text" 
                                                        placeholder="Escala de dor" 
                                                        name="escala_de_dor"
                                                        value={dores[0].escala_de_dor}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <br/>
                                        <h5>Condição pré atendimento</h5>
                                        <hr/>

                                        <Row>
                                            <Col md={3}>
                                                <h5>Sintomas</h5>
                                                <Form.Group controlId="formBasicChecbox">
                                                    {sintomasList}
                                                </Form.Group>
                                            </Col>

                                            <Col md={3}>
                                                <h5>Hábitos Paciente</h5>
                                                <Form.Group controlId="formBasicChecbox">
                                                    {habitosPacienteList}
                                                </Form.Group>
                                            </Col>

                                            <Col md={3}>
                                                <h5>Eventos Traumático</h5>
                                                <Form.Group controlId="formBasicChecbox">
                                                    {eventosTraumaticosList}
                                                </Form.Group>
                                            </Col>                                            
                                        </Row>

                                    </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
        
    }
}

export default Emergency;