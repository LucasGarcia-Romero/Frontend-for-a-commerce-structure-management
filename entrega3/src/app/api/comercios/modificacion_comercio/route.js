import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request) {
  console.log('Estoy en PUT');
  try {
    const users = JSON.parse(readFileSync('ficheros/comercio.txt'));
    
    // Obtener los datos nuevos del usuario
    const requestData = await request.json();

    const nombreUsuarioActualizar = requestData.nombreUsuarioActualizar;

    //imprimo las variables:
    const usuarioActualizar = users.find((user) => user.nombre === nombreUsuarioActualizar);


    if (!usuarioActualizar) {
      return NextResponse.json({ message: 'El usuario no existe' }, { status: 404 });

    }
    // Actualizar los datos del usuario existente
    usuarioActualizar.ciudad = requestData.ciudad;
    usuarioActualizar.cif = requestData.cif;
    usuarioActualizar.direccion = requestData.direccion;
    usuarioActualizar.email = requestData.email;
    usuarioActualizar.telefono = requestData.telefono;
    usuarioActualizar.actividad = requestData.actividad;
    usuarioActualizar.resumen = requestData.resumen;
    
    // Escribir el archivo actualizado
    await writeFileSync('ficheros/comercio.txt', JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Comercio actualizado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
