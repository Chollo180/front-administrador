document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    const montoTotal = document.getElementById('txtMontoTotal').value;
    const ahorro = document.getElementById('txtAhorro').value;
    const gasto = document.getElementById('txtGastos').value;
    const descripcion = document.getElementById('txtDescripcion').value;

    // Crear el objeto que se enviará al backend
    const datosFormulario = {
        montoTotal: montoTotal, // Usar las variables correctas
        ahorro: ahorro,
        gasto: gasto,
        descripcion: descripcion
    };

    try {
        const response = await fetch('http://localhost:8080/v1/saldos/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormulario)
        });

        // Verificar si la respuesta fue exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const result = await response.json();

        // Mostrar el mensaje del backend si existe, o uno por defecto
        alert(result.message || "La operación fue exitosa");

        // Resetear el formulario
        document.getElementById('formulario').reset();
    } catch (error) {
        alert('Error al guardar los datos');
        console.error('Detalle del error:', error);
    }
});

