console.log('JavaScript carregado!');

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('DOM carregado!');
    
    // =============================================
    // FORMULÁRIO DE CADASTRO
    // =============================================
    
    const form = document.querySelector('form');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmar-senha');
    const telefone = document.getElementById('telefone');
    const termos = document.querySelector('input[name="termos"]');
    
    console.log('Form:', form);
    console.log('Senha:', senha);
    console.log('Confirmar Senha:', confirmarSenha);
    console.log('Telefone:', telefone);
    console.log('Termos:', termos);
    
    // 1. VALIDAÇÃO DA SENHA (mínimo 8 caracteres) - SÓ EXECUTA SE EXISTIR
    if (senha) {
        senha.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 8) {
                this.style.borderColor = 'red';
                this.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            } else if (this.value.length >= 8) {
                this.style.borderColor = 'green';
                this.style.boxShadow = '0 0 5px rgba(0,255,0,0.5)';
            } else {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
            
            // Toda vez que a senha mudar, revalida a confirmação
            if (confirmarSenha) {
                verificarConfirmacaoSenha();
            }
        });
    }
    
    // 2. VALIDAÇÃO DA CONFIRMAÇÃO DE SENHA - SÓ EXECUTA SE EXISTIR
    function verificarConfirmacaoSenha() {
        if (!confirmarSenha) return;
        
        // Se o campo confirmação estiver vazio
        if (confirmarSenha.value.length === 0) {
            confirmarSenha.style.borderColor = '#ddd';
            confirmarSenha.style.boxShadow = 'none';
            return;
        }
        
        // Verifica se a senha tem 8+ caracteres E se a confirmação é igual à senha
        if (senha.value.length >= 8 && confirmarSenha.value === senha.value) {
            confirmarSenha.style.borderColor = 'green';
            confirmarSenha.style.boxShadow = '0 0 5px rgba(0,255,0,0.5)';
        } else {
            confirmarSenha.style.borderColor = 'red';
            confirmarSenha.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
        }
    }
    
    // Quando digitar na confirmação, chama a função - SÓ EXECUTA SE EXISTIR
    if (confirmarSenha) {
        confirmarSenha.addEventListener('input', function() {
            verificarConfirmacaoSenha();
        });
    }
    
    // 3. FORMATAÇÃO DO TELEFONE (com DDD) - SÓ EXECUTA SE EXISTIR
    if (telefone) {
        telefone.addEventListener('input', function() {
            let valor = this.value.replace(/\D/g, '');
            
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = '(' + valor;
                } else if (valor.length <= 6) {
                    valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
                } else if (valor.length <= 10) {
                    valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 6) + '-' + valor.substring(6);
                } else {
                    valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7, 11);
                }
            }
            
            this.value = valor;
            
            // Valida se tem DDD completo (10 ou 11 dígitos)
            const numeros = this.value.replace(/\D/g, '');
            if (numeros.length > 0 && numeros.length < 10) {
                this.style.borderColor = 'orange';
                this.style.boxShadow = '0 0 5px rgba(255,165,0,0.5)';
            } else if (numeros.length === 10 || numeros.length === 11) {
                this.style.borderColor = 'green';
                this.style.boxShadow = '0 0 5px rgba(0,255,0,0.5)';
            } else {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    // 4. VALIDAÇÃO AO ENVIAR O FORMULÁRIO DE CADASTRO - SÓ EXECUTA SE EXISTIR
    if (form) {
        form.addEventListener('submit', function(event) {
            let erros = [];
            
            // Verifica senha (mínimo 8 caracteres)
            if (senha.value.length < 8) {
                erros.push('A senha deve ter no mínimo 8 caracteres.');
                senha.style.borderColor = 'red';
                senha.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            }
            
            // Verifica se as senhas são iguais
            if (senha.value !== confirmarSenha.value) {
                erros.push('As senhas não coincidem.');
                confirmarSenha.style.borderColor = 'red';
                confirmarSenha.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            }
            
            // Verifica se o telefone tem DDD (11 dígitos)
            const numerosTelefone = telefone.value.replace(/\D/g, '');
            if (numerosTelefone.length > 0 && numerosTelefone.length < 11) {
                erros.push('O telefone deve ter DDD + número (ex: (14) 99999-9999).');
                telefone.style.borderColor = 'red';
                telefone.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            }
            
            // Verifica se os termos foram aceitos
            if (!termos.checked) {
                erros.push('Você deve concordar com os termos e condições.');
                termos.style.outline = '2px solid red';
                termos.style.borderRadius = '3px';
            }
            
            // Se houver erros, impede o envio
            if (erros.length > 0) {
                event.preventDefault();
                alert('❌ ' + erros.join('\n❌ '));
            } else {
                event.preventDefault();
                alert('✅ Cadastro realizado com sucesso!');

                // === LIMPAR TODOS OS CAMPOS ===
                document.getElementById('nome').value = '';
                document.getElementById('email').value = '';
                document.getElementById('senha').value = '';
                document.getElementById('confirmar-senha').value = '';
                document.getElementById('telefone').value = '';
                document.getElementById('data-nascimento').value = '';
                
                termos.checked = false;
                
                senha.style.borderColor = '#ddd';
                senha.style.boxShadow = 'none';
                confirmarSenha.style.borderColor = '#ddd';
                confirmarSenha.style.boxShadow = 'none';
                telefone.style.borderColor = '#ddd';
                telefone.style.boxShadow = 'none';
                termos.style.outline = 'none';
                
                document.getElementById('nome').focus();
            }
        });
    }
    
    // =============================================
    // FORMULÁRIO DE CONTATO
    // =============================================
    
    // Pega o formulário de contato pelo ID
    const formContato = document.getElementById('form-contato');
    
    console.log('Formulário de contato:', formContato);
    
    // Se existir o formulário de contato (página contato.html)
    if (formContato) {
        
        console.log('Formulário de contato ENCONTRADO!');
        
        // Pega os campos do formulário de contato
        const nomeContato = document.getElementById('nome');
        const emailContato = document.getElementById('email');
        const mensagemContato = document.getElementById('mensagem');
        
        console.log('Nome:', nomeContato);
        console.log('Email:', emailContato);
        console.log('Mensagem:', mensagemContato);
        
        // Quando enviar o formulário de contato
        formContato.addEventListener('submit', function(event) {
            event.preventDefault();
            
            console.log('Botão ENVIAR clicado!');
            
            let camposVazios = [];
            
            if (nomeContato.value.trim() === '') {
                camposVazios.push('Preencha o campo Nome.');
                nomeContato.style.borderColor = 'red';
                nomeContato.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            } else {
                nomeContato.style.borderColor = '#ddd';
                nomeContato.style.boxShadow = 'none';
            }
            
            if (emailContato.value.trim() === '') {
                camposVazios.push('Preencha o campo Email.');
                emailContato.style.borderColor = 'red';
                emailContato.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            } else {
                emailContato.style.borderColor = '#ddd';
                emailContato.style.boxShadow = 'none';
            }
            
            if (mensagemContato.value.trim() === '') {
                camposVazios.push('Preencha o campo Mensagem.');
                mensagemContato.style.borderColor = 'red';
                mensagemContato.style.boxShadow = '0 0 5px rgba(255,0,0,0.5)';
            } else {
                mensagemContato.style.borderColor = '#ddd';
                mensagemContato.style.boxShadow = 'none';
            }
            
            if (camposVazios.length > 0) {
                alert('❌ ' + camposVazios.join('\n❌ '));
            } else {
                alert('✅ Contato enviado com sucesso!');
                
                nomeContato.value = '';
                emailContato.value = '';
                mensagemContato.value = '';
                
                nomeContato.style.borderColor = '#ddd';
                nomeContato.style.boxShadow = 'none';
                emailContato.style.borderColor = '#ddd';
                emailContato.style.boxShadow = 'none';
                mensagemContato.style.borderColor = '#ddd';
                mensagemContato.style.boxShadow = 'none';
                
                nomeContato.focus();
            }
        });
    } else {
        console.log('Formulário de contato NÃO ENCONTRADO!');
    }
    
});