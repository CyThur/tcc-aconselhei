import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Inicio from '../telasComuns/Inicio';
import EsqueSenha from '../telasComuns/EsqueSenha';

import LoginAdv from '../telasAdv/LoginAdv';
import CadastroAdv from '../telasAdv/CadastroAdv';

import TabRoutesUsu from './tabRoutesUsu';
import PerfilAdv from '../telasAdv/telasHome/PerfilAdv';
import ConsulAgen from '../telasAdv/telasHome/ConsulAgen';
import HistoricoAdv from '../telasAdv/telasHome/HistoricoAdv';

import SolicitaTextoUsu from '../telasAdv/telasSoliciTexto/SolicitaTextoUsu';

import LoginUsu from '../telasUsu/LoginUsu';
import CadastroUsu from '../telasUsu/CadastroUsu';

import TabRoutesAdv from './tabRoutesAdv';
import PerfilUsu from '../telasUsu/telasHomeUsu/PerfilUsu';
import AgendarConsul from '../telasUsu/telasHomeUsu/AgendarConsul';
import Profissional from '../telasUsu/telasHomeUsu/telasAgendar/Profissional';
import PerfilAdvEsco from '../telasUsu/telasHomeUsu/telasAgendar/PerfilAdvEsco';

import EscreDuvida from '../telasUsu/telasHomeUsu/telasAgendar/EscreDuvida';

import HistoricoUsu from '../telasUsu/telasHomeUsu/HistoricoUsu';
import Planos from '../telasUsu/telasHomeUsu/Planos';
import TemPlano from '../telasUsu/telasHomeUsu/TemPlano';
import CancelarPlano from '../telasUsu/telasHomeUsu/CancelarPlano';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="EsqueSenha" component={EsqueSenha} />

            <Stack.Screen name="LoginAdv" component={LoginAdv} />
            <Stack.Screen name="CadastroAdv" component={CadastroAdv} />

            <Stack.Screen name="TabRoutesAdv" component={TabRoutesAdv} />
            <Stack.Screen name="PerfilAdv" component={PerfilAdv} />
            <Stack.Screen name="ConsulAgen" component={ConsulAgen} />
            <Stack.Screen name="HistoricoAdv" component={HistoricoAdv} />

            <Stack.Screen name="SolicitaTextoUsu" component={SolicitaTextoUsu} />
            
            <Stack.Screen name="LoginUsu" component={LoginUsu} />
            <Stack.Screen name="CadastroUsu" component={CadastroUsu} />
           
            <Stack.Screen name="TabRoutesUsu" component={TabRoutesUsu} />
            <Stack.Screen name="PerfilUsu" component={PerfilUsu} />
            <Stack.Screen name="AgendarConsul" component={AgendarConsul} />
            <Stack.Screen name="Profissional" component={Profissional} />
            <Stack.Screen name="PerfilAdvEsco" component={PerfilAdvEsco} />

            <Stack.Screen name="EscreDuvida" component={EscreDuvida} />
            
            <Stack.Screen name="HistoricoUsu" component={HistoricoUsu} />
            <Stack.Screen name="Planos" component={Planos} />
            <Stack.Screen name="TemPlano" component={TemPlano}/>
            <Stack.Screen name="CancelarPlano" component={CancelarPlano}/>
        </Stack.Navigator>

    );
}