import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeAdv from '../telasAdv/HomeAdv';
import Solicitacoes from '../telasAdv/Solicitacoes';
import Notificacoes from '../telasAdv/NotificacoesAdv';

const Tab = createBottomTabNavigator();

export default function TabRoutesAdv() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#D3D3D3',
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
                name="Solicitacoes"
                component={Solicitacoes}
                options={{
                    tabBarLabel: 'Solicitações',
                    tabBarIcon: ({ color, size, focused }) =>{
                        if(focused){
                            return <Ionicons name="warning" color={color} size={size} />
                        }
                        return <Ionicons name="warning-outline" color={color} size={size} />
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
