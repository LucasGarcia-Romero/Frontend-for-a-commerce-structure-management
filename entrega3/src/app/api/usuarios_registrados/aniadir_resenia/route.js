import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request) {
  console.log('Estoy en PUT');
  try {
    const users = JSON.parse(readFileSync('ficheros/comercio.txt'));
    
    // Obtener los datos nuevos del usuario
    const requestData = await request.json();

    const comercioResenia = requestData.comercioResenia;
    const textoResenia = requestData.textoResenia;
    //imprimo las variables:
    const usuarioActualizar = users.find((user) => user.nombre === comercioResenia);

    if (!usuarioActualizar) {
      return NextResponse.json({ message: 'El usuario no existe' }, { status: 404 });
      
    }
    // Añado la nueva reseña
    usuarioActualizar.resenias.push(textoResenia);

    // Escribir el archivo actualizado
    await writeFileSync('ficheros/comercio.txt', JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
