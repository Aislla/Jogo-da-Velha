import { useState } from "react";

function Quadrado({quadrado, cliqueQuadrado}) {
    return (
        <button class="quadrado" 
            onClick={cliqueQuadrado}>
            {quadrado}
        </button>
    );
}

function Tabuleiro({vezDoX, quadrados, handleClick, rodada}) {
    let vencedor = identificarVencedor(quadrados);
   
    let mensagem;
    if (vencedor){
        mensagem = 'O vencedor é o jogador ' + vencedor + '!';
    } else {
        mensagem = 'Vez do ' + (vezDoX ? 'X' : 'O') + '!';
    }

    return (
        <>
            <h3>{mensagem}</h3>
            <div class="linha">
                <Quadrado quadrado={quadrados[0]} cliqueQuadrado={() => handleClick(0)}/>
                <Quadrado quadrado={quadrados[1]} cliqueQuadrado={() => handleClick(1)}/>
                <Quadrado quadrado={quadrados[2]} cliqueQuadrado={() => handleClick(2)}/>
            </div>
            <div class="linha">
                <Quadrado quadrado={quadrados[3]} cliqueQuadrado={() => handleClick(3)}/>
                <Quadrado quadrado={quadrados[4]} cliqueQuadrado={() => handleClick(4)}/>
                <Quadrado quadrado={quadrados[5]} cliqueQuadrado={() => handleClick(5)}/>
            </div>
            <div class="linha">
                <Quadrado quadrado={quadrados[6]} cliqueQuadrado={() => handleClick(6)}/>
                <Quadrado quadrado={quadrados[7]} cliqueQuadrado={() => handleClick(7)}/>
                <Quadrado quadrado={quadrados[8]} cliqueQuadrado={() => handleClick(8)}/>
            </div>        
        </>
    );
    
}

function identificarVencedor(quadrados){
    const combinaçoesVitoriosas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < combinaçoesVitoriosas.length; i++){
        const [p1, p2, p3] = combinaçoesVitoriosas[i];
        if(quadrados[p1] && quadrados[p1] === quadrados[p2] && quadrados[p2] === quadrados[p3]){
            return quadrados[p1];
        }
    }
    return null;
}

function Jogo() {
    const [quadrados, setQuadrados] = useState(Array(9).fill(null));
    const [vezDoX, setVezDoX] = useState(true);
    const [vencedor, setVencedor] = useState(null);

    function handleClick(indice) {
        if (identificarVencedor(quadrados) || quadrados[indice]) {
            return;
        }
        const novosQuadrados = quadrados.slice();
        novosQuadrados[indice] = vezDoX ? 'X' : 'O';
        setQuadrados(novosQuadrados);
        setVezDoX(!vezDoX);
        const vencedorAtual = identificarVencedor(novosQuadrados);
        if (vencedorAtual) {
            setVencedor(vencedorAtual);
        }
    }

    function resetJogo(){
        setQuadrados(Array(9).fill(null));
        setVezDoX(true);
        setVencedor(null);
    }

    return (
        <div className="container">
            <h1>JOGO DA VELHA</h1>
            <Tabuleiro vezDoX={vezDoX} 
                quadrados={quadrados} 
                handleClick={handleClick} />
            <button class="botao"
            onClick = {resetJogo}>Reiniciar Jogo</button>
            {vencedor && <h2>GAME OVER</h2>}
        </div>
    );
}

export default Jogo;