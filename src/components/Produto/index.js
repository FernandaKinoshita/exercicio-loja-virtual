import React, {
  useContext,
  useState
} from "react";

import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native'

import{
  Button,
  Input
} from 'react-native-elements'

import CarrinhoContext from "../../contexts/CarrinhoContext";

import { formatacaoMoedaReal } from "../../utils";

const Produto = (props) => {

  const { ACTIONS, dispatch } = useContext(CarrinhoContext)

  const { produto, modoCarrinho } = props
  const [quantidade, setQuantidade] = useState(
    modoCarrinho 
    ? produto.quantidade.toString()
     : '1'
  )

  const validarQuantidade = () => {
    if (quantidade.trim().length === 0 ) {
      Alert.alert('Erro', 'Informe uma quantidade!')
      return false
    }

    if ( ! /^\d+$/.test(quantidade) ) {
      Alert.alert('Erro', 'Quantidade precisa ser um número positivo!')
      return false
    }
    
    if ( parseInt(quantidade) < 1 ){
      Alert.alert('Erro', 'Informe uma quantidade maior que zero!')
      return false
    }

    return true
  }

  const adicionarAoCarrinho = () => {
    if (validarQuantidade() ) {
      dispatch({ 
        type : ACTIONS.ADICIONAR, 
        payload : {
          produto : produto,
          quantidade : parseInt(quantidade)
        }
       })
       Alert.alert('Sucesso', 'Produto adicionado ao carrinho!')
       setQuantidade('1')
    }

  }

  const atualizarCarrinho = () => {
    if (validarQuantidade()) {
      dispatch ({
        type : ACTIONS.ATUALIZAR,
        payload : {
          produto : produto,
          quantidade : parseInt(quantidade)
        }
      })

      Alert.alert('Sucesso', 'Produto atualizado no carrinho!')
    }
  }

  const excluirCarrinho = () => {
    dispatch({
      type : ACTIONS.REMOVER,
      payload : { produto }
    })

    Alert.alert('Sucesso', 'Produto removido do carrinho!')
 }
  return(
    <View style={ estilos.container }>
      <Text style={estilos.nome}>
        { produto.nome }</Text>

      <Text style={ estilos.valor }>
        {formatacaoMoedaReal (produto.valor) }
      </Text>

      <Input       
        onChangeText={(txt) => setQuantidade(txt)}
        style={ estilos.quantidade }
        value={ quantidade } />


      {modoCarrinho && (
        <>
        <Button 
          icon={{
            color : '#FFF',
            name : 'sync',
            type : 'font-awesome-5'
          }}
          onPress={() => atualizarCarrinho()}
          title='Atualizar'/>

          <View style={{ marginBottom : 8 }}/>

        <Button 
        buttonStyle={{ backgroundColor : '#F00'}}
          icon={{
            color : '#FFF',
            name : 'trash',
            type : 'font-awesome-5'
          }}
          onPress={() => excluirCarrinho()}
          title='Excluir'/>
          </>

      ) || (
        <Button 
          icon={{
            color : '#FFF',
            name : 'shopping-cart',
            type : 'font-awesome-5'
          }}
          onPress={() => adicionarAoCarrinho()}
          title='Adicionar ao carrinho'/>

      )}
      
    </View>
  )
}

const estilos = StyleSheet.create({
  container : {
    padding : 16
  },
  nome : {
    fontSize : 18,
    fontWeight : 'bold'
  },

  quantidade : {
    textAlign : 'center'
  },

  valor : {
    color : "#050",
    fontSize : 24,
    fontWeight : 'bold'
  }
})

export default Produto