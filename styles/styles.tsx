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
        zIndex: -1,
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
        backgroundColor: 'white',
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
        marginTop: 30,
    },
    containerSafeArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerOurStory: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    containerNewStoryButtonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 9,
    },
    containerCustomHeader: {
        padding: 20,
        backgroundColor: '#BCE0FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerCustomHeaderNoBack: {
        padding: 20,
        backgroundColor: '#BCE0FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    containerCameraView: {
        flex: 1,
        minWidth: "100%",
    },
    containerCameraNamePic: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerCameraNamePicInner: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },

    modalFullScreen: {
        flex: 1,
        minWidth: "100%",
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    textContainerHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textIndexHeader: {
        fontFamily: 'ShadowsIntoLight-Regular',
        fontSize: 60,
        marginTop: 20,
    },
    textIndexMenuItems: {
        fontSize: 30,
    },
    textStoryEnd: {
        fontFamily: 'ShadowsIntoLight-Regular',
        color: '#D2F0A0',
        fontSize: 30,
    },
    textStoryHeader: {
        fontFamily: 'ShadowsIntoLight-Regular',
        color: '#D2F0A0',
        fontSize: 50,
    },
    textStoryContent: {
        color: '#D2F0A0',
        fontSize: 20,
    },
    textFlatListStories: {
        fontSize: 15,
        marginTop: 5,
    },
    textNewStoryButtons: {
        fontSize: 18,
        color: '#BCE0FD',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        height: 100,
        width: '60%',
        fontSize: 18,
        color: '#BCE0FD',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    textInputCameraNamePic: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    textFadedGuiding: {
        color: 'rgba(188, 224, 253, 0.9)',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    textCustomHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    textCameraNamePic: {
        fontSize: 18,
        marginBottom: 10,
    },

    iconMargin: {
        marginLeft: 3,
        color: '#BCE0FD',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0.4, height: 0.4 },
        textShadowRadius: 1,
    },


});
