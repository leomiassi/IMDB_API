const form = document.querySelector('#searchForm');
const div = document.querySelector('#result');

const displayImages = (shows) => {
    for (let result of shows.d) {
        if (result.i.imageUrl) {
            const img = document.createElement('IMG');
            img.src = result.i.imageUrl;
            img.alt = result.l;
            img.style = "cursor: pointer;";
            img.width = "200";
            img.height = "300";
            div.append(img);
            img.addEventListener('click', () => {
                console.log(img.alt);
                console.log(result);
                div.innerHTML = '';
                div.append(img);
                div.id = "singleResult";

                const l = document.createElement("p");
                l.innerText = result.l;
                div.appendChild(l);
                const q = document.createElement("p");
                q.innerText = `Type: ${result.q}`
                div.appendChild(q);
                const rank = document.createElement("p");
                rank.innerText = `Rank: ${result.rank}`
                div.append(rank);
                const year = document.createElement("p");
                year.innerText = `Year: ${result.y}`; 
                div.append(year);
            })
        }
    }
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("SUBMITTED!");
    console.log(form.elements.query.value);

    div.innerHTML = '';
    div.id = "result";

    const searchTerm = form.elements.query.value
    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: { q: searchTerm },
        headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': 'cf6a374246msh91331e62aa16970p1436a8jsn0948d94453c9'
        }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        const imdb = response.data;
        displayImages(imdb);
    }).catch(function (error) {
        console.error(error);
        //alert("@leomiassi IMDb API requests has been reached!")
    });

    form.elements.query.value = ''; // reset the search placeholder.
})