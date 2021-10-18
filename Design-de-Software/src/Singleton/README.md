Conceito
Singleton é um padrão de projeto de software. Este padrão garante a existência de apenas uma instância de uma classe, mantendo um ponto global de acesso ao seu objeto.
A forma mais simples de criar um objeto Singleton é criando uma classe que possui um construtor privado e uma instância estática dela mesma

Aplicabilidade
Utilize o padrão Singleton quando uma classe em seu programa deve ter apenas uma instância disponível para todos seus clientes; por exemplo, um objeto de base de dados único compartilhado por diferentes partes do programa.
Utilize o padrão Singleton quando você precisa de um controle mais estrito sobre as variáveis globais.