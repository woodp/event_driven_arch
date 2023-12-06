# Prototipo de Arquitectura de Microservicios con comunicación de colas

Este es walking skeleton de un arquitectura de microservicios conectada asincrónicamente a través de colas.

Está formado por los siguientes componentes:

  - Loans service:
    Este servicio es el "producer", luego de crear un loan genera un evento para notificar esto.

  - Notifications service:
    Este servicio es el "consumer", está encargado de las notificaciones y es quien levanta el evento de la creación de un loan.
    Tiene un mecanismo de reintento (retry pattern) que intenta 3 veces o hasta que el mensaje expira (TTL) lo que ocurra primero.
    Los mensajes que no pueden ser procesados luego de los reintentos van a la cola "dead letter".

  - Recovery service:
    Este servicio no está implementado completamente pero es quien levanta la cola *dead letter", la idea de este sería procesar los mensajes que no pudieron ser atendidos, ya sea reprocesándolos o con alguna revisión manual dependiendo del caso.

  - Librería common
    Contiene los eventos de colas (patterns), la interface del payload y las opciones de configuración de las 2 colas utilizadas que son compartidas entre los distintos microservicios.

  - Colas:
      - notifications: es la cola que maneja los mensajes de notificación
      - recovery: es la cola de mensajes que no pudieron ser notificados luego de la estrategia de reintento y/o el tiempo de vida especificado (dead-letter queue)

  - Eventos:
    - CREATE_NOTIFICATION_PATTERN: es el evento que consume el notifications service para generar las notificaciones
    - NOTIFICATION_SUCCESS_PATTERN: evento para informar que la notificación fue realizada exitosamente
    - NOTIFICATION_FAILURE_PATTERN: evento para informar que la notificación y sus reintentos fallaron (message dropped)


![Diagrama de componentes](components.png)

**Nota:** Los nombres de los servicios son sólo a modo de ejemplo ya que la presenta solución es un walking skeleton y por ende no posee lógica de dominio

## Decisiones de arquitectura
En la implementación de este prototipo se decició usar RabbitMQ como gestor de colas por sobre Bull, esta decisión está documentada en el ADR incluído en el repositorio bajo el nombre **Gestion-Colas-02-12-2023.md**. Los attributos de calidad considerados para esta decisión fueron los siguientes:
  - Interoperabilidad
  - Escalabilidad y rendimiento
  - Flexibilidad / Extensibilidad
  - Robustez / Soporte

## Escenarios de prueba

Con el propósito de probar la arquitectura se crearon dos endpoints en el loans service:
  - /POST /api que crea un Loan y se le pasa un tipo (type) en el body para poder probar los distintos escenarios si el tipo es "sms" el servicio de notificaciones fallará, con cualquier otro tipo será exitoso
  - POST /api/batch crea una cantidad de Loans n (según lo indicado en el body), 1 de cada 5 de los loans creados será de tipo "sms"


## Ventajas de usar microservicios:

**Escalabilidad y Flexibilidad:** Los microservicios permiten escalar componentes específicos de manera independiente, lo que facilita la gestión de la carga y la adaptación a cambios en la demanda.
   
**Despliegue Independiente:** Cada microservicio puede ser desplegado de forma independiente, lo que agiliza las actualizaciones y reduce el impacto de errores en otros servicios.

**Tecnología Diversa:** Facilitan la adopción de diferentes tecnologías y lenguajes de programación para cada servicio, permitiendo seleccionar la mejor herramienta para cada tarea.

**Facilitan la Colaboración:** Al estar divididos en servicios más pequeños, varios equipos pueden trabajar en paralelo en diferentes microservicios, mejorando la agilidad y la colaboración.

## Desventajas de usar microservicios:

**Complejidad en la Gestión:** El manejo de múltiples servicios aumenta el esfuerzo incial de implementación ya que implica desarrollar medios de comunicación y coordinación entre los mismos y un mayor esfuerzo para el monitoreo y la administración. Lo que aumenta la complejidad operativa.

**Problemas de Consistencia y Coherencia:** La gestión transacciones y la coherencia de datos entre microservicios puede ser un desafío, lo que lleva a problemas de consistencia en sistemas distribuidos.

