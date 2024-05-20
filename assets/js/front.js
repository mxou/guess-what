document.addEventListener('DOMContentLoaded', function() {

    const count_page_btn = document.querySelectorAll('.count_page_btn');
    const remove_btn = document.querySelector('.remove_btn');
    const add_btn = document.querySelector('.add_btn');
    const count_btn = document.querySelector('.count_btn');
    let count_player = 3;
    count_btn.textContent = Number(count_player);
    console.log(count_btn.textContent);

    count_page_btn.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('button_active');
            console.log('Classe togglée');
        });
    });

    function updateButtonState() {
    if (count_player === 2) {
        remove_btn.style.backgroundColor = '#FCD772';
        remove_btn.disabled = true;
        remove_btn.style.pointerEvents = 'none';
    } else {
        remove_btn.style.backgroundColor = '#FF8811';
        remove_btn.disabled = false;
        remove_btn.style.pointerEvents = 'auto';
    }
}

    

    add_btn.addEventListener('click', function(){
        count_player = count_player + 1;
        count_btn.textContent = Number(count_player);
        console.log(count_player);
        updateButtonState();
    });

     remove_btn.addEventListener('click', function(){
        count_player = count_player - 1;
        count_btn.textContent = Number(count_player);
        console.log(count_player);
        updateButtonState();
    });



});