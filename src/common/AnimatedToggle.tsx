import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        height: 345,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2
    },
    image: {
        marginTop: 10,
        height: 280,
        width: '92%'
    },
    photoDescriptionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderRadius: 160,
        opacity: 0
    },
    text: {
        textAlign: 'center',
        fontSize: 13,
        backgroundColor: colors.transparent,
        color: colors.textPrimary
    },
    textPhotographer: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 0
    }
})


class AnimatedToggle extends React.Component {
    private lastPress: number;
    private largeAnimatedIcon: any;
    private smallAnimatedIcon: any;

    constructor(props: any) {
        super(props)

        this.state = {
            liked: false
        }

        this.lastPress = 0
    }

    handleLargeAnimatedIconRef = (ref: any) => {
        this.largeAnimatedIcon = ref
    }

    handleSmallAnimatedIconRef = (ref: any) => {
        this.smallAnimatedIcon = ref
    }

    animateIcon = () => {
        // @ts-ignore
        const {liked} = this.state
        this.largeAnimatedIcon.stopAnimation()

        if (liked) {
            this.largeAnimatedIcon.bounceIn()
                .then(() => this.largeAnimatedIcon.bounceOut())
            this.smallAnimatedIcon.pulse(200)

        } else {
            this.largeAnimatedIcon.bounceIn()
                .then(() => {
                    this.largeAnimatedIcon.bounceOut()
                    this.smallAnimatedIcon.bounceIn()
                })
                .then(() => {
                    if (!liked) {
                        // @ts-ignore
                        this.setState(prevState => ({liked: !prevState.liked}))
                    }
                })
        }
    }

    handleOnPress = () => {
        const time = new Date().getTime()
        const delta = time - this.lastPress
        const doublePressDelay = 400

        if (delta < doublePressDelay) {
            this.animateIcon()
        }
        this.lastPress = time
    }

    handleOnPressLike = () => {
        this.smallAnimatedIcon.bounceIn()
        // @ts-ignore
        this.setState(prevState => ({liked: !prevState.liked}))
    }

    render() {
        // @ts-ignore
        const {liked} = this.state

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.card}
                    onPress={this.handleOnPress}
                >

                    <View style={styles.photoDescriptionContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.handleOnPressLike}
                        >

                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AnimatedToggle