loadUsers();

function loadUsers() {
  const table = document.querySelector("#tabela");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  const users = JSON.parse(localStorage.getItem("usuarios"));

  users.forEach(user => {
    const row = getRow(user);
    document.querySelector("#tabela").innerHTML += row;
  });
}

function registerUser() {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  if (!nome || !email || !senha) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("usuarios"));

  if (users.find(user => user.email === email)) {
    alert("Email já cadastrado");
    return;
  }

  const newID = JSON.parse(localStorage.getItem("ulitmoIDuser")) + 1;
  localStorage.setItem("ulitmoIDuser", newID);
  const newUser = {
    id: newID,
    nome,
    email,
    senha,
  };

  users.push(newUser);
  localStorage.setItem("usuarios", JSON.stringify(users));

  loadUsers();
}

function deleteUser(id) {
  const users = JSON.parse(localStorage.getItem("usuarios"));
  const newUsers = users.filter(user => user.id !== id);
  localStorage.setItem("usuarios", JSON.stringify(newUsers));

  loadUsers();
}

function updateUser() {
  const id = document.querySelector("#user-id").value;
  const users = JSON.parse(localStorage.getItem("usuarios"));
  const user = users.find(u => u.id === Number(id));

  user.nome = document.querySelector("#edit-nome").value;
  user.email = document.querySelector("#edit-email").value;
  user.senha = document.querySelector("#edit-senha").value;

  toggleModal(false);
  localStorage.setItem("usuarios", JSON.stringify(users));

  loadUsers();
}

function toggleModal(show, id) {
  const modal = document.querySelector("#modal");
  if (show) {
    modal.classList.remove("hidden");
    const users = JSON.parse(localStorage.getItem("usuarios"));
    const user = users.find(u => u.id === Number(id));
    document.querySelector("#user-id").value = id;
    document.querySelector("#edit-nome").value = user.nome;
    document.querySelector("#edit-email").value = user.email;
    document.querySelector("#edit-senha").value = user.senha;
  } else {
    modal.classList.add("hidden");
  }
}

function getRow(usuarioObj) {
  return `<tr id="user-${usuarioObj.id}">
        <td>${usuarioObj.id}</td>
        <td>${usuarioObj.nome}</td>
        <td>${usuarioObj.email}</td>
        <td>
          <button class="editar" onclick="toggleModal(true, ${usuarioObj.id})">Editar</button>
          <button class="excluir" onclick="deleteUser(${usuarioObj.id})">Excluir</button>
        </td>
    </tr>`;
}

function searchUsers() {
  const term = document.querySelector("#search-term").value.toLowerCase().trim();
  const users = JSON.parse(localStorage.getItem("usuarios"));

  const filteredUsers = users.filter(user => {
    return user.nome.toLowerCase().includes(term) || user.email.toLowerCase().includes(term) || String(user.id).includes(term);
  });

  const table = document.querySelector("#tabela");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  if (filteredUsers.length === 0) {
    table.innerHTML = "<tr><td>Nenhum membro encontrado</td></tr>";
  } else {
    filteredUsers.forEach(user => {
      const row = getRow(user);
      table.innerHTML += row;
    });
  }
}
