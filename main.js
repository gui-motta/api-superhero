const BASE_URL = "https://superheroapi.com/api.php";
const API_KEY = "1864335817096235";

const myCards = [12, 33, 44];
const selctedCard = 12;

window.onload = () => {
    this.getResult();
};

function getRandom() {
    return Math.floor(Math.random() * 731) + 1;
}

function callApi(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
        let status = xhr.status;
        if (status === 200) {
            callback(status, xhr.response);
        } else {
            alert("Problemas para conectar ao servidor");
        }
    };
    xhr.send();
}

function getResult() {
    let heroi1;
    let heroi2;
    for (let i = 0; i < 2; i++) {
        let url = BASE_URL + "/" + API_KEY + "/" + getRandom();

        callApi(url, (status, data) => {
            let name = data.name;
            let intelligence = isNaN(data.powerstats.intelligence) ?
                1 :
                parseInt(data.powerstats.intelligence);
            let strength = isNaN(data.powerstats.strength) ?
                1 :
                parseInt(data.powerstats.strength);
            let speed = isNaN(data.powerstats.speed) ?
                1 :
                parseInt(data.powerstats.speed);
            let durability = isNaN(data.powerstats.durability) ?
                1 :
                parseInt(data.powerstats.durability);
            let power = isNaN(data.powerstats.power) ?
                1 :
                parseInt(data.powerstats.power);
            let combat = isNaN(data.powerstats.combat) ?
                1 :
                parseInt(data.powerstats.combat);
            let image = data.image.url;

            document.getElementById(`hero${i + 1}`).innerHTML =
                "<article> <img src='" +
                image +
                "'/>" +
                "<h1 class='nome'> " +
                name +
                " </h1>" +
                "<p> Inteligencia: <div class='atribute'  style='width: " +
                intelligence +
                "%; height: 21px; background-color: #F9B32F;'> </div></p>" +
                "<p> Força: <div class='atribute'  style='width: " +
                strength +
                "%; height: 21px;background-color: #FF7C6C'></div></p>" +
                "<p> Velocidade: <div class='atribute'  style='width: " +
                speed +
                "%; height: 21px;background-color: #22A7F0'></div></p>" +
                "<p> Durabilidade: <div class='atribute'  style='width: " +
                durability +
                "%; height: 21px;background-color: #3EDC81'></div></p>" +
                "<p> Poder: <div class='atribute'  style='width: " +
                power +
                "%; height: 21px;background-color: #AB69C6'></div></p>" +
                "<p> Combate: <div class='atribute'  style='width: " +
                combat +
                "%; height: 21px;background-color: #9CAAB9'></div></p>" +
                "</article>";

            let overall =
                intelligence + strength + speed + durability + power + combat;

            if (i == 0) {
                heroi1 = { name, overall };
            } else {
                heroi2 = { name, overall };
            }

            if (heroi1 && heroi2) {
                if (heroi1.overall > heroi2.overall) {
                    document.getElementById(`winner`).innerHTML = "O Vencedor é: " + heroi1.name;
                } else if (heroi1.overall < heroi2.overall) {
                    document.getElementById(`winner`).innerHTML = "O Vencedor é: " + heroi2.name;
                } else {
                    document.getElementById(`winner`).innerHTML = "Tivemos um empate entre: " + heroi1.name + " e " + heroi2.name;
                }
            }
        });
    }
}