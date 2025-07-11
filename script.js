const container = document.querySelector('#profile-container');
const modal = document.getElementById('myModal')
const modalSpan = document.getElementsByClassName("close")[0];

const UsersData = [];

async function getData(url) {
    try{
        const dataUrl = await fetch(url);
        if(!dataUrl.ok){
            throw new Error(`Response status: ${dataUrl.status}`)
        }
        return await dataUrl.json();
    }
    catch(error)
    {
        console.error(error.message)
    }
}

const cardProfile = (id, name ,username ,email ,phone ,company ,street, suite) => {
    const data = `
    <div class="card" data-id="${id}">
            <div class="flex justify-between align-center">
                <div class="tag">
                    Activate
                </div>
                <div>
                 ooo
                </div>
            </div>
            <div class="main">
                <img class="image-profile" src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png" alt="">
                <p class="name">${name}</p>
                <p class="position">${username}</p>
            </div>
            <div class="description">
            <p class="id"><span>✉ </span>${email}</p>
            <p class="id"><span>📞 </span>${phone}</p>
                <p class="id"><span>💼 </span>${company} <span>
                <p class="id"><span>🏠 </span>${street} <span>

            </div>
        </div>
    `

    container.insertAdjacentHTML('afterbegin', data);
}

function render() {
    getData("https://jsonplaceholder.typicode.com/users")
    .then((response) =>{
        usersData = response;
        response.forEach(result => {
            cardProfile(result.id,result.name ,result.username ,result.email ,result.phone ,result.company.name ,result.address.street,result.address.suite);
        });
    })
    .catch((error)=>{
        console.error('Error rendering data:', error);
    })
}

const popUpProfile = (id) => {
    const user = usersData.find(user => user.id === id);
    document.getElementById('username').innerHTML = `${user.username}`
    document.getElementById('street').innerHTML = `Street: ${user.address.street}`
    document.getElementById('suite').innerHTML = `suite: ${user.address.suite}`
    document.getElementById('city').innerHTML = `city: ${user.address.city}`
    document.getElementById('zipcode').innerHTML = `zipcode: ${user.address.zipcode}`
    document.getElementById('lat').innerHTML = `lat: ${user.address.geo.lat}`
    document.getElementById('lng').innerHTML = `lng: ${user.address.geo.lng}`
    document.getElementById('companyName').innerHTML = `companyName: ${user.company.name}`
    document.getElementById('catchPhrase').innerHTML = `catchPhrase: ${user.company.catchPhrase}`
   document.getElementById('bs').innerHTML = `companyName: ${user.company.bs}`
}

container.addEventListener('click', function (e) {
    card = e.target.closest('.card')
    if(card){
        card_id = parseInt(card.getAttribute('data-id'))
        popUpProfile(card_id);
        modal.style.display = "block";

    }
});

modalSpan.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

render();