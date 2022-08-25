
/* MODAL DE JUEGO GANADO */

const newGameBtnModal = document.querySelector("#newGameButtonModal");
const reiniciarBtnModal = document.querySelector("#resetButtonModal");


let overlay = document.querySelector('.overlay'),
    modal = document.querySelector('.modal.modal__win');

   const showModal = () =>{
    overlay.style.visibility = 'visible';
    modal.classList.add('show');
    }

    const hideModal = () =>{
        overlay.style.visibility = 'hidden';
        overlayFail.style.visibility = 'hidden';
        modal.classList.remove('show');
        modalFail.classList.remove('show');
        }

    newGameBtnModal.addEventListener('click',hideModal, newGame)


/* MODAL DE JUEGO PERDIDO */
    let overlayFail = document.querySelector('.overlay_fail'),
    modalFail = document.querySelector('.modal.modal__fail');

    const showModalFail = () =>{
        overlayFail.style.visibility = 'visible';
        modalFail.classList.add('show');
        }

    reiniciarBtnModal.addEventListener('click',hideModal)