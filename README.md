# Nodepop

Configurar variables de entorno. Hacer una copia del fichero .env.example a .env y modificar los valores de configuración.

Inicializar la BBDD para añadir articulos:

...shell
npm run installdb
...

Arrancar la aplicación en modo desarrollo:

```shell
npm run dev
```

Recordatorio: Para arrancar el servidor de MongoDB: 

```shell
bin/mongod --dbpath ./data/db --directoryperdb
```

Opciones de la API:

http://localhost:3000/usuarios/register

Se proporcionara las claves [nombre, email, clave] y se generara un usuario nuevo para poder acceder

http://localhost:3000/usuarios/login

Se proporcionara las claves [email, clave] y se recibira un TOKEN de conexion

http://localhost:3000/anuncios/

Se proporcionara el TOKEN recibido en el login y los siguientes posibles filtros para recibir la lista de articulos a la venta:

- nombre (se recibiran los articulos que empiecen por dicho nombre)
- precioMin y/o precioMax - Se recibiran los articulos dentro del rango proporcionado, si no se proporciona rango no se filtrara por precio
- venta : true o false - Se pasaran los articulos a la venta (true) o buscados por usuarios para comprar (false)
- tag - se filtrara por los articulos que tenga ese tag en su informacion

http://localhost:3000/anuncios/tags

Se recibira una lista de los tags UNICOS que se han usado en todos los articulos en la BBDD. Habra que proporcionar el TOKEN para ello.