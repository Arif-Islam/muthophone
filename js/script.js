// get search input
const searchResults = () => {
    document.getElementById('spinner').style.display = 'block';
    // document.getElementById('details-div').style.display = 'none';
    const searchText = document.getElementById('search-input').value;
    // checking some cases
    if (!isNaN(searchText) || searchText == '') {
        document.getElementById('warning').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('phones').style.display = 'none';
        document.getElementById('no-match').style.display = 'none';
    }
    else {
        loadPhones(searchText);
    }
    document.getElementById('search-input').value = '';
}

// load phones using api
const loadPhones = searchText => {
    let url = 'https://openapi.programming-hero.com/api/phones?search=';
    url += searchText;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

// display phones 
const displayPhones = phones => {
    // console.log(phones);
    // checking some cases
    if (phones.length == 0) {
        document.getElementById('no-match').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('warning').style.display = 'none';
        document.getElementById('phones').style.display = 'none';
        // document.getElementById('details-div').style.display = 'none';
    }
    else {
        document.getElementById('warning').style.display = 'none';
        document.getElementById('no-match').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        // document.getElementById('details-div').style.display = 'none';
        // console.log(phones);
        const allPhonesDiv = document.getElementById('phones');
        allPhonesDiv.textContent = '';
        phones.slice(0, 20).forEach(phone => {
            // console.log(phone);
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('phone-div-style');
            phoneDiv.innerHTML = `
                <img class="rounded-md pt-4" src="${phone.image}">
                <h2 class="text-xl lg:text-2xl font-medium text-zinc-700 pt-4">Brand: ${phone.brand}</h2>
                <h2 class="text-xl lg:text-2xl font-medium text-zinc-700 pt-4">${phone.phone_name}</h2>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="text-lg lg:text-xl font-medium text-gray-800 rounded-md my-4 px-5 py-2 bg-gray-300 hover:bg-gray-400">View Details</button>
            `;
            allPhonesDiv.appendChild(phoneDiv);
        })
    }
}

// loading phone details using api
const loadPhoneDetails = phoneSlug => {
    let url = 'https://openapi.programming-hero.com/api/phone/';
    // console.log(phoneSlug);
    url += phoneSlug;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

// display phone specs
const displayPhoneDetails = config => {
    console.log(config);
    document.getElementById('hidden-details').style.display = 'block';
    const phoneDetailDiv = document.getElementById('mobile-details');
    phoneDetailDiv.textContent = '';
    const imageNamediv = document.createElement('div');
    let releaseDate = config.releaseDate;
    if (releaseDate == '') {
        releaseDate = 'No release date found!'
    }
    imageNamediv.innerHTML = `
        <img src=${config.image}>
        <h2 class="text-xl lg:text-2xl font-medium text-zinc-700 pt-3">${config.name}</h2>
        <h2 class="text-lg lg:text-xl font-medium text-zinc-700 pt-3">${releaseDate}</h2>
    `;

    phoneDetailDiv.appendChild(imageNamediv);
}



