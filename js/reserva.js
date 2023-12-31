const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario : false,
    nombre : false,
    contrasena : false,
    email : false,
    telefono : false
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario")
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre")
        break;
        case "contrasena":
            validarCampo(expresiones.password, e.target, "contrasena")
            validarContrasena2()
        break;
        case "contrasena2":
            validarContrasena2()
        break;
        case "email":
            validarCampo(expresiones.correo, e.target, "email")
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono")
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo')
        campos[campo] = true
    }else{
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo')
        campos[campo] = false
    }
}

const validarContrasena2 = () => {
    const inputContrasena1 = document.getElementById("contrasena")
    const inputContrasena2 = document.getElementById("contrasena2")

    if(inputContrasena1.value !== inputContrasena2.value){
        document.getElementById(`grupo-contrasena2`).classList.add('formulario-grupo-incorrecto');
        document.getElementById(`grupo-contrasena2`).classList.remove('formulario-grupo-correcto');
        document.querySelector(`#grupo-contrasena2 i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo-contrasena2 i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo-contrasena2 .formulario-input-error`).classList.add('formulario-input-error-activo')
        campos['contrasena'] = false
    }else{
        document.getElementById(`grupo-contrasena2`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-contrasena2`).classList.add('formulario-grupo-correcto');
        document.querySelector(`#grupo-contrasena2 i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo-contrasena2 i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo-contrasena2 .formulario-input-error`).classList.remove('formulario-input-error-activo')
        campos["contrasena"] = true
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault() //Modificar porque evita que se envie el formulario arreglarlo para que se envie cuando too este bien

    const terminos = document.getElementById("terminos")
    if(campos.usuario && campos.nombre && campos.contrasena && campos.email && campos.telefono && terminos.checked){
        formulario.reset()

        document.getElementById("formulario-mensaje-exito").classList.add("formulario-mensaje-exito-activo")
        setTimeout(() => {
            document.getElementById("formulario-mensaje-exito").classList.remove("formulario-mensaje-exito-activo")
        }, 5000  )
        document.querySelectorAll(".formulario-grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario-grupo-correcto")
        } )
    }else {
        document.getElementById("formulario-mensaje").classList.add("formulario-mensaje-activo")
    }

})