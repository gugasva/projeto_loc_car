import {StyleSheet} from 'react-native';

const css = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    textPage:{
        backgroundColor:'red',
        padding: 20
    },
    darkbg:{
      backgroundColor: '#333'
    },
    login_msg:(text='none')=>({
        fontWeight:'bold',
        fontSize: 22,
        color:'red',
        marginTop: 10,
        marginBottom: 50,
        display: text
    }),
    login_form:{
        width: "80%"
    },
    login_input:{
        backgroundColor: "#ffff",
        fontSize: 19,
        padding: 7,
        marginBottom: 20,
        justifyContent: "space-around"
    },
    login_button:{
        padding: 10,
        backgroundColor:"#fff",
        color: '#000',
        alignSelf:"center",
        borderRadius: 5,
        margin: 5
    },
    cadastro_tela:{
        backgroundColor: '#000',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    },
    text_pattern:{
        color: '#fff',
        fontSize: 20,
        fontStyle: 'italic',
    },
    area_tab:{
        backgroundColor: '#333',
        fontSize: 20,
        color:'#333'
    },
    logout_button:{
        textAlign:'space-around'
    },
    area_title:{
        flexDirection: 'row',
        paddingTop: 70,
        paddingBottom: 10,
        width: '100%',
        backgroundColor:'#111',
        justifyContent: 'center',
        textAlign: 'center'
    },
    title:{
        width:'80%',
        justifyContent: 'center',
        fontSize: 20,
        color:'#fff',
        textAlign: 'center'
    },
    containers: {
        flex: 1,
        padding: 10,
    },
      titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
      imagem: {
        width: 200,
        height: 100,
        marginRight: 10,
    },
      detalhesContainer: {
        flex: 1,
    },
      modelo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
      ano: {
        fontSize: 16,
        color: '#888',
    },
      preco: {
        fontSize: 16,
        marginTop: 5,
    },
    logoContainer: {
      marginBottom: 20,
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    errorMsg: {
      color: 'red',
      marginBottom: 10,
    },
    formContainer: {
      width: '80%',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff'
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    button: {
      width: '80%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8B0000', // Cor do botão azul
      borderRadius: 5,
      alignSelf: 'center',
      marginBottom: 10
    },
    buttonText: {
      color: '#fff', // Cor do texto branco
      fontSize: 16,
    },
    calcular: {
      padding: 20,
      backgroundColor: '#28a745',
      borderRadius: 5,
      
    }
    
  });
  export {css};