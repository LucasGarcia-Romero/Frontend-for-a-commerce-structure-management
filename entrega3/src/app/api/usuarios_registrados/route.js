import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request) {
  try {

    // Asegúrate de que el archivo admin.txt esté en la ubicación correcta y sea accesible
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));

    const { username, password } = await request.json();

    const foundUser = users.find((user) => user.nombre === username && user.password === password);

    if (foundUser) {
      console.log('Usuario correcto');
      const { id } = foundUser;
      return NextResponse.json({ id, message: 'OK' });
    } else {
      console.log('Usuario no correcto');
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}