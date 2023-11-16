# EventDrivenArch

## Prerequisitos

- Node v 20 (y npm)
  - Se puede bajar de https://nodejs.org/en/download
  - O usar un package manager como nvm, etc: https://nodejs.org/en/download/package-manager

## Configuracion
Setear los valores de la configuración en los archivos .env en el root de cada servicio:
- `path-to-app\event_driven_arch\apps\loans-service\.env`
- `path-to-app\event_driven_arch\apps\notifications-service\.env`

Los valores a setear se puede ver en el archivo `env.template`

## Instalar dependencias

- Correr `npm i` en el root del workspace `path-to-app\event_driven_arch\`

## Correr los servicios

- Para correr el servicio de loans ejecutar en una consola `npx nx serve loans-service`

- Para correr el servicio de loans ejecutar en una consola `npx nx serve notifications-service`

Nota: Para instalar Nx global: `npm install --global nx@latest` (para no tener que usar npx en cada comando)

## Generar un evento de creación de un loan

`curl --location --request POST 'http://localhost:3000/api/'`
o usar POSTMAN


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
