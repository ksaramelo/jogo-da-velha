import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";

import topo from '../jogo-da-velha/assets/veinha.png'
import ganhou from '../jogo-da-velha/assets/comemorando.gif'
import perdeu from '../jogo-da-velha/assets/perdeu.gif'

const width = Dimensions.get('screen').width

export default function App() {
  const [tela, setTela] = useState ('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');
  
  function iniciarJogo(jogador){
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
                  ['', '', '',],
                  ['', '', '',],
                  ['', '', '',]
               ]);
    setTela('jogo');
  }

  function jogada(linha, coluna){
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificaGanhador(tabuleiro, linha, coluna);
  }

  function verificaGanhador(tabuleiro, linha, coluna){
    if(tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]){
      return finalizarJogo(tabuleiro[linha][0]);
    }

    if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]){
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    if(tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]){
      return finalizarJogo(tabuleiro[0][0]);
    }

    if(tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]){
      return finalizarJogo(tabuleiro[0][2]);
    }

    if(jogadasRestantes - 1 === 0){
      return finalizarJogo('');
    }
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador){
    setGanhador(jogador);
    setTela('ganhador');
  }

  switch(tela){
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }
  
  function getTelaMenu(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image style={styles.imagemMenu} source={topo}/>
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        <View style={styles.linhaItens}>
        <TouchableOpacity style={styles.boxJogador}
                          onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxJogador}
                          onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
        </TouchableOpacity>
        </View>

       </View>

    );
  }

  function getTelaJogo(){
    return (
      <>
      <View style={styles.linhaItensJogo}>
         <StatusBar style="auto" />
         <Image style={styles.imagemJogo} source={topo}/>
         <Text style={styles.tituloJogo}>Jogo da Velha</Text>
      </View>

      <View style={styles.containerJogo}>
      <StatusBar style="auto" />
         {
          tabuleiro.map((linha,numeroLinha) =>{
            return(
              <View key={numeroLinha} style={styles.linhaItens}>
                  {
                    linha.map((coluna,numeroColuna) => {
                      return (
                        <TouchableOpacity 
                        key={numeroColuna} 
                        style={styles.boxJogador}
                        onPress={() => jogada(numeroLinha, numeroColuna)} 
                        disabled={coluna !== ''} >
                          <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
              </View>
            )
          })
         }

        <TouchableOpacity onPress={() => setTela('menu')} style={styles.botaoMenu}>
          <Text style={styles.subtitulo}>Voltar ao menu</Text>
        </TouchableOpacity>
       </View>
       </>
    );
  }

  function getTelaGanhador(){
    return (
      <>
      <View style={styles.linhaItensJogo}>
         <StatusBar style="auto" />
         <Image style={styles.imagemJogo} source={topo}/>
         <Text style={styles.tituloJogo}>Jogo da Velha</Text>
      </View>

      <View style={styles.containerJogo}>
      <StatusBar style="auto" />


      {
        ganhador === '' &&
        <>
         <Image style={styles.gifPerdedor} source={perdeu}/>
        <Text style={styles.titulo}>Nenhum Ganhador</Text>
              </>
      }
      {
        ganhador !== '' &&
      <>
        <Image style={styles.gifGanhador} source={ganhou}/>
        <Text style={styles.titulo}> Jogador <Text style={ganhador == 'X' ? styles.ganhador : styles.ganhador}>{ganhador}</Text> ganhou!</Text>
      </>
      }


      <TouchableOpacity onPress={() => setTela('menu')} style={styles.botaoMenu}>
          <Text style={styles.subtitulo}>Voltar ao menu</Text>
        </TouchableOpacity>
       </View>
       </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagemMenu:{
    width: 200,
    height: 200
  },
  titulo:{
    fontSize: 40,
    fontWeight: "bold",
    color: "#3BA890"
  },
  subtitulo:{
    fontSize: 15,
    color: "#555",
    marginTop: 10,
  },
  jogadorX:{
    fontSize: 40,
    fontWeight: "bold",
    color: "#F5F5F5"
  },
  jogadorO:{
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000",
  },
  boxJogador:{
    width: 80,
    height: 80,
    backgroundColor: "#73dec6",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  linhaItens:{
    flexDirection: "row",
    marginTop: 10,
  },
  linhaItensJogo:{
    //flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    
  },
  imagemJogo:{
    width: 120,
    height: 120,
    margin: 5
  },
  tituloJogo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3BA890", 
    
  },
  containerJogo: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
  botaoMenu:{
  margin: 20
  },
  ganhador: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000",
  },
  gifGanhador:{
    width: "100%", 
    height:  250 / 500 * width  
  },
  gifPerdedor: {
    width: "100%",
    height: 735 / 1024 * width
  }
})

