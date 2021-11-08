/**
* A interface do componente declara um método `aceitar` que deve tomar a base
 * interface do visitante como um argumento.
 */
 interface Component {
    accept(visitor: Visitor): void;
}

/**
 * Cada componente concreto deve implementar o método `aceitar` de tal forma que
 * chama o método do visitante correspondente à classe do componente.
 */
class ConcreteComponentA implements Component {
    /**
    * Observe que estamos chamando `visitConcreteComponentA`, que corresponde ao
     * nome da classe atual. Desta forma, permitimos ao visitante conhecer a turma do
     * componente com o qual funciona.
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);
    }

    /**
     * Componentes de concreto podem ter métodos especiais que não existem em seus
     * classe base ou interface. O visitante ainda é capaz de usar esses métodos
     * já que está ciente da classe concreta do componente.
     */
    public exclusiveMethodOfConcreteComponentA(): string {
        return 'A';
    }
}

class ConcreteComponentB implements Component {
    /**
     * O mesmo aqui: visitConcreteComponentB => ConcreteComponentB
     */
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);
    }

    public specialMethodOfConcreteComponentB(): string {
        return 'B';
    }
}

/**
 * A Interface do Visitante declara um conjunto de métodos de visita que correspondem a
 * classes de componentes. A assinatura de um método de visita permite ao visitante
 * identificar a classe exata do componente com o qual está lidando.
 */
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;

    visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * Os visitantes concretos implementam várias versões do mesmo algoritmo, que podem
 * trabalhar com todas as classes de componentes concretos.
 *
 * Você pode experimentar o maior benefício do padrão Visitante ao usá-lo
 * com uma estrutura de objeto complexa, como uma árvore composta. Neste caso,
 * pode ser útil para armazenar algum estado intermediário do algoritmo enquanto
 * execução de métodos do visitante sobre vários objetos da estrutura.
 */
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
}

class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
}

/**
 * O código do cliente pode executar operações de visitante em qualquer conjunto de elementos sem
 * descobrir suas classes concretas. A operação de aceitação direciona uma chamada para
 * a operação apropriada no objeto visitante.
 */
function clientCode(components: Component[], visitor: Visitor) {
    // ...
    for (const component of components) {
        component.accept(visitor);
    }
    // ...
}

const components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);