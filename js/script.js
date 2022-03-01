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

    const imagediv = document.createElement('div');
    imagediv.classList.add('image-div-style');
    imagediv.innerHTML = `
        <img src=${config.image}>
    `;

    const featuresDiv = document.createElement('div');
    let releaseDate = config.releaseDate;
    if (releaseDate == '') {
        releaseDate = 'No release date found!';
    }
    const sensorsArray = config.mainFeatures.sensors;
    let sensors = '', c = 0;
    for (const iterator of sensorsArray) {
        if (c == sensorsArray.length - 1) {
            sensors += iterator;
        }
        else {
            sensors += iterator + ', ';
        }
        c++;
    }
    // console.log(sensors);
    featuresDiv.innerHTML = `
        <h2 class="text-xl lg:text-2xl xl:text-3xl font-medium text-zinc-700 text-center">${config.name}</h2>
        <h2 class="text-lg lg:text-xl font-normal text-zinc-700 text-center mt-2">${releaseDate}</h2>
        <h2 class="text-xl lg:text-2xl xl:text-3xl font-medium text-zinc-700 text-center my-3">Main Features</h2>
        <hr class="border border-black">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Chipset: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.mainFeatures.chipSet}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Display: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.mainFeatures.displaySize}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Memory: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.mainFeatures.memory}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Sensors: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${sensors}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Storage: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.mainFeatures.storage}</h2> 
        </div>
        <hr class="border border-gray-200">
        <h2 class="text-xl lg:text-2xl xl:text-3xl font-medium text-zinc-700 text-center my-3">Other Features</h2>
        <hr class="border border-black">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Bluetooth: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.Bluetooth}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">GPS: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.GPS}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">NFC: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.NFC}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">Radio: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.Radio}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">USB: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.USB}</h2> 
        </div>
        <hr class="border border-gray-200">
        <div class="flex justify-between items-center p-2">
            <h2 class="text-lg lg:text-2xl font-medium text-zinc-700 mr-4 lg:mr-0">WLAN: </h2>
            <h2 class="text-base lg:text-xl font-normal text-zinc-700">${config.others.WLAN}</h2> 
        </div>
        <hr class="border border-gray-200">
    `;

    phoneDetailDiv.appendChild(imagediv);
    phoneDetailDiv.appendChild(featuresDiv);
}



