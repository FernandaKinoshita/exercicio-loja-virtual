import React, {
  useContext
} from 'react'

import {
    FlatList,
    Text,
    View
} from 'react-native'

import Produto from '../../components/Produto'

import CarrinhoContext from '../../contexts/CarrinhoContext'

const Carrinho = (props) => {
  const { carrinho } = useContext(CarrinhoContext)
 
    return(
        <View>
          { carrinho.length === 0 && (
          <Text style={{ padding : 8, textAlign : 'center' }}>
            Não há itens no carrinho</Text>
          )}

          <FlatList
          data={ carrinho }
          keyExtractor={ (produto) => produto.id }
          renderItem={({item}) => (
            <Produto produto={item} modoCarrinho={true} />
          )} />

        </View>
    )
}

export default Carrinho