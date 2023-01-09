let usuLog;
let codigoSiguiente = 10;

document.getElementById("btnEntrar").addEventListener("click", login)
document.getElementById("cerrarSesionCliente").addEventListener("click",cerrarSesion)
document.getElementById("cerrarSesionAdmin").addEventListener("click",cerrarSesion)
document.getElementById("btnPropiedades").addEventListener("click", function(){abrirPropiedades(obtenerTodosLosCodigos(),"propiedades")});
document.getElementById("btnIntereses").addEventListener("click", function(){abrirPropiedades(obtenerCodigosUsuLog(),"intereses")});
document.getElementById("filtroPropiedades").addEventListener("change", function(){abrirPropiedades(obtenerCodigosTipo(document.getElementById("filtroPropiedades").value),"propiedades")});
document.getElementById("btnAgregarPropiedad").addEventListener("click", mostrarAltaPropiedad);
document.getElementById("btnSubirPropiedad").addEventListener("click", agregarPropiedad);
document.getElementById("btnEditarPropiedad").addEventListener("click", mostrarEditarPropiedad);
document.getElementById("selectEditar").addEventListener("change", function(){editarPropiedad(document.getElementById("selectEditar").value)});
document.getElementById("btnCompletarEditadoPropiedad").addEventListener("click", completarEditado);
document.getElementById("listIntereses").addEventListener("click", listarInteresesAdmin);

function login (){
    usuLog = buscarUsuario(document.getElementById("txtUsuario").value, document.getElementById("txtContraseña").value)
    if (usuLog != null){
        document.getElementById("inicioSesion").classList.add("ocultar");
        if(usuLog.tipo == "admin"){
            document.getElementById("adminTitulo").innerHTML = "Bienvenido funcionario " + usuLog.info.numFuncionario + " ("+usuLog.info.nombre + " " + usuLog.info.apellido+")"
            document.getElementById("divAdmin").classList.remove("ocultar");
        }if(usuLog.tipo == "cliente"){
            document.getElementById("clienteTitulo").innerHTML = "Bienvenido " + usuLog.nomUsu + " ("+usuLog.info.nombre + " " + usuLog.info.apellido+")"
            document.getElementById("divCliente").classList.remove("ocultar");
            rellenarFiltroPropiedades();
        }
    }else{
        document.getElementById("mensaje").innerText ="Nombre o clave incorrecta";
    }
}

function buscarUsuario(nombreUsuario, contraseña){
    for(let i = 0; i < usuarios.length; i++){
        if (usuarios[i].nomUsu == nombreUsuario && usuarios[i].con == contraseña){
            return usuarios[i];
        }
    }
    return null;
}

function cerrarSesion(){
    document.getElementById("txtUsuario").value = ""
    document.getElementById("txtContraseña").value = ""
    document.getElementById("inicioSesion").classList.remove("ocultar");
    document.getElementById("divAdmin").classList.add("ocultar")
    document.getElementById("divCliente").classList.add("ocultar")
    document.getElementById("mensaje").innerHTML = ""
    document.getElementById("divPropiedades").classList.add("ocultar")
    document.getElementById("divVerMas").classList.add("ocultar")
    document.getElementById("altaPropiedad").classList.add("ocultar")
    document.getElementById("editarPropiedad").classList.add("ocultar")
    document.getElementById("divInteresesAdmin").classList.add("ocultar");
    usuLog = null;
}

function abrirPropiedades(codigos, accion){
    let string = ""
    if (accion == "propiedades"){
         string += "<h2>Propiedades</h2>";
         document.getElementById("filtroPropiedades").classList.remove("ocultar");
         for (let i = 0; i < propiedades.length; i++) {
            for (let j = 0; j < codigos.length; j++) {
                if(propiedades[i].codigo == codigos[j]){
                    string += "<div style='display: inline-block; border:solid; margin: 20px; padding:10px;'><img height='120px' width='120px' src='" + propiedades[i].imagen + "'/><h2>" + propiedades[i].nombre + "</h2><br><button onclick='verMas(" + propiedades[i].codigo +")'>Ver Mas</button></div>"
                }
            }
        }
         
    }else if (accion == "intereses"){
        string += "<h2>Intereses</h2>"
        document.getElementById("filtroPropiedades").classList.add("ocultar");
        for (let i = 0; i < propiedades.length; i++){
            for(let j = 0; j < codigos.length; j++){
                if (propiedades[i].codigo == codigos[j]){
                    string  += "<div style='display: inline-block; border:solid; margin: 20px; padding:10px;'><img height='120px' width='120px' src='" + propiedades[i].imagen + "'/><h2>" + propiedades[i].nombre + "</h2></div>"
                }
            }
        }
    }
   
    document.getElementById("divMostrarPropiedades").innerHTML = string;
    document.getElementById("divVerMas").classList.add("ocultar");
    document.getElementById("divPropiedades").classList.remove("ocultar");
}

