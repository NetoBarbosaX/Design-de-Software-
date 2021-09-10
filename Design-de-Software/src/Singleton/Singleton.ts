export class Singleton{

    //O construtor do Singleton deve ser sempre privado para evitar chamadas em outras instancias new
    private static instance: Singleton;

    //definindo tipo do nome
    public name?: string;

    //definindo nome
    private constructor(){
        this.name= 'João'
    }

    //O método static que controla o acesso à instância singleton. Esta implementação permite que você crie uma subclasse da classe Singleton enquanto mantém apenas uma instância de cada subclasse.

    public static getInstance(): Singleton{
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}