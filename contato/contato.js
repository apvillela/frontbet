function submitContactForm() {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const topico = document.querySelector("#topico").value;

  if (!nome || !email || !topico) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  alert("Formulário enviado com sucesso! Nossa equipe vai enrolar você ao máximo e não resolver o seu problema!");
  document.querySelector("form").reset();
}
