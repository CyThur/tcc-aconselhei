import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import StackRoutes from './stackRoutes';

export default function Routes(){
    return(
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>
    );
}