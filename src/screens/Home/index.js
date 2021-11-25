import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import {
    FlatList,
    Text,
    View
} from 'react-native'

import {
    Button
} from 'react-native-elements'

import Produto from '../../components/Produto'

import produtos from "../../data/produtos.json"

import CarrinhoContext from '../../contexts/CarrinhoContext'

import { formatacaoMoedaReal } from '../../utils'

const Home = (props) => {

  const [total, setTotal] = useState(0)

  const { carrinho } = useContext(CarrinhoContext)

  const visualizarCarrinho = () => {
    props.navigation.navigate('carrinho')
  }

  useEffect(() => {
    let totalCarrinho = 0
    carrinho.forEach((produto)=> {
      totalCarrinho += parseInt(produto.quantidade) * parseFloat(produto.valor)
    })
    setTotal(totalCarrinho)      
    }, [carrinho])
  

    return(
        <View style={{ paddingBottom : 50 }}>
          <Button 
            buttonStyle={{ backgroundColor : '#050'}}
            icon={{
              color : '#FFF',
              name : 'shopping-cart',
              type : 'font-awesome-5'
            }}
            onPress={() => visualizarCarrinho()}
            title={ `Visualizar carrinho (${formatacaoMoedaReal(total)})`}/>

          <FlatList 
            data={ produtos }
            keyExtractor={(produto) => produto.id}
            renderItem={({item}) => (
              <Produto produto={ item }/>
            )}/>
        </View>
    )
}

export default Home