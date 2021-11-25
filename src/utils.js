export const formatacaoMoedaReal = (valor) => {
  return `R$ ${ valor.toFixed(2).toString().replace('.', ',')}`}