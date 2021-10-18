/**
 * A classe Creator declara o Método Factory, e que deve retornar um objeto da classe produto.
 */
 abstract class Creator {
    /**
     * O criador também pode fornecer alguma implementação do Factory
     */
    public abstract factoryMethod(): Product;

    /**
     * A principal responsabilidade do Creator é analisar se contém uma logica de negócios central que depende dos objetos do Produto, retornados pelo Factory
     * as subclasses podem alterar indiretamente essa lógica de negócios, substituindo o método Factory e devolvendo um tipo diferente de produto
     */
    public someOperation(): string {
        // Chamada do Factory para criar um objeto Produto.
        const product = this.factoryMethod();
        //Após a criação o Produto pode ser utilizado
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * O Concrete Creator substitui o método Factory para alterar o tipo de produto resultante
 */
class ConcreteCreator1 extends Creator {
    /**
     * O método ainda usa o produto de maneira abstrata, mesmo que o produto concreto
     * seja retornado do metodo. Desta forma o Creator pode permanecer indepente do Concrete Product.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * A interface Product vai declarar as operações que todos os Concrete Products devem implementar.
 */
interface Product {
    operation(): string;
}

/**
 * Os Concrete Products fornecem várias implementações da interface do Produto
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * O código do cliente funcina como uma instancia de uma Concrete Creator, por meio de sua interface base.
 * Contanto que o cliente continue operando com o criador via interface base, voce pode envia-la para qualquer subclasse do Creator.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * O aplicativo escolhe um Creator Type, dependendo da configuração do ambiente.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());