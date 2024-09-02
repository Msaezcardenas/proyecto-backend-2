const buttonRegister = document.querySelector("#sendRegister");
const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const edadInput = document.querySelector("#edad");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const newUser = {
  nombre: "",
  apellido: "",
  edad: "",
  email: "",
  password: "",
};

const handleChange = (e) => {
  const { name, value } = e.target;
  newUser[name] = value;
};

nombreInput.addEventListener("input", handleChange);
apellidoInput.addEventListener("input", handleChange);
edadInput.addEventListener("input", handleChange);
emailInput.addEventListener("input", handleChange);
passwordInput.addEventListener("input", handleChange);

buttonRegister.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/sessions/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201 || response.status < 300)
      window.location.href = "/login";
  } catch (e) {
    console.log("error", e);
  }
});
