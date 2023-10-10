# CHATROOM ONLINE (TypeScript - Node.js)

## Descripcion General:
El proyecto consiste en un **"chat"**, en donde los participantes se pueden conectar desde dos dispositivos distintos e interactuar en tiempo real.

Se puede generar una sala nueva o retomar una anterior usando un ID que la misma proporciona.

## Uso:
La dirección de la app es: https://chat-room-online.onrender.com

La sala de prueba es:
##### Room de prueba: 1234

> IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras. IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras.

## Front:
Se utiliza como base Typescript y se trabaja bajo la arquitectura de Pages y Web Components, los cuales se renderizan vía Router, y gracias al usu de un Stage Manager, los mismos van intercambiando información.

En cuánto al consumo de datos en relación al back, se utiliza "fetch" para consumo de las API´s proporcionadas.

## Back:
El back se construye básicamente con Node.js, proporcionando API´s para consumo del Front via fetch, y conectandose a una base de datos NoSQL como es Firebase.

- ##### JAVA 
- ##### Servlets
- ##### Docker 
- ##### MySQL
- ##### JPA (EclipseLink)
- ##### JSP
- ##### Boostrap 

## Arquitectura:
Se sigue el modelo MVC para trabajar por capas, principalmente las de Logica y Persistencia.

## Base de Datos:
Utilización de MySQL <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="30" height="30"/> </a> mediante el servicio de Clever Cloud.

## Docker <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>:
La app se dockerizó para su posterior despliegue.

## Diagrama UML:
Se adjunta el diagrama UML donde se muestran las distintas relaciones de clases.

https://drive.google.com/file/d/13NLkbEsxkjllju42LSSjwZ-1V499CiKj/view?usp=sharing

