function calcularPagamentoHorasExtras(salarioBase, horasMensais, horasExtras, porcentagemHoraExtra, possuiAdicionalNoturno) {
    const totalHoras = horasMensais + horasExtras;
    let valorHoraExtra = salarioBase / horasMensais;  
    let pagamentoHorasExtras = horasExtras * valorHoraExtra;  
    let pagamentoAdicionalNoturno = 0;
    if (possuiAdicionalNoturno) {
        valorHoraExtra *= 1.20;  
        pagamentoAdicionalNoturno = horasExtras * valorHoraExtra * 0.20;  
    }
    valorHoraExtra *= (1 + (porcentagemHoraExtra / 100));  
    pagamentoHorasExtras = horasExtras * valorHoraExtra;  
    return {pagamentoHorasExtras: pagamentoHorasExtras.toFixed(2), pagamentoAdicionalNoturno: pagamentoAdicionalNoturno.toFixed(2)};
}


const formFuncionario = document.getElementById('formFuncionario');

const resultadosDiv = document.getElementById('resultados');

const valorTotalDiv = document.getElementById('valorTotal');


let contadorFuncionario = 1;


formFuncionario.addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nome = formFuncionario.elements['nome'].value;
    const salarioBase = parseFloat(formFuncionario.elements['salarioBase'].value);
    const horasMensais = parseFloat(formFuncionario.elements['horasMensais'].value);
    const horasExtras = parseFloat(formFuncionario.elements['horasExtras'].value);
    const porcentagemHoraExtra = parseFloat(formFuncionario.elements['porcentagemHoraExtra'].value);
    const possuiAdicionalNoturno = formFuncionario.elements['adicionalNoturno'].value === 'sim';

    
    const { pagamentoHorasExtras, pagamentoAdicionalNoturno } = calcularPagamentoHorasExtras(salarioBase, horasMensais, horasExtras, porcentagemHoraExtra, possuiAdicionalNoturno);

    
    let valorTotal = salarioBase + parseFloat(pagamentoHorasExtras) + parseFloat(pagamentoAdicionalNoturno);

    
    adicionarResultados(contadorFuncionario, nome, salarioBase, horasMensais, horasExtras, porcentagemHoraExtra, possuiAdicionalNoturno, pagamentoHorasExtras, pagamentoAdicionalNoturno, valorTotal);

    
    contadorFuncionario++;
});


function adicionarResultados(numeroFuncionario, nome, salarioBase, horasMensais, horasExtras, porcentagemHoraExtra, possuiAdicionalNoturno, pagamentoHorasExtras, pagamentoAdicionalNoturno, valorTotal) {
    
    const divFuncionario = document.createElement('div');
    divFuncionario.classList.add('funcionario');

    
    divFuncionario.innerHTML = `
        <h3>Funcionário ${numeroFuncionario}</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Salário Base:</strong> R$ ${salarioBase.toFixed(2)}</p>
        <p><strong>Horas Mensais:</strong> ${horasMensais}</p>
        <p><strong>Horas Extras:</strong> ${horasExtras}</p>
        <p><strong>Porcentagem da Hora Extra:</strong> ${porcentagemHoraExtra}%</p>
        <p><strong>Possui Adicional Noturno:</strong> ${possuiAdicionalNoturno ? 'Sim' : 'Não'}</p>
        <p><strong>Pagamento pelas horas extras:</strong> R$ ${pagamentoHorasExtras}</p>
        ${possuiAdicionalNoturno ? `<p><strong>Pagamento pelo adicional noturno:</strong> R$ ${pagamentoAdicionalNoturno}</p>` : ''}
        <p><strong>Valor Total:</strong> R$ ${valorTotal.toFixed(2)}</p>
    `;

    
    resultadosDiv.appendChild(divFuncionario);
}

