Este padrão pode ser muito útil quando você deseja enviar um certo evento e deseja que somente os interessados nesse determinado assunto sejam notificados. Nesse ponto percebemos uma diferença com o Observer, pois este não possui um em sua lógica de implementação a condição de selecionar o evento que deseja publicar, e nem de pode escolher o evento que 
deseja se inscrever.

Enquanto no Observer você dispara um único evento e todos os inscritos são notificados do evento, no Publisher-Subscriber é necessário definir o evento que será publicado e que deseja se inscrever deve declarar o evento que possuí interesse.

Exemplo do Codigo em funcionamento:
