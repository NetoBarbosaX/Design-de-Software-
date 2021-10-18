Adapter

O Adapter atua como um wrapper entre dois objetos. Ele captura chamadas para um objeto e as deixa reconhecíveis tanto em formato como interface para este segundo objeto.
É bastante comum no código TypeScript. É frequentemente usado em sistemas baseados em algum código legado. Nesses casos, os adaptadores criam código legado com classes modernas.

Aplicabilidade

Utilize a classe Adaptador quando você quer usar uma classe existente, mas sua interface não for compatível com o resto do seu código.
Utilize o padrão quando você quer reutilizar diversas subclasses existentes que não possuam alguma funcionalidade comum que não pode ser adicionada a superclasse.