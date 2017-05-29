+-------------------------------------------------------------------------------+
|   Projeto de aplivativo para a disciplina "Engenharia de Software"            |
|   Instituição:        UFC - Universidade Federal do Ceará                     |
|   Equipe:             FTD - Faz Tudo Developers                               |
|   Professora:         Rossana Andrade                                         |
|   Monitora:           Amanda                                                  |
|   Membros da Equipe:  Victor, Belchior, Helio, Felipe, Leyberson, Paulo       |
+-------------------------------------------------------------------------------+

Galera da FTD, aqui os passos pra clonar este branch, usei windows 7 64 bits, mas acho que no linux é mais simples

ionic versão 3.2.0
cordova versão 7.0.1
node js versão 6.10.2

1 - git clone -b versao2 https://github.com/belchiorneto/cardappio.git
2 - cd cardappio
3 - npm install (pra instalar as dependencias, vá tomar café ...)

a partir daqui já deve estar executável no browser com:
ionic serve

Para compilar a versão android, é necessário:
Cordova platform add android

depois pra rodar:
cordova run android (no caso de testar em um dispositivi físico)