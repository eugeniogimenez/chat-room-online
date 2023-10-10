# CHATROOM ONLINE (TypeScript <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>- Node.js <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>)

## Descripcion General:
El proyecto consiste en un **"chat"**, en donde los participantes se pueden conectar desde dos dispositivos distintos e interactuar en tiempo real.

Se puede generar una sala nueva o retomar una anterior usando un ID que la misma proporciona.

## Uso:
La dirección de la app es: https://chat-room-online.onrender.com

La sala de prueba es:
##### Room de prueba: 1424

> IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras. IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras.

## Front:
Se utiliza como base Typescript <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="20" height="20"/> </a>y se trabaja bajo la arquitectura de Pages y Web Components, los cuales se renderizan vía Router, y gracias al usu de un Stage Manager, los mismos van intercambiando información.

En cuánto al consumo de datos en relación al back, se utiliza "fetch" para consumo de las API´s proporcionadas.

## Back:
El back se construye básicamente con Node.js <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="20" height="20"/> </a>, proporcionando API´s para consumo del Front via fetch, y conectandose a una base de datos NoSQL como es Firebase.

## Tecnologías usadas:

- ##### TypeScript <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="20" height="20"/> </a>
- ##### Node.js <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="20" height="20"/> </a>
- ##### Firebase 
- ##### NoSQL

## Arquitectura:
Se sigue el modelo MVC para trabajar por capas.

## Base de Datos:
Utilización de NoSQL mediante el servicio de Firebase. Se utiliza una Real Time Database para que los usuarios puedan conversar en tiempo real.
