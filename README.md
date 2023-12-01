# EventDrivenArch

Este es un prototipo que evalúa un walking skeleton de un arquitectura de microservicios conectada asincrónicamente a través de colas.

## Ventajas de usar microservicios:

**Escalabilidad y Flexibilidad:** Los microservicios permiten escalar componentes específicos de manera independiente, lo que facilita la gestión de la carga y la adaptación a cambios en la demanda.
   
**Despliegue Independiente:** Cada microservicio puede ser desplegado de forma independiente, lo que agiliza las actualizaciones y reduce el impacto de errores en otros servicios.

**Tecnología Diversa:** Facilitan la adopción de diferentes tecnologías y lenguajes de programación para cada servicio, permitiendo seleccionar la mejor herramienta para cada tarea.

**Facilitan la Colaboración:** Al estar divididos en servicios más pequeños, varios equipos pueden trabajar en paralelo en diferentes microservicios, mejorando la agilidad y la colaboración.

## Desventajas de usar microservicios:

**Complejidad en la Gestión:** El manejo de múltiples servicios puede aumentar la complejidad operativa, ya que se requiere coordinación entre ellos y un mayor esfuerzo para el monitoreo y la administración.

**Problemas de Consistencia y Coherencia:** La gestión de la coherencia de datos entre microservicios puede ser un desafío, lo que lleva a problemas de consistencia en sistemas distribuidos.

**Mayor Latencia:** Las comunicaciones entre microservicios pueden generar latencia adicional en comparación con aplicaciones monolíticas, especialmente en entornos distribuidos.

**Costos de Implementación y Mantenimiento:** La adopción de microservicios implica un cambio en la arquitectura y puede requerir inversiones significativas en infraestructura y recursos para el desarrollo y mantenimiento.

La decisión de utilizar microservicios debe sopesarse considerando estas ventajas y desventajas, así como las necesidades específicas del proyecto y las capacidades del equipo de desarrollo.


## Ventajas de usar colas para comunicar los microservicios

Desacoplamiento: Las colas permiten desacoplar los servicios, lo que significa que un servicio no necesita conocer directamente a qué otro servicio envía información. Esto facilita la escalabilidad y la evolución independiente de los servicios.

Tolerancia a Fallos: Las colas pueden ayudar a manejar situaciones en las que un servicio está temporalmente inactivo o experimenta problemas técnicos, ya que los mensajes pueden almacenarse en la cola hasta que el servicio destinatario esté listo para procesarlos.

Mejora en el Rendimiento: Al permitir el procesamiento asíncrono, las colas pueden mejorar el rendimiento al liberar recursos y permitir que los servicios procesen mensajes en su propio tiempo y capacidad.

## Desventajas  de usar colas para comunicar los microservicios

Complejidad Adicional: Introducen complejidad en la arquitectura, ya que se necesita implementar y administrar la lógica para el envío, recepción y gestión de mensajes en las colas.

Posible Pérdida de Mensajes: Existe el riesgo de pérdida de mensajes si no se implementan mecanismos adecuados para manejarlos en caso de fallos en la cola o en los servicios.

Latencia Adicional: El uso de colas puede introducir latencia adicional en comparación con las comunicaciones directas entre servicios, especialmente en entornos donde se requiere una respuesta inmediata.

Complejidad de la Gestión de Estado: Mantener el estado adecuado en un sistema basado en colas puede ser desafiante, ya que puede requerir técnicas especiales para asegurar la coherencia y consistencia de los datos.

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

Los valores a setear se puede ver en el archivo `env.template`

### Instalar dependencias

- Correr `npm i` en el root del workspace `path-to-app\event_driven_arch\`

### Correr los servicios

- Para correr el servicio de loans ejecutar en una consola `npx nx serve loans-service`

- Para correr el servicio de loans ejecutar en una consola `npx nx serve notifications-service`

Nota: Para instalar Nx global: `npm install --global nx@latest` (para no tener que usar npx en cada comando)

### Generar un evento de creación de un loan

`curl --location --request POST 'http://localhost:3000/api/'`
o usar POSTMAN

### Correr los tests de integración

`npx nx run loans-service:test e2e`


-----------------------------------------
-----------------------------------------



## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
