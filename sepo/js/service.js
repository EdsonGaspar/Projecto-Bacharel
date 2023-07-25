const baseUrl = "http://localhost:3003"

async function loadPartidos() {
  const response = await fetch(`${baseUrl}/parties`);
  const partidos = await response.json();
  console.log(partidos);
}

loadPartidos()


async function voting(data) {
  try {
    const response = await fetch(`${baseUrl}/voter/party`, {
      method: "PUT",
      body: data,
    });
    
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
