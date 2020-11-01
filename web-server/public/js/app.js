
console.log("Javascript from the client side")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageForcast = document.querySelector('#message-forcast')

const messageLocation = document.querySelector('#message-location')



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    messageForcast.textContent = 'Loading...'
    messageLocation.textContent = ''
    
    fetch('/weather2?address='+location).then((response) => {
        response.json().then((data)=> {
            messageForcast.textContent = data.forcast
            messageLocation.textContent = data.location
        })
    })
})