import React, {
  createContext,
  useReducer
} from "react";


const CarrinhoContext = createContext()

const INDEX_PRODUTO_NAO_EXISTE = -1

const ACTIONS = {
  ADICIONAR : "ADICIONAR",
  REMOVER : "REMOVER",
  ATUALIZAR : "ATUALIZAR",
  LIMPAR : "LIMPAR"    
}


/**
 * Retorna o índice no array de carrinho caso o produto já existir.
 * Caso contrário, retorna -1
 * @param {array} stateAtual 
 * @param {int} idProduto 
 * @returns  {int}
 */
const indexSeProdutoJaExistir = (stateAtual, idProduto) => {
  return stateAtual.findIndex((el) => el.id === idProduto)
}


/**
 * Adiciona um novo produto ao carrinho
 * @param {array} stateAtual 
 * @param {json} action 
 * @returns {array}
 */
const adicionar = (stateAtual, action) => {
  const { produto, quantidade } = action.payload
  const index = indexSeProdutoJaExistir(stateAtual, action.payload.produto.id)

  if ( index === INDEX_PRODUTO_NAO_EXISTE) {
    stateAtual.push({...produto, quantidade })
  }else {
    const quantidadeAtual = parseInt(stateAtual[index].quantidade)
    stateAtual[index].quantidade = quantidadeAtual + parseInt(quantidade)
  }

  return [...stateAtual]
}


/**
 * Remove um item do carrinho
 * @param {array} stateAtual 
 * @param {json} action 
 * @returns {array}
 */
const remover = (stateAtual, action) => {
  const {produto} = action.payload
  const index = indexSeProdutoJaExistir(stateAtual, produto.id)

  if (index > INDEX_PRODUTO_NAO_EXISTE ) {
    stateAtual.splice(index, 1)
  }

  return[...stateAtual]
}

/**
 * Atualiza a quantidade de um produto no carrinho
 * @param {array} stateAtual 
 * @param {json} action 
 * @returns {array}
 */
const atualizar = (stateAtual, action) => {
  const { produto, quantidade } = action.payload
  const index = indexSeProdutoJaExistir(stateAtual, produto.id)

  if ( index !== INDEX_PRODUTO_NAO_EXISTE) {
    stateAtual[index].quantidade = parseInt(quantidade)
  }
  return[...stateAtual]
}


const reducer = (stateAtual, action) => {
  switch ( action.type ) {
    case ACTIONS.ADICIONAR:
      return adicionar(stateAtual, action)

    case ACTIONS.REMOVER:
      return remover(stateAtual, action)

    case ACTIONS.ATUALIZAR:
      return atualizar(stateAtual, action)

    case ACTIONS.LIMPAR:
      return[]
    default:
      return [...stateAtual]
  }
}

const CarrinhoProvider = (props) => {

  const [carrinho, dispatch ] = useReducer(reducer, [])

  return (
    <CarrinhoContext.Provider value={{ carrinho, dispatch, ACTIONS }}>
      { props.children }
    </CarrinhoContext.Provider>
  )
}

export { CarrinhoProvider }
export default CarrinhoContext