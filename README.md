# Toca al Topo

## Descripción

"Toca al Topo" es una Progressive Web App (PWA) basada en el clásico juego de arcade "Whac-A-Mole". El objetivo del juego es tocar al topo que aparece en diferentes posiciones en un tablero de 3x3 antes de que desaparezca. El juego incluye diferentes niveles de dificultad que afectan la velocidad a la que los topos aparecen y desaparecen.

Este proyecto fue desarrollado utilizando Vue 3 y Vite, y es completamente funcional offline gracias a la implementación de Service Workers.

## Características

- **Modo offline**: El juego sigue funcionando aunque el dispositivo esté sin conexión a Internet.
- **Diferentes niveles de dificultad**: Bajo, Medio y Alto, que afectan la velocidad de aparición de los topos.
- **Puntuación dinámica**: La puntuación se actualiza en tiempo real según el nivel de dificultad.
- **Experiencia táctil mejorada**: Vibración del dispositivo al "matar" un topo (solo en dispositivos que soportan vibración).
- **Despliegue continuo**: La aplicación está desplegada en Github Pages y disponible públicamente.

## Tecnologías Utilizadas

- **Vue 3**: Framework progresivo de JavaScript para la construcción de interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para Vue.js que permite una configuración mínima y un bundling eficiente.
- **Vue Router**: Manejador de rutas para Vue.js.
- **Service Workers**: Para soportar el modo offline de la aplicación.

## Instalación y Configuración

Sigue estos pasos para clonar el proyecto y ejecutarlo en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/SantiCeballos/SantiCeballos.github.io.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd SantiCeballos.github.io
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:3000` para ver la aplicación en acción.

## Tests

Este proyecto incluye tests unitarios para los componentes clave de la aplicación.

Para ejecutar los tests, usa el siguiente comando:

```bash
npm run test
```
