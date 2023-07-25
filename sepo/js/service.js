const baseUrl = "http://localhost:3003";

async function loadPartidos() {
  const response = await fetch(`${baseUrl}/parties`);
  const partidos = await response.json();
  return partidos;
}

async function voting(data) {
  const response = await fetch(`${baseUrl}/voter/party`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
}

async function login(data) {
  const response = await fetch(`${baseUrl}/voter/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
}

async function registerUser(data) {
  const response = await fetch(`${baseUrl}/voter/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
}

async function handleSubmitRegister(event) {
  event.preventDefault();

  const data = {
    email: event.target.email.value,
    name: event.target.name.value,
    password: event.target.password.value,
    bi: event.target.bi.value,
  };

  try {
    const result = await registerUser(data);
    alert("Success:", result.email);

    document.location.href = "./login.html";
  } catch (error) {
    alert("Error:", error);
  }
}

async function handleSubmitLogin(event) {
  event.preventDefault();

  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const result = await login(data);

    if (!result.token) {
      alert("Acontecer um erro inesperado");
      return;
    }

    setCookie("sepoToken", result.token, 3);
    alert("Login feito com sucesso");

    document.location.href = "./sala.html";
  } catch (error) {
    alert("Error:", error);
  }
}

async function handleSubmitVoting(event) {
  event.preventDefault();

  const partyId = event.target.partyId.value;
  const voterId = event.target.voterId.value;

  if (!partyId) {
    alert("Selecione um candidato antes de Confirmar");
    return;
  }

  if (!voterId) {
    alert("Faça o login para Votares");
    document.location.href = "./login.html";
  }

  const data = {
    partyId,
    voterId,
  };

  console.log(data);

  // try {
  //   const result = await login(data);

  //   if (!result.token) {
  //     alert("Acontecer um erro inesperado");
  //     return;
  //   }

  //   setCookie("sepoToken", result.token, 3);
  //   alert("Login feito com sucesso");

  //   document.location.href = "./sala.html";
  // } catch (error) {
  //   alert("Error:", error);
  // }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
