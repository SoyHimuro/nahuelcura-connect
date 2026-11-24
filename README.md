# Nahuelcura Connect — prototipo móvil

Aplicación inicial creada con Expo + React Native + TypeScript.

## Ejecutar en Windows o Mac

1. Instala Node.js LTS: https://nodejs.org/
2. Descomprime el proyecto.
3. Abre una terminal dentro de la carpeta `nahuelcura-connect`.
4. Ejecuta:

```bash
npm install
npx expo start
```

5. Instala Expo Go en tu teléfono y escanea el QR que muestra la terminal.

## Qué incluye este prototipo

- Navegación: Inicio, Calendario, Calificaciones, Profesores y Perfil.
- Identidad visual rojo, gris grafito y blanco.
- Datos de demostración.
- Promedios simples y ponderados en el módulo de calificaciones.
- Cambio entre vista de estudiante y profesor para probar la interfaz.
- Formulario de demostración para agregar y quitar notas.
- Perfil con promedio, mensajes motivacionales e insignias ilustrativas.

## Importante: qué falta para producción

Esta versión funciona como prototipo local. No tiene todavía:
- Inicio de sesión real ni validación del dominio institucional.
- Base de datos compartida ni sincronización entre celulares.
- Roles y permisos seguros en servidor.
- Notas oficiales ni integración con el sistema académico del colegio.
- Notificaciones push reales.
- Correos reales de profesores ni calendario oficial.

Para convertirlo en una plataforma real se necesita autorización del Colegio Nahuelcura, dominio institucional, listado de cursos/asignaturas/docentes y configuración de Supabase con políticas de seguridad. El selector de rol de esta demo solo sirve para probar pantallas y **no es un control de acceso seguro**.

Las fechas, notas, nombres y reconocimientos incluidos son ficticios. No utilizar para registrar información académica real.

## Generar un APK instalable para Android

La configuración `eas.json` incluye un perfil `preview` que genera un archivo APK.

1. Instala Node.js LTS y abre una terminal en esta carpeta.
2. Instala las dependencias: `npm install`
3. Instala EAS CLI: `npm install -g eas-cli`
4. Inicia sesión con tu cuenta Expo: `eas login`
5. Configura el proyecto: `eas build:configure`
6. Solicita el APK: `eas build --platform android --profile preview`
7. Cuando termine la compilación en la nube, abre el enlace que entrega EAS y descarga el APK en tu Android.

La compilación en la nube requiere una cuenta Expo y conexión a internet. Para publicar en Google Play se recomienda el perfil `production`, que genera un Android App Bundle (AAB).
