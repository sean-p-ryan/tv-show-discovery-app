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

const injectStyles = () => {
    var css = `
    body {
        color: #000000;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        font-family: 'Roboto Mono', monospace;
        overflow-y: hidden;
        background-color: #ffffff;
        background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
        background-position: stretch;
        background-size: cover;
        background-repeat: no-repeat;
    }

    h1, p {
        margin: 2% 5% 0% 5%;
    }
    h1 {
        margin-bottom: 2%;
    }
    `
    var head = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

injectStyles()
getShowData();