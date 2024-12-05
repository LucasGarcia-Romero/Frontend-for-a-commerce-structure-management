import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function DELETE(request) {
  console.log('Estoy en DELETE');
  try {
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));

    const { nombreUsuarioEliminar } = await request.json();
    const usuarioEliminar = users.find((user) => user.nombre === nombreUsuarioEliminar);

    if (!usuarioEliminar) {

      return NextResponse.json({ message: 'El usuario no existe' }, { status: 404 });
      
    }
    users.splice(users.indexOf(usuarioEliminar), 1);

    await writeFileSync('ficheros/usuario.txt', JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}