function obtenerTodosLosCodigos(){
    const codigos = [];
    for (let i = 0; i < propiedades.length; i++) {
        codigos.push(propiedades[i].codigo);
    }
    return codigos;
}

function obtenerCodigosUsuLog(){
    const codigos = [];
    for (let i = 0; i < usuLog.info.intereses.length; i++) {
        codigos.push(usuLog.info.intereses[i].codigo);
    }
    return codigos;
}

function verMas(codigo){
    for (let i = 0; i < propiedades.length; i++) {
        if(propiedades[i].codigo == codigo){
            document.getElementById("divVerMas").innerHTML = "<h2> Nombre: " + propiedades[i].nombre + "</h2><p> Tipo: " + propiedades[i].tipo + "</p><p> Monto: " + propiedades[i].monto + "</p><p>Dirección: " + propiedades[i].direccion + "</p><p>Padron: " + propiedades[i].padron + "</p><img  src='" + propiedades[i].imagen +"' width='300px' height='300px'><br><br><textarea cols='30' rows='10' placeholder='Deje su consulta' id='txtConsulta'></textarea><button onclick =  'agregarInteres("+propiedades[i].codigo+")'>Me Interesa</button>";
            document.getElementById("divPropiedades").classList.add("ocultar");
            document.getElementById("divVerMas").classList.remove("ocultar");

        }
    }
}


function obtenerCodigosTipo(tipo){
    const codigos = [];
    for (let i = 0; i < propiedades.length; i++) {
        if(propiedades[i].tipo == tipo){
            codigos.push(propiedades[i].codigo);
        }
    }
    return codigos;
}

function rellenarFiltroPropiedades(){
    const tipos = [];
    for (let i = 0; i < propiedades.length; i++) {
        let flag = true;
        for (let j = 0; j < tipos.length; j++) {
            if(propiedades[i].tipo == tipos[j]){
                flag = false;
            }
        }
        if(flag){
            tipos.push(propiedades[i].tipo);
        }
    }
    let string = "";
    for (let i = 0; i < tipos.length; i++) {
        string += "<option value='" + tipos[i] + "'>" + tipos[i] + "</option>";
    }
    document.getElementById("filtroPropiedades").innerHTML = string;
}

function mostrarAltaPropiedad(){
    document.getElementById("altaPropiedad").classList.remove("ocultar")
    document.getElementById("editarPropiedad").classList.add("ocultar")
    document.getElementById("divInteresesAdmin").classList.add("ocultar");
}

function agregarPropiedad(){
    const propiedad = {
        codigo: codigoSiguiente++,
        tipo: document.getElementById("tipo").value,
        direccion: document.getElementById("direccion").value,
        padron: document.getElementById("padron").value,
        monto: document.getElementById("monto").value,
        nombre: document.getElementById("nombre").value,
        imagen: document.getElementById("imagen").value
    }
    propiedades.push(propiedad);
    alert("Se agrego la propiedad correctamente!")
    document.getElementById("tipo").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("padron").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("imagen").value = "";
}

function mostrarEditarPropiedad(){
    document.getElementById("editarPropiedad").classList.remove("ocultar")
    document.getElementById("altaPropiedad").classList.add("ocultar")
    document.getElementById("divInteresesAdmin").classList.add("ocultar");

    let string = "<option></option>";

    for (let i = 0; i < propiedades.length; i++) {
        string += "<option value='" + propiedades[i].codigo + "'>" + propiedades[i].nombre + "</option>";
    }

    document.getElementById("selectEditar").innerHTML = string;
}

