=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Olá! Criamos esse arquivo para centralizar todas as dúvidas num lugar só, dentro dos arquivos do projeto

PROBLEMAS

Obs: os problemas foram comentados no código indicados por !!!!

1) Foto de perfil (tanto de usuários comuns como advogados)
2) Agendar consultoria
3) O usuário conseguir enviar solicitação (dúvida) para o advogado -> essa tela ainda não existe nos códigos
4) Advogado enviar link da reunião para usuário
5) Atualização de dados no banco de dados
6) Como conectar os arquivos numa bucket do S3, e qual o grau de dificuldade disso (um de nós possui a AWS Practitioner)
7) API para validação da OAB

#################################################################################################################

Uma dúvida, vocês estão criando o banco de dados na mão ou estão utilizando migrations? 
R: Estamos utilizando o Firestore (dados em geral) e o Storage (apenas para as imagens) como banco de dados, são serviços do Firebase. Acha que seria mais conveniente trocar para uma migrations?
Migrations é uma forma de gerar os bancos por meio de comandos, não é um serviço em específico, questionei mais para eu conseguir realizar testes com banco local de maneira mais fácil, mas se não tiver sem problemas.

2,4 - Para essas dúvidas imagino que o SNS da Amazon acabe ficando caro com o decorrer do tempo, então recomendo utilizarem uma solução mais convencional que seria a notificação por email:
- https://react.email/docs/introduction 
Esse site tem muitos exemplos e é bem prático de configurar:
- https://react.email/docs/getting-started/automatic-setup

3 - Para o usuário conseguir enviar a solicitação poderia ser algo simples, como uma caixa de texto dentro de um modal que tivesse um input que recebesse a mensagem do usuário e enviasse para o Advogado via email, além disso esse modal só abriria quando a data/hora estivesse livre dentro do período selecionado pelo usuário. Esse período vocês só salvariam quando o advogado aceitasse a solicitação dentro do email, para isso dentro do email além da proposta vocês também poderiam enviar dois links, um que redirecionasse o advogado para um tela que negasse a proposta e vice versa.

1,6 - Conectar os arquivos em um bucket S3 é relativamente fácil, vai depender da infraestrutura do código de vocês, encontrei esse post que explica bem direitinho como subir utilizando react:
- https://medium.com/how-to-react/how-to-upload-files-on-an-s3-bucket-in-react-js-97a3ccd519d1
Além de ensinar como configurar as permissões dentro da AWS.

7 - Para a validação da OAB encontrei o endpoint:
- https://cna.oab.org.br/Home/Search?NomeAdvo=NomeDoAdvogado
,mas ele precisa de uma ferramenta para quebra de captcha, eu não sei quanto tempo vocês ainda possuem restante, mas existem ferramentas pagas que fazem isso como a:
- https://brightdata.com/products/scraping-browser
Mas implementar uma ferramenta dessa talvez leve um tempo considerável, além de ser paga. Outras API para validação de OAB são todas pagas.

Por enquanto consegui analisar essas pessoal, conforme for liberando tempo eu vou comentando mais... só para eu ficar por dentro, qual que é a data limite para vocês entregarem esse trabalho? 
R: A entrega desse projeto é no dia 24/11, mas queremos MUITO deixar pronto até o dia 15/11

#################################################################################################################

O QUE ESTAMOS ENFRENTANDO

Telas PerfilAdv.js e PerfilUsu.js

Caminho: 
src/telasAdv/telasHome/PerfilAdv
src/telasUsu/telasHomeUsu/PerfilUsu

Obs1: quando já tem uma foto existente no Firestore - ex: foto:"link"(string) - se tento tirar uma nova foto para substituir a anterior, dá erro.
------> Poderiam mandar o texto ou um print com o erro?

Obs2: na "const upload", antes a foto estava indo para o Storage, mas agora não sabemos porque não está indo mais
Dentro dessa const, tem um "if" para que a foto fosse deletada antes de uma nova ser colocada, porém está dando erro (acreditamos que a fonte dos problemas esteja no upload)

Por questão de ambiente eu só consigo testar a versão web no meu PC que possui uma limitação, o FileSystem.getInfoAsync() do expo não tem suporte para a versão Web então não consigo seguir com o teste além disso sem ter que fazer muitas alterações no código:

![image](https://github.com/CyThur/tcc-aconselhei/assets/69431917/665333c3-1e3d-4190-91e4-75dcf12584a3)

> Eu não tenho tanta experiência com React Native, mas encontrei uma possível falha de lógica nesse if de deletar a foto:

![image](https://github.com/CyThur/tcc-aconselhei/assets/69431917/bef3d64c-3c9b-4e7a-9cfb-abcf4c3a33c4)

> Se a foto não for nula ele entra dentro da função deleteFoto que não faz o uploadBytes com o blob e o novo filename, então é como se a nova foto nunca subisse:

![image](https://github.com/CyThur/tcc-aconselhei/assets/69431917/402dc944-0497-40f2-9deb-4f8aa467df8d)
> Tentem ir debugando o código com console.log até encontrar um ponto em que o código quebre e aí me enviem esse lugar junto com o código aqui para mim. 



Tela: Profissional.js

Caminho: 
src/telasUsu/telasHomeUsu/telasAgendar/Profissional

Obs: gostaríamos de saber se teria como, nessa tela, colocar a foto dos respectivos advogados que aparecem no local
