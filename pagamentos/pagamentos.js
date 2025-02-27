loadPagamentos();

function loadPagamentos() {
  const tabela = document.querySelector("#tabela");
  while (tabela.firstChild) {
    tabela.removeChild(tabela.firstChild);
  }

  const pagamentos = JSON.parse(localStorage.getItem("pagamentos"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  tabela;

  pagamentos.forEach(pagamento => {
    if (!pagamento.excluido) {
      const membro = usuarios.find(user => user.id === pagamento.membroId);
      const row = `
        <tr>
          <td>${pagamento.id}</td>
          <td>${membro ? `${membro.nome} (${pagamento.membroId})` : `Usuário não encontrado (${pagamento.membroId})`}</td>
          <td>${pagamento.valor}</td>
          <td>${pagamento.data}</td>
          <td>
            <button class="excluir" onclick="deletePayment(${pagamento.id})">
              Excluir
            </button>
          </td>
        </tr>
      `;
      tabela.innerHTML += row;
    }
  });
}

function registerPayment() {
  const valor = document.querySelector("#valor").value;
  const data = document.querySelector("#data").value;
  const membroId = Number(document.querySelector("#membroId").value);

  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (!usuarios.find(user => user.id === membroId)) {
    alert("Usuário não encontrado!");
    return;
  }

  const pagamentos = JSON.parse(localStorage.getItem("pagamentos"));
  const newID = JSON.parse(localStorage.getItem("ultimoIDpay")) + 1;
  localStorage.setItem("ultimoIDpay", newID);

  const novoPagamento = {
    id: newID,
    valor,
    data,
    membroId,
    excluido: false,
  };

  pagamentos.push(novoPagamento);
  localStorage.setItem("pagamentos", JSON.stringify(pagamentos));

  loadPagamentos();
}

function deletePayment(id) {
  const pagamentos = JSON.parse(localStorage.getItem("pagamentos"));
  const index = pagamentos.findIndex(pag => pag.id === id);
  pagamentos[index].excluido = true;
  localStorage.setItem("pagamentos", JSON.stringify(pagamentos));
  loadPagamentos();
}

function searchPayment() {
  const termo = document.querySelector("#search-term").value.toLowerCase().trim();
  const pagamentos = JSON.parse(localStorage.getItem("pagamentos"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  let resultados;

  if (termo === "") {
    resultados = pagamentos.filter(pagamento => !pagamento.excluido);
  } else {
    resultados = pagamentos.filter(pagamento => {
      if (pagamento.excluido) return false;
      const membro = usuarios.find(user => user.id === pagamento.membroId);
      return String(pagamento.id) === termo || pagamento.valor === termo || pagamento.data.includes(termo) || (membro && membro.nome.toLowerCase().includes(termo));
    });
  }

  const tabela = document.querySelector("#tabela");
  while (tabela.firstChild) {
    tabela.removeChild(tabela.firstChild);
  }
  if (resultados.length === 0) {
    tabela.innerHTML = "<tr><td>Nenhum pagamento encontrado</td></tr>";
  } else {
    resultados.forEach(pagamento => {
      const membro = usuarios.find(user => user.id === pagamento.membroId);
      const row = `
        <tr>
          <td>${pagamento.id}</td>
          <td>${membro ? membro.nome : "Usuário não encontrado"}</td>
          <td>${pagamento.valor}</td>
          <td>${pagamento.data}</td>
          <td>
            <button class="excluir" onclick="deletePayment(${pagamento.id})">
              Excluir
            </button>
          </td>
        </tr>
      `;
      tabela.innerHTML += row;
    });
  }
}
