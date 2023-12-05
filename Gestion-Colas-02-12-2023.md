# ADR: Elección de RabbitMQ sobre Bull para la gestión de colas en NestJS

## Contexto

En el desarrollo de esta aplicación basada en NestJS, nos enfrentamos a la necesidad de elegir una solución robusta para la gestión de colas. Tanto Bull como RabbitMQ son opciones populares y sólidas en este ámbito. Bull es una biblioteca de colas en Node.js que ofrece características de rendimiento y facilidad de uso, mientras que RabbitMQ es un servidor de mensajes de código abierto que implementa el protocolo de mensajes Advanced Message Queuing Protocol (AMQP) y proporciona una amplia gama de funcionalidades para la gestión de colas y mensajes.

## Decision

Se decidió utilizar RabbitMQ como el sistema de gestión de colas para esta aplicación NestJS.

## Justificación

### 1. Protocolo robusto y estándar
RabbitMQ implementa el protocolo AMQP, un estándar reconocido y ampliamente adoptado para la mensajería. Esto asegura una comunicación eficiente y fiable entre los diferentes componentes de la aplicación, permitiendo la interoperabilidad con sistemas externos si fuese necesario en el futuro.

### 2. Escalabilidad y rendimiento
RabbitMQ está diseñado para manejar grandes volúmenes de mensajes con eficiencia, ofreciendo opciones de escalabilidad tanto vertical como horizontal. Su capacidad para distribuir la carga de trabajo y manejar múltiples conexiones de manera eficiente es crucial para las necesidades de escalabilidad futuras.

### 3. Funcionalidades avanzadas
RabbitMQ ofrece una amplia gama de características avanzadas, como el enrutamiento flexible, la gestión de colas basada en políticas, confirmaciones de entrega y mecanismos de recuperación en caso de fallas. Estas características proporcionan una mayor flexibilidad y control sobre cómo se manejan los mensajes en el sistema.

### 4. Comunidad y soporte
RabbitMQ cuenta con una comunidad activa y un amplio soporte, lo que significa que hay una gran cantidad de recursos, documentación y ejemplos disponibles. Esto facilita la resolución de problemas y el aprendizaje continuo a medida que avanzamos en el desarrollo de la aplicación.

### 5. Integración con NestJS
Aunque Bull es una opción viable y tiene su propia integración con NestJS, RabbitMQ ofrece una integración sólida y bien mantenida a través de bibliotecas como `@nestjs/microservices` y `amqplib`. Esto nos permite aprovechar las capacidades completas de RabbitMQ dentro del ecosistema de NestJS sin comprometer funcionalidades o rendimiento.

## Consecuencias

Esta decisión implica un período inicial de aprendizaje y familiarización con las especificidades de RabbitMQ, así como la configuración y puesta en marcha de un servidor RabbitMQ en la infraestructura. Sin embargo, creemos que los beneficios a largo plazo en términos de rendimiento, funcionalidad y escalabilidad justifican esta inversión inicial de tiempo y recursos.

## Resumen

La elección de RabbitMQ como el sistema de gestión de colas para la aplicación NestJS se basa en su robustez, escalabilidad, funcionalidades avanzadas y su integración efectiva con el ecosistema de NestJS. Esta decisión se alinea con los requisitos de rendimiento y flexibilidad que buscamos para el desarrollo y crecimiento futuro de la aplicación.