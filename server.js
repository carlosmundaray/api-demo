const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON y form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para demostrar query parameters (?key=value)
app.get('/api/query', (req, res) => {
    const { nombre, edad } = req.query;
    res.json({
        metodo: 'GET',
        tipoDatos: 'Query Parameters',
        mensaje: 'Datos recibidos en la URL después del ?',
        datosRecibidos: { nombre, edad },
        ejemplo: `curl "http://localhost:${PORT}/api/query?nombre=Juan&edad=30"`
    });
});

// Ruta para demostrar route parameters (/path/:param)
app.get('/api/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.json({
        metodo: 'GET',
        tipoDatos: 'Route Parameters',
        mensaje: 'Datos recibidos como parte de la ruta URL',
        datosRecibidos: { userId, postId },
        ejemplo: `curl "http://localhost:${PORT}/api/users/123/posts/456"`
    });
});

// Ruta para demostrar body en JSON (POST)
app.post('/api/json', (req, res) => {
    const datos = req.body;
    res.json({
        metodo: 'POST',
        tipoDatos: 'JSON Body',
        mensaje: 'Datos recibidos en el cuerpo como JSON',
        datosRecibidos: datos,
        ejemplo: `curl -X POST -H "Content-Type: application/json" -d '{"nombre":"Ana","email":"ana@example.com"}' "http://localhost:${PORT}/api/json"`
    });
});

// Ruta para demostrar form-urlencoded (POST)
app.post('/api/form', (req, res) => {
    const datos = req.body;
    res.json({
        metodo: 'POST',
        tipoDatos: 'Form URL-Encoded',
        mensaje: 'Datos recibidos como application/x-www-form-urlencoded',
        datosRecibidos: datos,
        ejemplo: `curl -X POST -d "nombre=Ana&email=ana@example.com" "http://localhost:${PORT}/api/form"`
    });
});

// Ruta para demostrar headers
app.get('/api/headers', (req, res) => {
    const token = req.headers['authorization'];
    const userAgent = req.headers['user-agent'];
    
    res.json({
        metodo: 'GET',
        tipoDatos: 'Headers',
        mensaje: 'Datos recibidos en las cabeceras HTTP',
        datosRecibidos: {
            authorization: token,
            'user-agent': userAgent
        },
        ejemplo: `curl -H "Authorization: Bearer abc123" -H "X-Custom-Header: valor" "http://localhost:${PORT}/api/headers"`
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});