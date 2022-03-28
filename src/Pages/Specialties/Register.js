import React from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

class SpecialtiesRegister extends React.Component {
    constructor() {
        super();
        this.state = { name: '' };

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

        const name = this.state.name

        const result = await client.mutate({
            mutation: gql`
                mutation {
                    registerSpecialties(name: "${name}") {
                        id
                        nome
                        dataCriacao
                        dataAtualizacao
                        status
                    }
                }
            `
        })
        
        const { data: { registerSpecialties } } = result

        console.log('SpecialtiesRegister:', registerSpecialties)
        
        this.setState({ name: '' })

        alert('Cadastro efetuado com sucesso!!!')
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Cadastrar nova Especialidade</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Especialidade</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Nome" 
                                                    name="name"
                                                    value={this.state.name} 
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

export default SpecialtiesRegister;
