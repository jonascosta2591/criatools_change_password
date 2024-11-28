function validarEmail(email) {
  // Expressão regular para validar o e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default validarEmail;
