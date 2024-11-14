import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backgroundLightGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: '#D2F0A0',
        zIndex: -1
    },
    backgroundWithImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    containerBasicCentered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBackgroundWhite: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerHeader: {
        padding: 20,
        backgroundColor: '#BCE0FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerMenuItems: {
        flex: 1,
        marginTop: 30
    },
    containerSafeArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modalFullScreen: {
        flex: 1,
        minWidth: "100%",
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    textContainerHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textIndexHeader: {
        fontFamily: 'ShadowsIntoLight-Regular',
        fontSize: 60,
    },
    textIndexMenuItems: {
        fontSize: 30
    },
    textStoryEnd: {
        fontFamily: 'ShadowsIntoLight-Regular',
        fontSize: 20
    },

});
