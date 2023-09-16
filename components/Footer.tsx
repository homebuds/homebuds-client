import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../icons/home.svg'
import BroomIcon from '../icons/broom.svg'
import MoneyIcon from '../icons/money.svg'

interface ICustomerChoresTab {
    user: string;
}

const Footer: React.FC<BottomTabBarProps> = (props) => {
    const { state, navigation } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: "100%", padding: 10, paddingLeft: 50, paddingRight: 50 }}>
            {/* Render the default tab bar */}
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', flex: 1, width: "100%" }}>
                {props.state.routes.map((route, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate(route.name)}
                        style={{
                            margin: "auto", flexGrow: 1, borderBottomWidth: state.index === index ? 5 : 0, borderColor: "black", padding: 10,
                            paddingLeft: 25,
                            paddingRight: 25,
                            display: "flex", alignItems: 'flex-end', alignContent: "center",
                        }}
                    >
                        {route.name === "Home" ?
                            <HomeIcon /> :
                            route.name === "Chores" ?
                                <BroomIcon /> :
                                route.name === "Bills" ?
                                    <MoneyIcon /> : <></>}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default Footer;