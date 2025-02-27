function emitUserReport() {
  const users = JSON.parse(localStorage.getItem("usuarios"));
  const reportDiv = document.querySelector("#user-report");
  reportDiv.innerHTML = "";

  if (users.length === 0) {
    reportDiv.innerHTML = "<p>Nenhum usuário encontrado.</p>";
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
        </tr>
    `;

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
        `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  reportDiv.appendChild(table);
}

function emitPaymentReport() {
  const payments = JSON.parse(localStorage.getItem("pagamentos"));
  const users = JSON.parse(localStorage.getItem("usuarios"));
  const reportDiv = document.querySelector("#payment-report");
  reportDiv.innerHTML = "";

  if (payments.length === 0) {
    reportDiv.innerHTML = "<p>Nenhum pagamento encontrado.</p>";
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Membro</th>
            <th>Valor</th>
            <th>Data</th>
        </tr>
    `;

  payments.forEach(payment => {
    const member = users.find(user => user.id === payment.membroId);
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${payment.id}</td>
                <td>${payment.excluido ? `Desativado` : `Ativo`}</td>
                <td>${member ? member.nome : `Usuário não encontrado (${payment.membroId})`}</td>
                <td>${payment.valor}</td>
                <td>${payment.data}</td>
            `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  reportDiv.appendChild(table);
}
