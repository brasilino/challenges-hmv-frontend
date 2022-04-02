import React from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

class HealthPlanRegister extends React.Component {
    constructor() {
        super();
        this.state = { description: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache()
        });

        const description = this.state.description

        const result = await client.mutate({
            mutation: gql`
                mutation {
                    register(description: "${description}") {
                        id
                        descricao
                        data_criacao
                        data_atualizacao
                        status
                    }
                }
            `
        })
        
        const { data: { register } } = result

        console.log('HealthPlanRegister:', register)
        
        this.setState({ description: '' })

        alert('Cadastro efetuado com sucesso!!!')
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Cadastrar novo convênio</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Convênio</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Descrição</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Descrição" 
                                                    name="description"
                                                    value={this.state.description} 
                                                    onChange={this.handleChange}/>
                                            </Form.Group>

                                            <Button 
                                                type="submit"
                                                variant="primary">
                                                Cadastrar
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default HealthPlanRegister;
