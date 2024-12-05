import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request) {
  console.log('Estoy en PUT');
  try {
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));
    
    // Obtener los datos nuevos del usuario
    const requestData = await request.json();

    const nombreUsuarioActualizar = requestData.nombreUsuarioActualizar;

    //imprimo las variables:
    const usuarioActualizar = users.find((user) => user.nombre === nombreUsuarioActualizar);


    if (!usuarioActualizar) {
      return NextResponse.json({ message: 'El usuario no existe' }, { status: 404 });
      
    }
    // Actualizar los datos del usuario existente
    usuarioActualizar.Ciudad = requestData.ciudad;
    usuarioActualizar.Intereses = requestData.intereses;
    usuarioActualizar.PermiteRecibirOfertas = requestData.recibirOfertas;

    // Escribir el archivo actualizado
    await writeFileSync('ficheros/usuario.txt', JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
