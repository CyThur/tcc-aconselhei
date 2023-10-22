import { StyleSheet } from 'react-native';

export const stylesP = StyleSheet.create({

    containerPerfilAdv: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPerfil: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContentPerfil: {
        backgroundColor: '#fff',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 8,
    },
    modalHeader: {
        height: 5,
        width: 40,
        backgroundColor: 'gray',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 20,
        marginBottom: 5,
    },
    panelSubtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#1E5A97',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    panelButtonTitle: {
        fontSize: 18,
        color: '#fff',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInputPerfil: {
        flex: 1,
        marginTop: -6,
        paddingLeft: 10,
        color: '#05375a'
    },
    profileTextPerfilAdv: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    namePerfilAdv: {
        fontSize: 20,
        marginRight: '10%',
        fontWeight: 'bold',
        color: '#1E5A97',
    },
    labelPerfilAdv: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    inputPerfilAdv: {
        width: 360,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingLeft: 10,
    },
    editableNameContainerPerfilAdv: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}); 