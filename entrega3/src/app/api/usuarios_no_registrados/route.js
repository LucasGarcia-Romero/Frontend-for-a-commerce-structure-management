//registro de usuario
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en POST');
  try {
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));

    const { nombre, email, password, edad, ciudad, intereses, permiteRecibirOfertas } = await request.json();

    if (users.find((user) => user.nombre === nombre)) {
      return NextResponse.json({ message: 'El usuario ya existe' }, { status: 400 });
    }

    const newUser = { id: users.length + 1, nombre, email, password, edad, ciudad, intereses, permiteRecibirOfertas };
    users.push(newUser);

    await writeFileSync('ficheros/usuario.txt', JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}