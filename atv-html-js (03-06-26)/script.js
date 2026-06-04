window.onload = function() {
    
    const form = document.querySelector("form");
    const checkbox = document.getElementById("estudante");
    const senhaInput = document.getElementById("senha");
    const btnSenha = document.getElementById("btn-senha");
    const aviso = document.getElementById("aviso-senha");
    
    
    form.style.display = "none";
    
    
    checkbox.addEventListener("click", function() {
        if(checkbox.checked) {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    });
    
    
    btnSenha.addEventListener("click", function() {
        if(senhaInput.type === "password") {
            senhaInput.type = "text";
            btnSenha.textContent = "Ocultar";
        } else {
            senhaInput.type = "password";
            btnSenha.textContent = "Mostrar";
        }
    });
    
    
    senhaInput.addEventListener("input", function() {
        if(senhaInput.value.length < 8 && senhaInput.value.length > 0) {
            aviso.textContent = "A senha precisa ter pelo menos 8 caracteres";
            aviso.style.color = "red";
            senhaInput.style.outline = "2px solid red";
        } else {
            aviso.textContent = "";
            senhaInput.style.outline = "";
        }
    });
}