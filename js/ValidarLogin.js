

function login(){

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    

    //Usuario predeterminado
    if(user == "" || pass ==""){
        alert("Por favor completar todos los campos");
    } else{
        if(user == "alex@gmail.com" && pass == "123"){
            window.location = "index.html";
        } else{
            if(user != "alex@gmail.com"){
                alert("Usuario incorrecto");
            }else {
                if(pass != "123"){
                    alert("Contraseña incorrecta");
                
                }
            }
        }
    }
}

