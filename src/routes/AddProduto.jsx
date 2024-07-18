import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from '../axios-config'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { AlertContext } from "../context/AlertContext";

import "./AddProduto.css"

const AddProduto = () => {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [imagem, setImagem] = useState("")
  const [tamanhos, setTamanhos] = useState([{
    tamanho: '', quantidade: ''
  }])

  const {handleAlert} = useContext(AlertContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = {
      nome: nome,
      preco: parseFloat(preco),
      imagem: imagem,
      tamanhos: tamanhos.map((t) => ({ ...t, quantidade: parseInt(t.quantidade, 10) }))
    };

    try {
      await axios.post("/produtos", produto)
      handleAlert(`Produto ${produto.nome} adicionado!`, "success")
      navigate("/")
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const handleAddTamanhoChange = (index, e) => {
    const values = [...tamanhos];
    values[index][e.target.name] = e.target.value;
    setTamanhos(values)
  }

  const handleAddTamanho = () => {
    const ultimoTamanho = tamanhos[tamanhos.length -1];
    if(ultimoTamanho.tamanho && ultimoTamanho.quantidade) {
      setTamanhos([...tamanhos, { tamanho: '', quantidade: '' }])
    } else {
      handleAlert("Preencha todos os campos de tamanho e quantidade", "warning")
    }
  }

  const handleRemoveTamanho = (index) => {
    if (tamanhos.length === 1) return;
    const values = [...tamanhos];
    values.splice(index, 1);
    setTamanhos(values)
  }

  return (
    <div className='add-produto'>

      <Form className="add-form" onSubmit={handleSubmit}>
        <h2>Adicione um novo produto</h2>

        <Form.Group className="mb-2">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Camiseta, Chuteira..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            type="number"
            placeholder="15.99..."
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Link da imagem do produto:</Form.Label>
          <Form.Control
            type="url"
            placeholder="Insira a URL da imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          {tamanhos.map((tamanho, index) => (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Label>Tamanho:</Form.Label>
                  <Form.Control
                    type="text"
                    name="tamanho"
                    placeholder="P, M, G..."
                    value={tamanho.tamanho}
                    onChange={(e) => handleAddTamanhoChange(index, e)}
                    required />
                </Col>
                <Col className="mb-2">
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantidade"
                    value={tamanho.quantidade}
                    placeholder="10, 11, 12..."
                    onChange={(e) => handleAddTamanhoChange(index, e)}
                    required />
                </Col>
                <Button
                  variant="outline-danger"
                  className="mb-2"
                  type="button"
                  onClick={() => handleRemoveTamanho(index)}
                >Remover Tamanho</Button>
                <hr />
              </Row>
            </div>

          ))}
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="outline-dark"
            type="button" onClick={handleAddTamanho}
          >
            Adicionar novo tamanho
          </Button>
          <Button variant="outline-success" type="submit">Cadastrar Produto</Button>
        </div>
      </Form>
    </div>
  )
}

export default AddProduto
