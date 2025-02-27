(async () => {
  if (!(localStorage.getItem("inicializado") === "true")) {
    const pagamentosRes = await fetch("/data/pagamentos.json").then(res => res.json());
    const usuariosRes = await fetch("/data/usuarios.json").then(res => res.json());

    localStorage.setItem("pagamentos", JSON.stringify(pagamentosRes));
    localStorage.setItem("usuarios", JSON.stringify(usuariosRes));
    localStorage.setItem("ulitmoIDuser", usuariosRes.length);
    localStorage.setItem("ultimoIDpay", pagamentosRes.length);

    localStorage.setItem("inicializado", "true");
  }
})();

function limpar() {
  localStorage.clear();
  location.reload();
}
