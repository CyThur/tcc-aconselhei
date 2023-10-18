import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeUsu from '../telasUsu/HomeUsu';
import Agenda from '../telasUsu/AgendaUsu';
import NotificacoesUsu from '../telasUsu/TelasNotificacoesUsu/NotificacoesUsu';

const Tab = createBottomTabNavigator();

export default function TabRoutesUsu() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#191970',
            tabBarStyle: {
                backgroundColor: '#1E5A97',
                borderTopWidth: 0,
                paddingBottom: 10,
                paddingTop: 10,
                height: 60
            }
        }}>
            <Tab.Screen
                name="HomeUsu"
                component={HomeUsu}
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
                name="NotificacoesUsu"
                component={NotificacoesUsu}
                options={{
                    tabBarLabel: 'NotificaçõesUsu',
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
