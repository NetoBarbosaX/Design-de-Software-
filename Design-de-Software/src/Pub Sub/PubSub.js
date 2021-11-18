//Começo criando uma classe com o nome PubSub e em seu construtor eu adicionei um objeto vazio na propriedade subscribers. Esse objeto vai armazenar os eventos cadastrados, cada evento sendo uma propriedade do objeto e cada propriedade recebendo um array de subscribers.
class PubSub {
  constructor() {
    this.subscribers = {};
  }
//O método subscribe recebe uma string e uma função como parâmetro, essa string sera o nome do evento e a função é um subscriber, em seguida é preciso validar se o array de subscribers esta vazio para distribui-lo em um novo array junto a função passada por parâmetro ou colocar a função em um array vazio e por fim atribui a propriedade subscribers.
  subscribe(event, fn) {
    if (Array.isArray(this.subscribers[event])) {
      this.subscribers[event] = [...this.subscribers[event], fn];
    } else {
      this.subscribers[event] = [fn];
    }
    return () => {
      this.unsubscribe(event, fn);
    };
  }
//Unsubscribe é o método responsável por filtrar os subscribers, ele recebe o evento e o subscriber por parâmetro e remove o mesmo da lista.
  unsubscribe(event, fn) {
    this.subscribers[event] = this.subscribers[event].filter(
      (sub) => sub !== fn
    );
  }
//Publish é o método que vai percorrer a lista de observers e executar cada um passando os dados que o mesmo recebe por parâmetro.
  publish(event, data) {
    if (Array.isArray(this.subscribers[event])) {
      this.subscribers[event].forEach((sub) => {
        sub(data);
      });
    }
    return false;
  }
}
//No final exporto um objeto da classe para não precisar usar new onde o recurso for utilizado.
export default new PubSub();