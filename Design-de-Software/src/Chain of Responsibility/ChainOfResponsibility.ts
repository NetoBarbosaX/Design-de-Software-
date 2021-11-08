/**
 * A interface Handler declara um método para construir a cadeia de manipuladores.
 * Também declara um método para executar uma solicitação.
 */
 interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: string): string;
}

/**
 * O comportamento de encadeamento padrão pode ser implementado dentro de uma classe de manipulador base.
 */
abstract class AbstractHandler implements Handler
{
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        // Retornar um manipulador a partir daqui nos permitirá vincular manipuladores em um
        // maneira conveniente como esta:
        // monkey.setNext (squirrel) .setNext;
        return handler;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

/**
* Todos os manipuladores de concreto tratam de uma solicitação ou a passam para o próximo manipulador
 * na cadeia.
 */
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`;
        }
        return super.handle(request);

    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'Nut') {
            return `Squirrel: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === 'MeatBall') {
            return `Dog: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

/**
* O código do cliente geralmente é adequado para trabalhar com um único manipulador. Na maioria
 * casos, ele nem mesmo sabe que o manipulador faz parte de uma cadeia.
 */
function clientCode(handler: Handler) {
    const foods = ['Nut', 'Banana', 'Cup of coffee'];

    for (const food of foods) {
        console.log(`Client: Who wants a ${food}?`);

        const result = handler.handle(food);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`  ${food} was left untouched.`);
        }
    }
}

/**
* A outra parte do código do cliente constrói a cadeia real.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * O cliente deve ser capaz de enviar uma solicitação a qualquer manipulador, não apenas ao
 * primeiro na cadeia..
 */
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);