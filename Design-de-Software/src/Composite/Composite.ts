/**
 *A classe base Component declara operações comuns tanto para simples como
 * objetos complexos de uma composição.
 */
 abstract class Component {
    protected parent: Component;

    /**
     * Opcionalmente, o componente base pode declarar uma interface para configuração e
     * acessando um pai do componente em uma estrutura de árvore. Também pode
     * fornecer alguma implementação padrão para esses métodos.
     */
    public setParent(parent: Component) {
        this.parent = parent;
    }

    public getParent(): Component {
        return this.parent;
    }

    /**
     * Em alguns casos, seria benéfico definir o manejo da criança
     * operações diretamente na classe de componente base. Dessa forma, você não precisará
     * expor quaisquer classes de componentes concretos ao código do cliente, mesmo durante o
     * montagem de árvore de objeto. A desvantagem é que esses métodos estarão vazios
     * para os componentes de nível folha.
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    /**
     * Você pode fornecer um método que permite ao código do cliente descobrir se um
     * O componente pode ter filhos.
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * O componente base pode implementar algum comportamento padrão ou deixá-lo para
     * classes concretas (declarando o método que contém o comportamento como
     * "resumo").
     */
    public abstract operation(): string;
}

/**
 * A classe Leaf representa os objetos finais de uma composição. Uma folha não pode ter
 * qualquer criança.
 *
 * Normalmente, são os objetos Leaf que fazem o trabalho real, enquanto o Composite
 * objetos apenas delegam a seus subcomponentes.
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

/**
 * A classe Composite representa os componentes complexos que podem ter filhos.
 * Normalmente, os objetos Composite delegam o trabalho real a seus filhos e
 * então "some" o resultado.
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * Um objeto composto pode adicionar ou remover outros componentes (simples ou
     * complexo) para ou de sua lista de filhos.
     */
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * O Composite executa sua lógica primária de uma maneira particular. Isto
     * atravessa recursivamente todos os seus filhos, coletando e somando
     * seus resultados. Uma vez que os filhos do composto passam essas chamadas para seus
     * filhos e assim por diante, toda a árvore de objetos é percorrida como resultado.
     */
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}

/**
 * O código do cliente funciona com todos os componentes por meio da interface base.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * Desta forma, o código do cliente pode suportar os componentes folha simples ...
 */
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...bem como os compostos complexos.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
 * Graças ao fato de que as operações de gerenciamento de crianças são declaradas no
 * classe de componente base, o código do cliente pode funcionar com qualquer componente, simples ou
 * complexo, sem depender de suas classes concretas.
 */
function clientCode2(component1: Component, component2: Component) {
    // ...

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);

    // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);