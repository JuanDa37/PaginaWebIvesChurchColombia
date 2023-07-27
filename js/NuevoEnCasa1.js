const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input')

const textareas = document.querySelectorAll('#formulario textarea')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$$/, // Letras y espacios, pueden llevar acentos.
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    mensaje: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
}

const campos = {
    nombre : false,
    apellido : false,
    email : false,
    fecha : false,
    telefono : false,
    asunto : false,
    mensaje : false
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre")
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido")
        break;
        case "email":
            validarCampo(expresiones.correo, e.target, "email")
        break;
        case "fecha":
            validarCampo(expresiones.fecha, e.target, "fecha")
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono")
        break;
        case "asunto":
            validarCampo(expresiones.asunto, e.target, "asunto")
        break;
        case "mensaje":
            validarCampo2(expresiones.mensaje, e.target, "mensaje")
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

const validarCampo2 = (expresion, textarea, campo) => {
    if(expresion.test(textarea.value)){
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo')
        campos[campo] = true
    }else {
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo')
        campos[campo] = false
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

textareas.forEach((textarea) => {
    textarea.addEventListener('keyup', validarFormulario)
    textarea.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault() //Modificar porque evita que se envie el formulario arreglarlo para que se envie cuando too este bien

    const terminos = document.getElementById("terminos")

    if(terminos.checked == 1){
        document.getElementById("formulario-mensaje-terminos").classList.remove("formulario-mensaje-terminos-activo")
        document.getElementById("formulario-mensaje-terminos").classList.add("formulario-mensaje-terminos")
    }else {
        document.getElementById("formulario-mensaje-terminos").classList.add("formulario-mensaje-terminos-activo")
        document.getElementById("formulario-mensaje-terminos").classList.remove("formulario-mensaje-terminos")
    }
    
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