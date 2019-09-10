var showInfoText = {
    title: "",
    description: "Here's a description of the show.",
    firstAir: "September 3, 2019"
}

const getShowData = async() => {
    const url = window.location.href;
    const paramArray = url.split("/");
    const showId = parseInt(paramArray[paramArray.length - 1].toString());
    await fetch(`/show/data/${showId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            updateShowInfoText(data)
        })
        .catch(err => console.log(err))
}

const updateShowInfoText = (data) => {
    showInfoText.title = `${data.original_name}`;
    showInfoText.description = `${data.overview}`
    showInfoText.firstAir = `${data.first_air_date}`
    addMarkup()
}

const addMarkup = () => {
    var markup = `
    <h1 class="show-title">${showInfoText.title}</h1>
    <p>${showInfoText.description}</p>
    <p>This show first aired on ${showInfoText.firstAir}</p>
    `
    document.body.innerHTML = markup;
}

getShowData();