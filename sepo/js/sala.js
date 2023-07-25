const Elementpartidos = document.querySelector("#partidos");

const mplaTemplate = (id, votos) => {
  return `
<div class="partido container" id="MPLA">
  <h3>MPLA</h3>
  <img src="./votacao/bandeira-mpla.svg" alt="Bandeira do Partido MPLA" class="baneira"/>
                
  <div class="img-p">
      <img src="./votacao/candidato-mpla.jpg" alt="Foto do Candidato do MPLA" class="candidato"/>
      <p>Candidato: João Manuel Gonçalves Lourenço <br>
      Natural: Lobito(Benguela) <br>
      Profissão: Militar, historiador e político</p>
  </div>
  <h4>Projectos do MPLA</h4>
  <p>
      <ul>
          <li>Limitou em garantir a continuidade de uma série de projectos em andamento nas várias províncias;</li>
          <li>Comprometeu a deixar uma Angola melhor a que encontrou;</li>
          <li>Prometeu em Malanje a construção de uma centralidade com 2.500 casas;</li>
          <li>Em Benguela,garantia de investimento na ordem dos 301 milhões de dólares;</li>
      </ul>
  </p>
  <div class="btn-votar">
      <input type="radio" name="partyId" value="${id}" id="votoM"/>
      <label for="votoM" class="btn-local-sala">Votar</label>

      <input type="text" readonly value="Número de votos: ${votos ? votos : 0}">
  </div>
</div>
`;
};

const unitaTemplate = (id, votos) => {
  return `
<div class="partido container" id="UNITA">
<h3>UNITA</h3>
<img src="./votacao/bandeira-unita.png" alt="Bandeira do Partido UNITA" class="baneira">

<div class="img-p">
    <img src="./votacao/candidato-unita.png" alt="Foto do Candidato do unita" class="candidato">
    <p><p>Candidato: Adalberto Costa Júnior <br>
        Natural: Chinjenje(Huambo) <br>
        Profissão: Político e Engenheiro Eletrotécnico</p></p>
</div>
<h4>Projectos do UNITA</h4>
<p>
    <ul>
        <li>Criação de um Governo Inclusivo e Participativo (GIP)</li>
        <li>Salário mínimo de 150 mil kwanzas</li>
        <li>Colocar as pessoas nos lugares certos em função da sua competência</li>
        
    </ul>
</p>
<div class="btn-votar">
  <input type="radio" name="partyId" value="${id}" id="votoU"/>
  <label for="votoU" class="btn-local-sala">Votar</label>

  <input type="text" readonly value="Número de votos: ${votos ? votos : 0}">
</div>
</div>
`;
};

const phaTemplate = (id, votos) => {
  return `
<div class="partido container" id="PHA">
  <h3>Partido Humanista de Angola</h3>
  <img src="./votacao/bandeira-humanista.png" alt="Bandeira do Partido UNITA" class="baneira"/>
  <div class="img-p">
    <img src="./votacao/candidato-humanista.jpg" alt="Foto do Candidato do Humanista" class="candidato"/>
    <p>Candidato: Florbela Catarina "Bela" Malaquias  <br>
        Natural: Luena(Moxico) <br>
        Profissão: Ativista Política, Jornalista, Escritora, Ex-militar e Advogada</p></p>
  </div>
  <h4>Projectos do Partido Humanista de Angola</h4>
  <p>
      <ul>
          <li>Prometeu acabar com a fome e a pobreza em Angola;</li>
          <li>Prometeu educação gratuita para todos;</li>
      </ul>
  </p>
  <div class="btn-votar">
    <input type="radio" name="partyId" value="${id}" id="votoP"/>
    <label for="votoP" class="btn-local-sala">Votar</label>

    <input type="text" readonly value="Número de votos: ${votos ? votos : 0}"/>
  </div>
</div>
`;
};

const token = getCookie("sepoToken");

if (!token) {
  alert("Faça o login para poderes votar");
  document.location.href = "./login.html";
}

if (token) {
  userData = parseJwt(token);
}

async function iniciarATelaDeVoto() {
  const partidos = await loadPartidos();
  Elementpartidos.innerHTML = "";

  partidos.forEach((partido) => {
    if (partido.nome === "MPLA") {
      Elementpartidos.innerHTML += mplaTemplate(
        partido.id,
        partido.voters.length
      );
    }
    if (partido.nome === "UNITA") {
      Elementpartidos.innerHTML += unitaTemplate(
        partido.id,
        partido.voters.length
      );
    }
    if (partido.nome === "PHA") {
      Elementpartidos.innerHTML += phaTemplate(
        partido.id,
        partido.voters.length
      );
    }
  });
}

iniciarATelaDeVoto();
