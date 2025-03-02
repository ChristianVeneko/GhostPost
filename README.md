# GhostPost

GhostPost es una aplicación web estilo NGL.link que permite a los usuarios recibir mensajes anónimos a través de un enlace único.

## Tecnologías utilizadas

- **Nuxt 3**: Framework Vue.js con SSR, composables y server routes
- **Tailwind CSS**: Framework CSS utility-first para diseño responsive
- **Firebase/Firestore**: Base de datos NoSQL para almacenar mensajes
- **OAuth**: Autenticación con Google

## Características

- **Página pública de usuario**: Permite a cualquier persona enviar mensajes anónimos a un usuario específico
- **Dashboard autenticado**: Muestra los mensajes recibidos y permite copiar el enlace único
- **Autenticación**: Inicio de sesión con Google
- **Diseño responsive**: Funciona en dispositivos móviles y de escritorio

## Configuración del proyecto

### Requisitos previos

- Node.js (v16 o superior)
- Cuenta de Firebase

### Configuración de Firebase

1. **Crear un proyecto en Firebase**:
   - Ve a la [consola de Firebase](https://console.firebase.google.com/)
   - Haz clic en "Agregar proyecto"
   - Sigue los pasos para crear un nuevo proyecto

2. **Habilitar Firestore**:
   - En el menú lateral, haz clic en "Firestore Database"
   - Haz clic en "Crear base de datos"
   - Selecciona el modo "Iniciar en modo de prueba" (para desarrollo)
   - Selecciona la ubicación más cercana a tus usuarios
   - Haz clic en "Habilitar"

3. **Configurar reglas de seguridad de Firestore**:
   - Una vez creada la base de datos, ve a la pestaña "Reglas"
   - Actualiza las reglas para permitir operaciones de lectura/escritura:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Mensajes: cualquiera puede escribir, solo el destinatario puede leer
    match /messages/{messageId} {
      allow create: if request.resource.data.to is string &&
                     request.resource.data.message is string &&
                     request.resource.data.message.size() <= 500;
      allow read: if request.auth != null && 
                   request.auth.token.email_verified && 
                   resource.data.to == request.auth.token.name.toLowerCase().replace(" ", "") || 
                   resource.data.to == request.auth.token.email.split('@')[0];
    }
    
    // Usuarios: solo el propio usuario puede leer/escribir sus datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. **Crear índices en Firestore**:
   - La aplicación requiere un índice compuesto para funcionar correctamente
   - Si ves un error que dice "The query requires an index", haz clic en el enlace proporcionado
   - Esto te llevará directamente a la consola de Firebase para crear el índice necesario
   - Haz clic en "Crear índice" y espera a que se complete (puede tardar unos minutos)
   - Alternativamente, puedes crear el índice manualmente:
     - Ve a Firestore > Índices > Índices compuestos
     - Haz clic en "Añadir índice"
     - Colección: `messages`
     - Campos: `to` (Ascending) y `createdAt` (Descending)
     - Haz clic en "Crear índice"

5. **Habilitar Authentication**:
   - En el menú lateral, haz clic en "Authentication"
   - Haz clic en "Comenzar"
   - En la pestaña "Sign-in method", habilita el proveedor:
     - Google

6. **Obtener credenciales de Firebase**:
   - En el menú lateral, haz clic en "Project settings" (ícono de engranaje)
   - En la pestaña "General", desplázate hacia abajo hasta "Your apps"
   - Haz clic en el ícono de web (</>) para agregar una aplicación web
   - Registra la aplicación con un nombre
   - Copia las credenciales de Firebase (apiKey, authDomain, etc.) para usarlas en el archivo .env

7. **Configuración para producción (opcional)**:
   - Para entornos de producción, se recomienda utilizar Firebase Admin SDK para verificar tokens de forma segura
   - Ve a "Project settings" > "Service accounts"
   - Haz clic en "Generate new private key" para descargar un archivo JSON con las credenciales
   - Guarda este archivo de forma segura y nunca lo incluyas en el control de versiones
   - Para implementar la verificación segura de tokens, actualiza el archivo `server/api/messages.js` para usar el Admin SDK

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (basado en el archivo `.env.example`):

```
FIREBASE_API_KEY=tu-api-key
FIREBASE_AUTH_DOMAIN=tu-auth-domain
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_STORAGE_BUCKET=tu-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
FIREBASE_APP_ID=tu-app-id
FIREBASE_MEASUREMENT_ID=tu-measurement-id
```

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del proyecto

```
├── assets/
│   └── css/
│       └── main.css         # Estilos globales y configuración de Tailwind
├── composables/
│   ├── useAuth.js           # Composable para autenticación
│   └── useMessages.js       # Composable para gestión de mensajes
├── pages/
│   ├── index.vue            # Página de inicio
│   ├── [username].vue       # Página pública de usuario
│   └── dashboard.vue        # Dashboard del usuario autenticado
├── server/
│   ├── api/
│   │   ├── sendMessage.js   # Endpoint para enviar mensajes
│   │   ├── messages.js      # Endpoint para obtener mensajes
│   │   └── messages/
│   │       └── [id].delete.js # Endpoint para eliminar mensajes
│   └── utils/
│       ├── auth.js          # Utilidades de autenticación
│       └── firebase.js      # Utilidades de Firebase
└── nuxt.config.ts           # Configuración de Nuxt
```

## Notas sobre seguridad

En la implementación actual, la verificación de tokens en el servidor se realiza mediante decodificación básica de JWT. Para entornos de producción, se recomienda:

1. **Usar Firebase Admin SDK**: Proporciona verificación criptográfica completa de tokens
2. **Proteger las credenciales**: Nunca incluir archivos de credenciales en el control de versiones
3. **Configurar reglas de Firestore**: Asegurar que solo los usuarios autorizados puedan leer/escribir datos

## Despliegue

Para desplegar la aplicación en producción, puedes utilizar servicios como:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

Asegúrate de configurar las variables de entorno en el servicio de hosting que elijas.

## Solución de problemas

### Error: "The query requires an index"
Si ves este error, significa que Firestore necesita un índice para la consulta que estás realizando:
1. Haz clic en el enlace proporcionado en el mensaje de error
2. Inicia sesión en tu cuenta de Firebase si es necesario
3. Haz clic en "Crear índice" en la página que se abre
4. Espera a que el índice se cree (puede tardar unos minutos)

### Error: "Firestore permission denied"
Este error indica que las reglas de seguridad de Firestore están bloqueando la operación:
1. Verifica que has configurado correctamente las reglas de seguridad en la consola de Firebase
2. Asegúrate de que el usuario está autenticado correctamente
3. Comprueba que el formato del nombre de usuario coincide con lo esperado en las reglas

## Licencia

MIT
