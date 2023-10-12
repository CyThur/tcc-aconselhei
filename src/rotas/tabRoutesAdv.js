import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeAdv from '../telasAdv/HomeAdv';
import Agenda from '../telasAdv/AgendaAdv';
import Notificacoes from '../telasAdv/NotificacoesAdv';

const Tab = createBottomTabNavigator();

export default function TabRoutesAdv() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#1E5A97',
                borderTopWidth: 0,
                paddingBottom: 10,
                paddingTop: 10,
                height: 60
            }
        }}>
            <Tab.Screen
                name="HomeAdv"
                component={HomeAdv}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) =>{
                        if(focused){
                            return <Ionicons name="home" color={color} size={size} />
                        }
                        return <Ionicons name="home-outline" color={color} size={size} />
                    } 
                }}
            />

            <Tab.Screen
                name="Agenda"
                component={Agenda}
                options={{
                    tabBarLabel: 'Agenda',
                    tabBarIcon: ({ color, size, focused }) =>{
                        if(focused){
                            return <Ionicons name="calendar" color={color} size={size} />
                        }
                        return <Ionicons name="calendar-outline" color={color} size={size} />
                    } 
                }}
            />

            <Tab.Screen
                name="Notificacoes"
                component={Notificacoes}
                options={{
                    tabBarLabel: 'Notificações',
                    tabBarIcon: ({ color, size, focused }) =>{
                        if(focused){
                            return <Ionicons name="notifications" color={color} size={size} />
                        }
                        return <Ionicons name="notifications-outline" color={color} size={size} />
                    } 
                }}
            />
        </Tab.Navigator>
    );
}
