import react from "react";
import { StyleSheet, Image, Dimensions, Text, View } from "react-native";

import topo from '../../assets/veinha.png';

const width = Dimensions.get('screen').width;

export default function Jogo() {
    return <>

    <View style={estilos.topo}>
        <Text style={estilos.titulo}>Jogo da Velha</Text>
        <Image source={topo} style={estilos.imagemTopo} />
    </View>

    </>
}

const estilos = StyleSheet.create({
    topo: {
        flexDirection: "row",
        paddingVertical: 12,
        justifyContent: "center",
    },
    imagemTopo: {
        width: 200,
        height: 200,
    },
    titulo:{
        fontSize: 20,
        lineHeight: 26,
        color: "black",
        fontWeight: "bold",
        padding: 16,
    }
})