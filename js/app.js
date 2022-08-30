const loadBooks = (search, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        .then(res => res.json())
        .then(data => displayBooks(data.data, dataLimit))
}
const displayBooks = (phones, dataLimit = 0) => {
    // console.log(phones);
    if (dataLimit > 0 && phones.length > 10) {
        phones = phones.slice(0, 10)
        document.getElementById('show-all').classList.remove('d-none');
    } else {
        document.getElementById('show-all').classList.add('d-none');
    }


    // Error-Msg for not finding any data
    if (phones.length === 0) {
        document.getElementById('error-msg').classList.remove('d-none')
    } else {
        document.getElementById('error-msg').classList.add('d-none')
    }
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        // console.log(phone);
        const singlePhone = document.createElement('div');
        singlePhone.classList.add('col');
        singlePhone.innerHTML = `
        <div class="card shadow-lg">
            <div class="img-container">
                <img src="${phone.image}" class="img" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name} </h5>
                <p class="card-text">Using mobile phones for a long time makes the user get addicted to it.
                    Some consider it a major source of distraction especially for students</p>
            
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
                        Show Details
                </button>
            </div>
        </div>
        `
        phoneContainer.appendChild(singlePhone);
    });

    // Spinner
    loadingSpinner(false)
}

// Process Searching
const processSearch = (dataLimit) => {
    loadingSpinner(true);
    const searchField = document.getElementById('phone-search');
    const searchFieldValue = searchField.value;
    loadBooks(searchFieldValue, dataLimit);
    // searchField.value = '';
}

// Search-Button
document.getElementById('phone-search-btn').addEventListener('click', function () {
    processSearch(10);
})
document.getElementById('phone-search').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

// Show-All-Button
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})


// load Phone Details
const loadPhoneDetails = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

// Display Phone Details
const displayPhoneDetails = (phone) => {
    console.log(phone)
    document.getElementById('phoneDetailModalLabel').innerText = phone.name;
    document.getElementById('modal-body').innerHTML = `
    <div class="d-flex justify-content-around">
        <img class="me-2" src="${phone.image}" alt="">
        <div class="text-center">
            <h2>Main Features</h2>
            <p>${phone.mainFeatures.chipSet}</p>
            <p>${phone.mainFeatures.displaySize}</p>
            <p>${phone.mainFeatures.memory}</p>
        </div>
    </div>
    `;
}


// Spinner
const loadingSpinner = (isLoading) => {
    const loader = document.getElementById('loading-spinner');
    if (isLoading) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}
loadBooks('apple', 10);