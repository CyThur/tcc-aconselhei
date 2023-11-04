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

O QUE ESTAMOS ENFRENTANDO

Telas PerfilAdv.js e PerfilUsu.js

Caminho: 
src/telasAdv/telasHome/PerfilAdv
src/telasUsu/telasHomeUsu/PerfilUsu

Obs1: quando já tem uma foto existente no Firestore - ex: foto:"link"(string) - se tento tirar uma nova foto para substituir a anterior, dá erro.

Obs2: na "const upload", antes a foto estava indo para o Storage, mas agora não sabemos porque não está indo mais
Dentro dessa const, tem um "if" para que a foto fosse deletada antes de uma nova ser colocada, porém está dando erro (acreditamos que a fonte dos problemas esteja no upload)

Tela: Profissional.js

Caminho: 
src/telasUsu/telasHomeUsu/telasAgendar/Profissional

Obs: gostaríamos de saber se teria como, nessa tela, colocar a foto dos respectivos advogados que aparecem no local