**Mayor Latencia:** Las comunicaciones entre microservicios tienen latencia adicional en comparación con aplicaciones monolíticas.

**Costos de Implementación y Mantenimiento:** La adopción de microservicios implica un cambio en la arquitectura y puede requerir inversiones significativas en infraestructura y recursos para el desarrollo y mantenimiento.


## Ventajas de usar colas para comunicar los microservicios

**Desacoplamiento**: Las colas permiten desacoplar los servicios, lo que significa que un servicio no necesita conocer directamente al otro servicio al que envía información. Esto facilita la escalabilidad y la evolución independiente de los servicios.

**Tolerancia a Fallos**: Las colas pueden ayudar a manejar situaciones en las que un servicio está temporalmente inactivo o experimenta problemas técnicos, ya que los mensajes pueden almacenarse en la cola hasta que el servicio destinatario esté listo para procesarlos.

**Mejora en el Rendimiento**: Al permitir el procesamiento asíncrono, las colas pueden mejorar el rendimiento al liberar recursos y permitir que los servicios procesen mensajes en su propio tiempo y capacidad.

## Desventajas  de usar colas para comunicar los microservicios

**Complejidad Adicional**: Introducen complejidad en la arquitectura, ya que se necesita implementar y administrar la lógica para el envío, recepción y gestión de mensajes en las colas.

**Posible Pérdida de Mensajes**: Existe el riesgo de pérdida de mensajes si no se implementan mecanismos adecuados para manejarlos en caso de fallos en la cola o en los servicios.

**Latencia Adicional**: El uso de colas puede introducir latencia adicional en comparación con las comunicaciones directas entre servicios, especialmente en entornos donde se requiere una respuesta inmediata.

**Complejidad de la Gestión de Estado**: Mantener el estado adecuado en un sistema basado en colas puede ser desafiante, ya que puede requerir técnicas especiales para asegurar la coherencia y consistencia de los datos.

En resumen, el uso de colas para la comunicación entre microservicios ofrece beneficios significativos en términos de desacoplamiento y tolerancia a fallos, pero también introduce complejidad adicional que debe ser gestionada y considerada en el diseño y la implementación del sistema.


## Instrucciones para correr el prototipo

### Prerequisitos

- Node v 20 (y npm)
  - Se puede bajar de https://nodejs.org/en/download
  - O usar un package manager como nvm: https://nodejs.org/en/download/package-manager

- Docker

### RabbitMQ

Bajar un instancia dockerizada de RabitMQ

```
docker pull rabbitmq:3-management-alpine
```

```
docker run -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management-alpine
```

### Configuracion
Setear los valores de la configuración en los archivos .env en el root de cada servicio:
- `path-to-app\event_driven_arch\apps\loans-service\.env`
- `path-to-app\event_driven_arch\apps\notifications-service\.env`

- `path-to-app\event_driven_arch\apps\recovery-service\.env`

Los valores a setear se puede ver en el archivo `env.template`

### Instalar dependencias

- Correr `npm i` en el root del workspace `path-to-app\event_driven_arch\`

### Correr los servicios

- Para correr el servicio de loans ejecutar en una consola `npx nx serve loans-service`

- Para correr el servicio de loans ejecutar en una consola `npx nx serve notifications-service`

- Para correr el servicio de recovery (que levanta la dead-letter queue) ejecutar en una consola `npx nx serve recovery-service`

Nota: Para instalar Nx global: `npm install --global nx@latest` (para no tener que usar npx en cada comando)

### Pruebas desde la REST API

Generar un loan con notificación exitosa:
```
curl --location 'http://localhost:3000/api/' \
--header 'Content-Type: application/json' \
--data '{
    "type": "email"
}'
```

Generar un loan con notificación fallida:
```
curl --location 'http://localhost:3000/api/' \
--header 'Content-Type: application/json' \
--data '{
    "type": "sms"
}'
```

Generar un batch de n loans, 1 de cada 5 falla
```
curl --location 'http://localhost:3000/api/batch' \
--header 'Content-Type: application/json' \
--data '{
    "quantity": 30
}'
```
