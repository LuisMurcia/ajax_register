//Cargamos todo el contenido y ejecutamos las funciones dependiendo del evento que se lleve a cabo.
window.onload = function(){
    showU();
    loadD();
    document.getElementById("departamento").onchange = function(){loadP()};
    document.getElementById("search").addEventListener("keyup", function(){
        showU();
    })
    document.getElementById("search").addEventListener("submit", function(e){
        e.preventDefault();
        showU();
    })
    document.getElementById("addnew-form").addEventListener("submit",function(e){
        let inpvalue = [];
        e.preventDefault();
        const formchilds = [...document.getElementById("addnew-form").childNodes];
        const forminp = formchilds.filter(c => c.nodeName === "DIV");
        forminp.forEach(e => {
            let asd = [...e.childNodes];            
            let valuetopush= asd.filter(c => c.nodeName === "INPUT" || c.nodeName === "SELECT").map(c => c.value);
            inpvalue.push(valuetopush[0]); 
        });
        if(validateF(inpvalue)){
            addN();
            document.getElementById("addnew-form").reset();
        } 
        showU();
    });
    document.getElementById("addnew-form").addEventListener("keyup",function(e){
        let inpvalue = [];
        const formchilds = [...document.getElementById("addnew-form").childNodes];
        const forminp = formchilds.filter(c => c.nodeName === "DIV");
        forminp.forEach(e => {
            let asd = [...e.childNodes];            
            let valuetopush= asd.filter(c => c.nodeName === "INPUT" || c.nodeName === "SELECT").map(c => c.value);
            inpvalue.push(valuetopush[0]); 
        });
        validateF(inpvalue);
    });
}
//Función que muestra los usuarios de la base de datos en una tabla a la derecha.
function showU(){
    var xmlhttp = new XMLHttpRequest(); 
    if(document.getElementById("search").value){     
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                createT(JSON.parse(xmlhttp.response));
            }
        };
        xmlhttp.open("POST","control/viewuser.php", true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(encodeURI("searchinp="+document.getElementById("search").value));
    }
    else{
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                createT(JSON.parse(xmlhttp.response));
            }
        };
        xmlhttp.open("GET","http://localhost/ajax_añadir_usuarios/control/viewuser.php", true);
        xmlhttp.send();
    }
}
//Función que carga los departamentos registrados en nuestra base de datos.
function loadD() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("departamento").innerHTML = xmlhttp.responseText;
                loadP();
            }
        };
        xmlhttp.open("GET","http://localhost/ajax_añadir_usuarios/control/loaddep.php", true);
        xmlhttp.send();
}
//Función que carga los puestos registrados en nuestra base de datos.
function loadP(){
    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    document.getElementById("puesto").innerHTML = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET","http://localhost/ajax_añadir_usuarios/control/loadjob.php?departamento=" + document.getElementById("departamento").value, true);
            xmlhttp.send();
};
//Función que crea las tablas con la información de los usuarios.
function createT(json){
    let column = "";
    Object.keys(json).forEach(key=>{
        column += `<tr><td>${json[key].nombre}</td><td>${json[key].email}</td><td>${json[key].telefono}</td><td>${json[key].departamento}</td><td>${json[key].puesto}</td></tr>`;
    });
    document.getElementById("tableusers").childNodes[3].innerHTML = column;
}
//Función que conecta con el archivo addnew.php de crear nuevos usuarios para poder añadirlos a la base de datos.
function addN(){
    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    showU();
                }
            };
            xmlhttp.open("POST","control/addnew.php", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send("email="+document.getElementById("email").value+"&name="+document.getElementById("name").value+"&phone="+document.getElementById("phone").value+"&puesto="+document.getElementById("puesto").value);
}
//Función que valida si lo que estás escribiendo en cada uno de los campos del formulario de registro sigue los parámetros adecuados y te lo indica con texto de color (rojo, mal escrito; verde, bien escrito).
const validateF = childs =>{
    let noerror = true;
    if(childs[0].match(/^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i)){
        document.getElementById("email").style.color = "green";
    }else{
        document.getElementById("email").style.color = "red";
        noerror = false;
    };
    if(childs[1].match(/[a-z]{3,}(\s*[a-z]{3,})*/i)){
        document.getElementById("name").style.color = "green";
    }else{
        document.getElementById("name").style.color = "red";
        noerror = false;
    }
    if(childs[2].match(/^[0-9\S]{9,9}$/)){
        document.getElementById("phone").style.color= "green";
    }
    else{
        document.getElementById("phone").style.color = "red";
        noerror = false;
    }
    return noerror;
};