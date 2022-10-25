create table tb_usuario(
	id_usuario serial primary key not null,
	usuario text unique not null, 
	nombres text,
	apellidos text,
  clave text,
	fecha_nacimiento timestamptz ,
	correo_electronico text unique not null, 
	numero_telefono text unique not null
);

create function autenticar(uname text, pass text)
returns text as $$
begin 
	return (select usuario from tb_usuario 
where usuario = uname and clave = crypt(pass, clave));
end;
$$ language plpgsql

create procedure crear_usuario(
	nusuario text,
	nombre text,
	apellido text,
	clave_acceso text,
	f_nacimiento timestamptz,
	correo_e text,
	telefono text
)
language plpgsql
as $$
declare
-- variable declaration
begin
	insert into tb_usuario(
		usuario, nombres, apellidos, clave, 
		fecha_nacimiento, correo_electronico,
		numero_telefono
	)
	values (nusuario, nombre, apellido, crypt(clave_acceso, gen_salt('bf', 4)), f_nacimiento, correo_e, telefono);
end; $$

call crear_usuario('alan', 'Alan', 'Gonzalez', 'alan123', '2000-09-24', 'agonzalezl22@miumg.edu.gt', '49853152');
