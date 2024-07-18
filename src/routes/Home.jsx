import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from '../axios-config'
import Search from '../components/Search'

import "./Home.css"

const Home = () => {

  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState("")

  const getProdutos = async () => {
    try {
      const res = await axios.get("/produtos");
      setProdutos(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProdutos()
  }, [])

  const produtosFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase()
    return produtos
      .filter((produto) => produto.nome.toLowerCase().includes(lowerBusca))
  }, [busca, produtos])

  return (
    <>
      <Search setBusca={setBusca} />
      <div className='produtos-container'>
        {produtosFiltrados.length === 0 ? (<p>Não existe nenhum produto cadastrado com esse nome</p>) :
          (produtosFiltrados.map((produto) => (
            <div className='produto' key={produto.id}>
              <img src={produto.imagem} />
              <hr />
              <p>{produto.nome}</p>
              <p>R${produto.preco.toFixed(2)}</p>
              <Link to={`/produtos/${produto.id}`}>
                Ver detalhes
              </Link>
            </div>
          )))
        }
      </div>
    </>
  )
}

export default Home