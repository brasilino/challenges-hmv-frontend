import React from 'react';
import {Row, Col, Card, Form, Button} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

class HospitalRegister extends React.Component {
    constructor() {
        super();
        this.state = { 
            name: '',
            description: '',
            publicPlace: '',
            number: '',
            complement: '',
            zipCode: '',
            city: '',
            uf: '',
        };

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

        const {
            name,
            description,
            publicPlace,
            number,
            complement,
            zipCode,
            city,
            uf,
        } = this.state

        const result = await client.mutate({
            mutation: gql`
                mutation {
                    hospitalRegister(
                        name: "${name}"
                        description: "${description}"
                        publicPlace: "${publicPlace}"
                        number: "${number}"
                        complement: "${complement}"
                        city: "${city}"
                        uf: "${uf}"
                        zipCode: "${zipCode}"
                    ) {
                        endereco {
                            descricao
                            logradouro
                            numero
                            complemento
                            cidade
                            uf
                            cep
                            codigo_endereco
                        }
                        especialidades {
                            test
                        }
                        data_criacao
                        data_atualizacao
                        codigo_unidade
                        nome_unidade
                        status
                    }
                }
            `
        })
        
        const { data: { hospitalRegister } } = result

        console.log('hospitalRegister:', hospitalRegister)
        
        this.setState({ 
            name: '',
            description: '',
            publicPlace: '',
            number: '',
            complement: '',
            zipCode: '',
            city: '',
            uf: '',
        })

        alert('Cadastro efetuado com sucesso!!!')
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Cadastrar novo Hospital</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Hospital</h5>
                                <hr/>
 
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nome</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Nome" 
                                                        name="name"
                                                        value={this.state.name} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <h5>Endereço</h5>
                                        <hr/>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Descrição</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Descrição" 
                                                        name="description"
                                                        value={this.state.description} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Logradouro</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Logradouro" 
                                                        name="publicPlace"
                                                        value={this.state.publicPlace} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Número</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Número" 
                                                        name="number"
                                                        value={this.state.number} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Complemento</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Complemento" 
                                                        name="complement"
                                                        value={this.state.complement} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>

                                                <Button 
                                                    type="submit"
                                                    variant="primary">
                                                    Cadastrar
                                                </Button>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>CEP</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="CEP" 
                                                        name="zipCode"
                                                        value={this.state.zipCode} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Cidade</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Cidade" 
                                                        name="city"
                                                        value={this.state.city} 
                                                        onChange={this.handleChange}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>UF</Form.Label>
                                                    <Form.Control 
                                                        as="select"
                                                        placeholder="UF" 
                                                        name="uf"
                                                        value={this.state.uf} 
                                                        onChange={this.handleChange}
                                                    >
                                                        <option>Selecione</option>
                                                        <option>AC</option>
                                                        <option>AL</option>
                                                        <option>AP</option>
                                                        <option>AM</option>
                                                        <option>BA</option>
                                                        <option>CE</option>
                                                        <option>DF</option>
                                                        <option>ES</option>
                                                        <option>GO</option>
                                                        <option>MA</option>
                                                        <option>MT</option>
                                                        <option>MS</option>
                                                        <option>MG</option>
                                                        <option>PA</option>
                                                        <option>PB</option>
                                                        <option>PR</option>
                                                        <option>PE</option>
                                                        <option>PI</option>
                                                        <option>RJ</option>
                                                        <option>RN</option>
                                                        <option>RS</option>
                                                        <option>RO</option>
                                                        <option>RR</option>
                                                        <option>SC</option>
                                                        <option>SP</option>
                                                        <option>SE</option>
                                                        <option>TO</option>
                                                    </Form.Control>
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

export default HospitalRegister;