function editarPropiedad(codigo){
    let propiedad;
    for (let i = 0; i < propiedades.length; i++) {
        if(codigo == propiedades[i].codigo){
            propiedad = propiedades[i];
        }
    }
    if(propiedad != null){
        document.getElementById("editarCodigo").value = propiedad.codigo;
        document.getElementById("editarTipo").value = propiedad.tipo;
        document.getElementById("editarDireccion").value = propiedad.direccion;
        document.getElementById("editarPadron").value = propiedad.padron;
        document.getElementById("editarMonto").value = propiedad.monto;
        document.getElementById("editarNombre").value = propiedad.nombre;
        document.getElementById("editarImagen").value = propiedad.imagen;
    } else {
        document.getElementById("editarCodigo").value = "";
        document.getElementById("editarTipo").value = "";
        document.getElementById("editarDireccion").value = "";
        document.getElementById("editarPadron").value = "";
        document.getElementById("editarMonto").value = "";
        document.getElementById("editarNombre").value = "";
        document.getElementById("editarImagen").value = "";
    }
}

function agregarInteres(codPropiedad) {
    let flag = true;
    for(let i = 0;  i < usuLog.info.intereses.length; i++){
        if(usuLog.info.intereses[i].codigo == codPropiedad){
            flag = false;
        }
    }   
    if (flag){
        const interes = {
            codigo: codPropiedad,
            consulta: document.getElementById("txtConsulta").value,
            estado: "Pendiente",
            fecha: new Date()
        }
        usuLog.info.intereses.push(interes);
        alert("Propiedad agregada: " + codPropiedad);
        }else{
            alert("propiedad ya agregada a sus intereses");
        }
}

function completarEditado(){
    for (let i = 0; i < propiedades.length; i++) {
        if(propiedades[i].codigo == document.getElementById("editarCodigo").value ){
            propiedades[i].tipo = document.getElementById("editarTipo").value;
            propiedades[i].direccion = document.getElementById("editarDireccion").value;
            propiedades[i].padron = document.getElementById("editarPadron").value;
            propiedades[i].monto = document.getElementById("editarMonto").value;
            propiedades[i].nombre = document.getElementById("editarNombre").value;
            propiedades[i].imagen = document.getElementById("editarImagen").value;
            alert("Se ha editado correctamente");
        }
    }
}

function listarInteresesAdmin(){
    document.getElementById("altaPropiedad").classList.add("ocultar");
    document.getElementById("editarPropiedad").classList.add("ocultar");
    document.getElementById("divInteresesAdmin").classList.remove("ocultar");

    let string = "<table><th>Nombre</th><th>Apellido</th><th>Propiedad(Codigo)</th><th>Fecha</th><th>Consulta</th><th>Estado</th><th>Acciones</th>";

    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].info.intereses != null){
            for (let j = 0; j < usuarios[i].info.intereses.length; j++) {
                string += "<tr><td>" + usuarios[i].info.nombre + "</td><td>" + usuarios[i].info.apellido + "</td><td>" + usuarios[i].info.intereses[j].codigo + "</td><td>" + usuarios[i].info.intereses[j].fecha.toLocaleDateString() + "</td><td>" + usuarios[i].info.intereses[j].consulta + "</td><td>" + usuarios[i].info.intereses[j].estado + "</td>";
                if(usuarios[i].info.intereses[j].estado == "Pendiente"){
                    string += "<td><button onclick='finalizarInteres(" + usuarios[i].info.documento + "," + usuarios[i].info.intereses[j].codigo + ")'>Completar</button></td></tr>";
                } else {
                    string += "<td></td></tr>";
                }
            }
        }
    }

    document.getElementById("divInteresesAdmin").innerHTML = string + "</table>";
}

function finalizarInteres(documento, codigo){
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].info.documento == documento){
            for (let j = 0; j < usuarios[i].info.intereses.length; j++) {
                if(usuarios[i].info.intereses[j].codigo == codigo){
                    usuarios[i].info.intereses[j].estado = "Finalizado";
                }
            }
        }
    }
    listarInteresesAdmin();
}