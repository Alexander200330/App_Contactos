document.getElementById('formTask').addEventListener('submit', saveTask);



var ID = document.getElementById("txtBuscar");

document.getElementById('Buscar').addEventListener('submit', buscar(ID));



function saveTask(e) {
  let id = document.getElementById('txtId').value;
  let nombre = document.getElementById('txtNombre').value;
  let apellido = document.getElementById('txtApellido').value;
  let correo = document.getElementById('txtCorreo').value;
  console.log(nombre)

  let task = {
    id,
    nombre,
    apellido,
    correo
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(id) {
  console.log(id)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let id = tasks[i].id;
    let nombre = tasks[i].nombre;
    let apellido = tasks[i].apellido;
    let correo = tasks[i].correo;

    tasksView.innerHTML += `<tr>
    <td>${id}</td>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${correo}</td>
    <td><button onclick="deleteTask('${id}')" class="btn btn-danger">Delete</button></td>
    <td><button onclick="editar('${id}')" class="btn btn-warning">Edit</button></td>
    <td><button onclick="enviarEmail('${id}')" class="btn btn-primary">Email</button></td>
 </tr>` 
  }
}


function actualizar(i){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[i].id = document.getElementById('newId').value;
  tasks[i].nombre = document.getElementById('newNombre').value;
  tasks[i].apellido = document.getElementById('newApellido').value;
  tasks[i].correo = document.getElementById('newCorreo').value;
     localStorage.setItem("tasks",JSON.stringify(tasks));
     vistaPrincipal();
  
}

function editar(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === id){
          
        document.getElementById('body').innerHTML =  `  
        <div class="container">
        <div class="col-md-5">

        <div class="card">
        <div class="card-header">
                <h2>Editar Contacto</h2>
        </div>
          <div class="card-body">
            <!-- FORM TO ADD TASKS -->
            <form id="formTask">
              <div class="form-group">
                <input type="text" class="form-control" id="newId" placeholder="Ingrese un id">
                <br>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="newNombre" placeholder="Ingrese su nombre">
                <br>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="newApellido" placeholder="Ingrese su apellido">
                <br>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" id="newCorreo" placeholder="Ingrese su correo">
                <br>
            </div>
            </form>
            <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
            <button class="btn btn-primary" onclick="vistaPrincipal()">Cancelar</button>
            
          </div>
          </div>`
        
      }

  }

}

function vistaPrincipal() {
  document.getElementById("body").innerHTML = `
  <div class="container mt-" id="body">
  <div class="row">
    <div class="col-md-4">

      <div class="card">
        <div class="card-header">
          <h3>Agregar contacto</h2>
        </div>
        <div class="card-body">
          <!-- FORM TO ADD TASKS -->
          <form id="formTask">
            <div class="form-group">
              <input type="text" class="form-control" id="txtId" placeholder="Ingrese un id">
              <br>
          </div>
          <div class="form-group">
              <input type="text" class="form-control" id="txtNombre" placeholder="Ingrese su nombre">
              <br>
          </div>
          <div class="form-group">
              <input type="text" class="form-control" id="txtApellido" placeholder="Ingrese su apellido">
              <br>
          </div>
          <div class="form-group">
              <input type="email" class="form-control" id="txtCorreo" placeholder="Ingrese su correo">
              <br>
          </div>
            <button type="submit" class="btn btn-primary btn-block">Save</button>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-8" >
            <h1 class="text-center">Contactos agendados</h1>
            <table class="table">
                <thead class="thead-dark bg-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Eliminar</th>
                    <th scope="col">Actualizar</th>
                  </tr>
                </thead>
                <tbody id="tasks">
                  <tr>
                </tbody>
              </table>
        </div>
    </div>
  </div>
  </div>
</div>`
getTasks();
}

function enviarEmail(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === id){
          
        document.getElementById('body').innerHTML =  `  
        <div class="container">
        <div class="col-md-5">

        <div class="card">
        <div class="card-header">
                <h2>Enviar correo</h2>
        </div>
          <div class="card-body">
            <!-- FORM TO ADD TASKS -->
            <form action="mailto:${tasks[i].correo}'" method="post" enctype="text/plain" >
              <div class="form-group">
                <input type="text" class="form-control" id="Asunto" name="Asunto" placeholder="Asunto">
                <br>
            </div>
            <div class="form-group">
            <textarea name="" id="Mensaje" name="Mensaje" cols="50" rows="10" placeholder="Mensaje"></textarea>                
            <br>
            </div>
           
            <div class="form-group">
            <button type="submit" class="btn btn-success">Enviar</button>
            <button class="btn btn-primary" onclick="vistaPrincipal()">Cancelar</button>
            </div>

            </form>
          
            
            
          </div>
          </div>`
          
        
      }

  }
}

function buscar(id){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].id == id) {
    let id = tasks[i].id;
    let nombre = tasks[i].nombre;
    let apellido = tasks[i].apellido;
    let correo = tasks[i].correo;

    tasksView.innerHTML += `<tr>
    <td>${id}</td>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${correo}</td>
    <td><button onclick="deleteTask('${id}')" class="btn btn-danger">Delete</button></td>
    <td><button onclick="editar('${id}')" class="btn btn-warning">Edit</button></td>
    <td><button onclick="enviarEmail('${id}')" class="btn btn-primary">Email</button></td>
 </tr>` 

    }
  }
  
}


getTasks();
