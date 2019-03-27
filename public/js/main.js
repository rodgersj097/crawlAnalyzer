import { method } from "../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/@types/bluebird";

const button = document.querySelector('.checkButton');

button.addEventListener('click', function(){
    confirm.log('Check url') 
    fetch('/clicked', {method: 'POST'})
        .then(res => {
            if(res.ok){
                
            }
        })












})