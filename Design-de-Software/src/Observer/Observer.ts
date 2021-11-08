/**
 *A interface do Assunto declara um conjunto de métodos para gerenciar assinantes.
 */
 interface Subject {
    // Attach an observer to the subject.
    attach(observer: Observer): void;

    // Detach an observer from the subject.
    detach(observer: Observer): void;

    // Notify all observers about an event.
    notify(): void;
}

/**
* O Assunto possui algum estado importante e notifica os observadores quando o estado
 * alterar.
 */
class ConcreteSubject implements Subject {
    /**
     * @type {number} Por uma questão de simplicidade, o estado do assunto, essencial
     * para todos os assinantes, é armazenado nesta variável.
     */
    public state: number;

    /**
     * @type {Observer[]} Lista de assinantes. Na vida real, a lista de
     * os assinantes podem ser armazenados de forma mais abrangente (categorizados por evento
     */
    private observers: Observer[] = [];

    /**
     * Os métodos de gerenciamento de assinatura.
     */
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    /**
     * Acione uma atualização em cada assinante.
     */
    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Normalmente, a lógica de inscrição é apenas uma fração do que um Assunto pode
     * realmente. Os assuntos geralmente possuem alguma lógica de negócios importante, que
     * aciona um método de notificação sempre que algo importante está prestes a
     * acontecer (ou depois).
     */
    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notify();
    }
}

/**
 * A interface do Observer declara o método de atualização, usado pelos sujeitos.
 */
interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
}

/**
 * Os Observadores Concretos reagem às atualizações emitidas pelo Assunto que foram
 * anexado.
 */
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}

/**
 * O código do cliente.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observer2);

subject.someBusinessLogic();