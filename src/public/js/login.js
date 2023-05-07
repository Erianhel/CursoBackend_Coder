/* const loginButton = document.getElementById('login');

loginButton.addEventListener('submit', ()=>{
    fetch('/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        localStorage.setItem('authToken',json.token);
    })
}) */