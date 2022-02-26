const allPlayer = () => {
	document.getElementById("spinner").style.display = "block";
	let searchValue = document.getElementById("search-box").value;
	const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => processPlayerData(data.player));

	document.getElementById("search-box").value = "";
};

const processPlayerData = (players) => {
	if (players) {
		document.getElementById("spinner").style.display = "none";
	} else {
		document.getElementById("spinner").style.display = "block";
	}
	const parent = document.getElementById("player-container");
	parent.innerText = "";
	for (const player of players) {
		const div = document.createElement("div");
		div.innerHTML = `
        <div class="card border border-warning mt-5">
            <div class="pro-pic">
                <img class="w-50 p-3" src="${player.strThumb}" alt="" />
            </div>
            <h2>${player.strPlayer}</h2>
            <h4>${player.strNationality}</h4>
            <div class="allbutton mt-4 mb-2">
                <button id="delete-btn" class="btn btn-danger mx-2">
                    Delete
                </button>
                <button id="details-btn" onclick="playerDetails(${player.idPlayer})" class="btn btn-success">
                    Details
                </button>
            </div>
        </div>`;
		parent.appendChild(div);
	}
};

const playerDetails = (playerID) => {
	const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerID}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => showPlayerDetails(data.players[0]));
};

const showPlayerDetails = (player) => {
	const parent = document.getElementById("player-details");
	parent.innerText = "";
	const div = document.createElement("div");
	console.log(player.strGender);
	if (player.strGender == "Male") {
		document.getElementById("male").style.display = "block";
		document.getElementById("female").style.display = "none";
	} else {
		document.getElementById("male").style.display = "none";
		document.getElementById("female").style.display = "block";
	}
	div.innerHTML = `
        <div class="card border border-success">
            <div class="pro-pic">
                <img class="w-50 p-3" src="${player.strThumb}" alt="" />
            </div>
            <h2>${player.strPlayer}</h2>
            <h5>${player.strNationality}</h5>
            <h4>${player.strPosition}</h4>
            <h6>Gender: ${player.strGender}, Height: ${player.strHeight}, Weight: ${player.strWeight}</h6>
            <p>${player.strDescriptionEN},</p>    
        </div>`;
	parent.appendChild(div);
};
