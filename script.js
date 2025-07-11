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

const container = document.querySelector('#profile-container');

const cardProfile= (name ,username ,email ,phone ,company ,street, suite) => {
    const data = `
    <div class="card">
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
        response.forEach(result => {
            cardProfile(result.name ,result.username ,result.email ,result.phone ,result.company.name ,result.address.street,result.address.suite);
        });
    })
    .catch((error)=>{
        console.error('Error rendering data:', error);
    })
}

render();