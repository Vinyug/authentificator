"use strict"
// log qui fonctionne
// login : eric@free.fr
// mdp : 123456

let cells = document.querySelectorAll('td');
const btnDelete = document.querySelector('#clear');
const submit = document.querySelector('#submit');
const mesContainer = document.querySelector('.messageContainer');
const comment = document.querySelector('#message');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');

cells.forEach(cell => cell.addEventListener('click', valueInputPassword));
submit.addEventListener('click', validate);
btnDelete.addEventListener('click', attributeNum);

// Initialisation messageContainer
function messDisplayNone() {
    mesContainer.style.display = 'none';
}

// Initialisation des cellules
function initCells() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('caseActive'); 
    });
}

// Initialisation Input
function initInput() {
    loginInput.value = '';
    passwordInput.value = '';
}

// Attribuer 0 à 9 dans les 16 cases, aléatoirement
function attributeNum() {
    messDisplayNone();
    initCells();
    initInput();
    cells = Array.from(cells);
    
    for(let i = 0; i < 10; i++) {
        const num = Math.floor(Math.random() * 16);
        if(!cells[num].innerText) {
            const cell = cells[num];
            cell.innerText = i;
            cell.classList.add('caseActive');
        } else {
            i--;
        }
    }
}

// Click sur une cell, affiche sa valeur dans input password
function valueInputPassword(e) {
    if(passwordInput.value < 100000) {
        passwordInput.value += e.target.innerText;
    }
}

// FETCH
function validate() {
    let url = `https://www.ericfree.net/formation/api/check_user.php`;
    let formData = new FormData(log);
    let init = {
        method: 'post',
        body: formData
    }
    
    fetch(url, init)
    .then(res => {
        if(!res.ok)
            return new Promise((resolve,reject) => reject(new Error("Invalid response")));
        return res.json();
    })
    .then(json => {
        mesContainer.style.display = 'block';
        comment.innerText = json.message;
    })
    .catch(error => console.log(`Erreur : ${error.message}`));
} 

attributeNum();