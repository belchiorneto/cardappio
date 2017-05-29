+-------------------------------------------------------------------------------+<br />
|   Projeto de aplivativo para a disciplina "Engenharia de Software"            |<br />
|   Instituição:        UFC - Universidade Federal do Ceará                     |<br />
|   Equipe:             FTD - Faz Tudo Developers                               |<br />
|   Professora:         Rossana Andrade                                         |<br />
|   Monitora:           Amanda                                                  |<br />
|   Membros da Equipe:  Victor, Belchior, Helio, Felipe, Leyberson, Paulo       |<br />
+-------------------------------------------------------------------------------+<br />
<br />
Galera da FTD, aqui os passos pra clonar este branch, usei windows 7 64 bits, mas acho que no linux é mais simples<br />
<br />
ionic versão 3.2.0<br />
cordova versão 7.0.1<br />
node js versão 6.10.2<br />
<br />
1 - git clone -b versao2 https://github.com/belchiorneto/cardappio.git<br />
2 - cd cardappio<br />
3 - npm install (pra instalar as dependencias, vá tomar café ...)<br />
<br />
a partir daqui já deve estar executável no browser com:<br />
ionic serve<br />
<br />
Para compilar a versão android, é necessário:<br />
Cordova platform add android<br />
<br />
depois pra rodar:<br />
cordova run android (no caso de testar em um dispositivi físico)<br />