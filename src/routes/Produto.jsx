import axios from '../axios-config';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoAdd from '../assets/images/adicionar.png'
import logoDiminuir from '../assets/images/diminuir.png'

import { AlertContext } from '../context/AlertContext';

import "./Produto.css"

const Produto = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    const {handleAlert} = useContext(AlertContext) 

    const getProduto = async () => {
        try {
            const res = await axios.get(`/produtos/${id}`);
            setProduto(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProduto()
    }, [id])

    const updateQuantidade = async (tamanhoIndex, operacao) => {

        const updateTamanhos = produto.tamanhos.map((tamanho, index) => {
            if(index === tamanhoIndex) {
                const novaQuantidade = tamanho.quantidade + operacao;
                if (novaQuantidade < 0) {
                    handleAlert("Não possuí nenhum item em estoque para remoção!", "warning")
                    return tamanho;
                } 
                handleAlert("Quantidade em estoque alterado!", "info")
                return {
                    ...tamanho,
                    quantidade: novaQuantidade
                };
            }
            return tamanho;
        });

        try {
            await axios.patch(`/produtos/${id}`, {tamanhos: updateTamanhos})
            setProduto(prevProduto => ({
                ...prevProduto,
                tamanhos: updateTamanhos
            }));
        } catch (error) {
            console.log(error)
        }
    }

    if (!produto) return <p>Carregando...</p>
    return (
        <div className='produto-container'>
            <div className='produto-page'>
                <img src={produto.imagem} alt={produto.nome} />
                <h2>{produto.nome}</h2>
                <p>R${produto.preco.toFixed(2)}</p>
                <div className="produto-info">
                    <table >
                        <thead>
                            <tr>
                                <th>Tamanho:</th>
                                <th>Quantidade:</th>
                                <th>Acões:</th>
                            </tr>
                        </thead>
                        {produto.tamanhos.map((tamanho, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{tamanho.tamanho}</td>
                                    <td>{tamanho.quantidade}</td>
                                    <td>
                                        <img 
                                            src={logoAdd} 
                                            alt="Botao add" 
                                            onClick={() => updateQuantidade(index, 1)} 
                                        />  
                                        <img 
                                            src={logoDiminuir} 
                                            alt="Botao diminuir"  
                                            onClick={() => updateQuantidade(index, -1 )}
                                        /> 
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Produto