import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";

export default function TermosUso() {
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ScrollView >
                <Text style={[styles.textoTítulo, { marginTop: 15, }]}>
                    POLÍTICA DE PRIVACIDADE
                </Text>
                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 1 – Informações gerais
                </Text>
                <Text style={styles.texto}>
                    A presente Política de Privacidade contém informações sobre coleta, uso, armazenamento, tratamento e proteção dos dados pessoais dos usuários do aplicativo AconseLhEI, com a finalidade de demonstrar absoluta transparência quanto ao assunto e esclarecer a todos interessados sobre os tipos de dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas informações pessoais.
                </Text>
                <Text style={styles.texto}>
                    Esta Política de Privacidade aplica-se a todos os usuários do aplicativo e integra os Termos e Condições Gerais de Uso do aplicativo AconseLhEI.
                </Text>
                <Text style={styles.texto}>
                    O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18), o Marco Civil da Internet (Lei 12.965/14) e o Regulamento da UE (n. 2016/6790). Ainda, o documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 2 – Como coletamos os dados pessoais do usuário?
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais dos usuários são recolhidos pela plataforma da seguinte forma:
                </Text>
                <Text style={styles.texto}>
                    Quando o usuário cria uma conta/perfil na plataforma AconseLhEI como beneficiário, esses dados são os dados de identificação básicos para a realização do cadastro, como: nome completo, e-mail e data de nascimento. A partir deles, podemos identificar o usuário como beneficiado, garantindo uma maior segurança e bem-estar às suas necessidades.
                </Text>
                <Text style={styles.texto}>
                    Quando o usuário cria uma conta/perfil na plataforma AconseLhEI como advogado, esses dados são os dados de identificação básicos para a realização do cadastro, como: nome completo e e-mail. Além dos dados básicos, por serem advogados precisarão fornecer informações específicas, como: número de OAB, instituição que se formou, áreas de atuação e dias disponíveis para consultorias. A partir deles, podemos identificar o usuário como advogado, garantindo uma maior segurança e bem-estar às suas necessidades.
                </Text>
                <Text style={styles.texto}>
                    É importante ressaltar que o perfil dos usuários na plataforma não estará acessível a todos os demais usuários.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 3 – Quais dados pessoais coletamos sobre o usuário?
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais do usuário coletados são os seguintes:
                </Text>
                <Text style={styles.texto}>
                    • Dados para a criação da conta/perfil na plataforma AconseLhEI: e-mail, nome completo, data de nascimento e, caso seja um advogado, número de OAB, instituição que se formou, aréas de atuação e dias disponíveis para consultórias serão adicionadas.
                </Text>
                <Text style={styles.texto}>
                    • Dados para otimização da navegação: acesso a páginas, palavras-chave utilizadas na busca, recomendações,  interação com outros advogado e beneficiario, endereço de IP).
                </Text>
                <Text style={styles.texto}>
                    • Dados para concretizar transações: dados referentes ao pagamento e transações, tais como, número do cartão de crédito e outras informações sobre o cartão, além dos pagamentos efetuados.
                </Text>
                <Text style={[styles.texto, { marginTop: -20 }]}>
                    • Dados sensíveis: a plataforma poderá coletar os seguintes dados sensíveis do usuário: origem étnica ou racial, opinião política, convicção religiosa, dados genéticos, dados relativos à saúde, isso caso o próprio usuário forneça essas informações para o advogado.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 4 – Para que finalidades utilizamos os dados pessoais dos usuários?
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais dos usuários coletados e armazenados pela plataforma AconseLhEI tem por finalidade:
                </Text>
                <Text style={styles.texto}>
                    • Bem-estar dos usuários: aprimorar o produto e/ou serviço oferecido, facilitar, agilizar e cumprir os compromissos estabelecidos entre o usuário e a empresa, melhorar a experiência dos usuários e fornecer funcionalidades específicas a depender das características básicas dos usuários.
                </Text>
                <Text style={styles.texto}>
                    • Melhorias da plataforma: compreender como os usuários utilizam os serviços da plataforma, para ajudar no desenvolvimento de negócios e técnicas.
                </Text>
                <Text style={styles.texto}>
                    • Previsão do perfil dos usuários: tratamento automatizados de dados pessoais para avaliar o uso na plataforma.
                </Text>
                <Text style={styles.texto}>
                    • Dados de cadastro: para permitir o acesso dos usuários a determinados conteúdos da plataforma, exclusivo para usuários cadastrados
                </Text>
                <Text style={styles.texto}>
                    O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia aos usuários, de modo que os direitos e obrigações aqui previstos permanecem aplicáveis.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 5 – Por quanto tempo os dados pessoais ficam armazenados?
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais dos usuários são armazenados pela plataforma durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.
                </Text>
                <Text style={styles.texto}>
                    Os dados podem ser removidos ou anonimizados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento.
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais dos usuários só podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:
                </Text>
                <Text style={styles.texto}>
                    I - cumprimento de obrigação legal ou regulatória pelo controlador;
                </Text>
                <Text style={styles.texto}>
                    II - estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;
                </Text>
                <Text style={styles.texto}>
                    III - uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 6 – Segurança dos dados pessoais armazenados
                </Text>
                <Text style={styles.texto}>
                    A plataforma se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.
                </Text>
                <Text style={styles.texto}>
                    Os dados relativos a cartões de crédito são criptografados usando a tecnologia secure socket layer (SSL) que garante a transmissão de dados de forma segura e confidencial, de modo que a transmissão dos dados entre o servidor e o usuário ocorre de maneira cifrada e encriptada.
                </Text>
                <Text style={styles.texto}>
                    A plataforma não se exime de responsabilidade por culpa exclusiva de terceiros, como em caso de ataque de hackers ou crackers, ou culpa exclusiva dos usuários, como no caso em que ele mesmo transfere seus dados a terceiros. O aplicativo se compromete a comunicar os usuários em caso de alguma violação de segurança dos seus dados pessoais.
                </Text>
                <Text style={styles.texto}>
                    Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 7 – Compartilhamento dos dados
                </Text>
                <Text style={styles.texto}>
                    Os dados do perfil dos usuários não são compartilhados. Além disso, dentro da plataforma os usuários poderão modificar seu perfil.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', marginTop: -20 }]}>
                    Seção 8 – Os dados pessoais armazenados serão transferidos a terceiros?
                </Text>
                <Text style={styles.texto}>
                    Os dados do perfil dos usuários não são compartilhados. O único que tem acesso ao nome e a dúvida do beneficiado é o advogado, quando uma consultoria é marcada.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 9 – Dados de navegação
                </Text>
                <Text style={styles.texto}>
                    Os usuários da plataforma AconseLhEI manifesta conhecer e aceitar que pode ser utilizado um sistema de coleta de dados de navegação.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 10 – Consentimento
                </Text>
                <Text style={styles.texto}>
                    Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade.
                </Text>
                <Text style={styles.texto}>
                    Os usuários ao se cadastrarem, manifestam conhecer e exercitar seus direitos de cancelar seu cadastro, acessar e atualizar seus dados pessoais e garante a veracidade das informações por ele disponibilizadas.
                </Text>
                <Text style={styles.texto}>
                    O usuário tem direito de retirar o seu consentimento a qualquer tempo, para tanto deve entrar em contato por meio do e-mail {''}<Text style={{ textDecorationLine: 'underline' }}>aaconselhei@gmail.com</Text>.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    Seção 11 – Alterações para essa política de privacidade
                </Text>
                <Text style={styles.texto}>
                    Reservamos o direito de modificar essa Política de Privacidade a qualquer momento, então, é recomendável que os usuários revisem-a com frequência.
                </Text>
                <Text style={styles.texto}>
                    As alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação na plataforma. Quando realizadas alterações os usuários serão notificados. Ao utilizar o serviço ou fornecer informações pessoais após eventuais modificações, os usuários poderão demonstrar sua concordância ou discordância com as novas normas.
                </Text>
                <Text style={styles.texto}>
                    Diante da fusão ou venda da plataforma à outra empresa os dados dos usuários podem ser transferidos para os novos proprietários para que a permanência dos serviços oferecidos.
                </Text>

                <Text style={[styles.textoTítulo, { marginTop: 15, }]}>
                    TERMOS E CONDIÇÕES GERAIS DE USO DO APLICATIVO ACONSELHEI
                </Text>
                <Text style={styles.texto}>
                    Os serviços do AconseLhEI são fornecidos pela pessoa jurídica com a seguinte Razão Social: Consultoria Jurídica ME, com nome fantasia AconseLhEI, titulares da propriedade intelectual sobre o aplicativo, conteúdos e demais ativos relacionados à plataforma.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    1. Do objeto
                </Text>
                <Text style={styles.texto}>
                    O propósito principal da plataforma é licenciar o uso do aplicativo e seus ativos de propriedade intelectual, visando fornecer ferramentas que auxiliem e otimizem as atividades diárias dos usuários. Além disso, a plataforma oferece um serviço de consultoria jurídica gratuita, no qual advogados voluntários orientam aqueles que necessitam de assistência legal, mas não sabem como proceder.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    2. Da aceitação
                </Text>
                <Text style={styles.texto}>
                    O presente Termo estabelece obrigações voluntários, entre a plataforma e os usuários, sejam eles pessoas físicas ou jurídicas, ao utilizar o aplicativo. Concordando e comprometem-se a seguir integralmente essas regras, sujeitos a penalidades se não as cumprirem. A aceitação deste Termo é essencial para acessar e usar os serviços oferecidos pela empresa, em caso de discordância com as condições deste documento, o aplicativo não deve ser utilizado.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    3. Do acesso dos usuários
                </Text>
                <Text style={styles.texto}>
                    Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma poderá ser interrompida para qualquer ação necessária ao seu bom funcionamento.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    4. Do cadastro
                </Text>
                <Text style={styles.texto}>
                    O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio.
                </Text>
                <Text style={styles.texto}>
                    Ao se cadastrar os usuários deverão informar dados completos, recentes e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como os usuários se comprometem com a veracidade dos dados fornecidos.
                </Text>
                <Text style={styles.texto}>
                    Os usuários se comprometerão a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.
                </Text>
                <Text style={styles.texto}>
                    Menores de 18 anos não possuem permissão para utilização da plataforma, porém o aplicativo não se responsabiliza pela falsificação de idade e o eventual acesso por menores de idade.
                </Text>
                <Text style={styles.texto}>
                    Mediante a realização do cadastro os usuários declararão e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços.
                </Text>
                <Text style={styles.texto}>
                    Os usuários deverão fornecer um endereço de e-mail válido, através do qual o aplicativo realizará todas comunicações necessárias.
                </Text>
                <Text style={styles.texto}>
                    Após a confirmação do cadastro, os usuários possuirão um login e uma senha pessoal, a qual assegura o acesso individual à mesma. Desta forma, compete aos usuários exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais.
                </Text>
                <Text style={styles.texto}>
                    Toda e qualquer atividade realizada com o uso da senha será de responsabilidade dos usuários, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.
                </Text>
                <Text style={styles.texto}>
                    Toda e qualquer atividade realizada com o uso da senha será de responsabilidade dos usuários, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.
                </Text>
                <Text style={styles.texto}>
                    Caberá aos usuários assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços.
                </Text>
                <Text style={styles.texto}>
                    Os usuários poderão, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao aplicativo. O seu descadastramento será realizado o mais rapidamente possível.
                </Text>
                <Text style={styles.texto}>
                    Ao aceitar os Termos e Política de Privacidade, autorizam expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços e quaisquer plataformas, incluindo todas as informações preenchidas pelos usuários no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelos usuários.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    5. Dos preços
                </Text>
                <Text style={styles.texto}>
                    A plataforma se reserva no direito de reajustar unilateralmente, a qualquer tempo, os valores das assinaturas sem consulta ou anuência prévia do usuário.
                </Text>
                <Text style={styles.texto}>
                    Os valores aplicados são aqueles que estão em vigor no momento do pedido.
                </Text>
                <Text style={styles.texto}>
                    Na contratação de determinado serviço, a plataforma poderá solicitar as informações financeiras do usuário, como CPF, endereço de cobrança e dados de cartões. Ao inserir referidos dados o usuário concorda que sejam cobrados, de acordo com a forma de pagamento que venha a ser escolhida, os preços então vigentes e informados quando da contratação. Referidos dados financeiros poderão ser armazenadas para facilitar acessos e contratações futuras.
                </Text>
                <Text style={styles.texto}>
                    A assinatura será renovada automaticamente pela plataforma, independentemente de comunicação ao usuário, mediante cobrança periódica da mesma forma de pagamento indicada pelo usuário.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    6. Do cancelamento
                </Text>
                <Text style={styles.texto}>
                    Os usuários poderão cancelar a assinatura a qualquer momento, visto que é apenas uma forma de obter mais consultas por mês, tendo duas consultorias a mais.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    7. Do suporte
                </Text>
                <Text style={styles.texto}>
                    Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, os usuários poderão entrar em contato com o suporte, através do e-mail {''}<Text style={{ textDecorationLine: 'underline' }}>aaconselhei@gmail.com</Text>.
                </Text>
                <Text style={styles.texto}>
                    Estes serviços de atendimento aos usuários estarão disponíveis nos seguintes dias e horários: segunda à sexta, das 8h ás 18h, não funcionando em feriados.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    8. Das responsabilidades
                </Text>
                <Text style={styles.texto}>
                    É de responsabilidade dos usuários:
                </Text>
                <Text style={styles.texto}>
                    a)	defeitos ou vícios técnicos originados no próprio sistema dos usuários;
                </Text>
                <Text style={styles.texto}>
                    b)	a correta utilização da plataforma, dos serviços oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;
                </Text>
                <Text style={styles.texto}>
                    c)	pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;
                </Text>
                <Text style={styles.texto}>
                    d)	pela proteção aos dados de acesso à sua conta/perfil (login e senha).
                </Text>
                <Text style={styles.texto}>
                    É de responsabilidade da plataforma AconseLhEI:
                </Text>
                <Text style={styles.texto}>
                    a)	indicar as características do serviço;
                </Text>
                <Text style={styles.texto}>
                    b)	os defeitos e vícios encontrados no serviço oferecido desde que lhe tenha dado causa;
                </Text>
                <Text style={styles.texto}>
                    c)	as informações que foram por ele divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;
                </Text>
                <Text style={styles.texto}>
                    d)	os conteúdos ou atividades ilícitas praticadas através da sua plataforma.
                </Text>
                <Text style={styles.texto}>
                    A plataforma não se responsabiliza por links externos contidos em seu sistema que possam lhe redirecionar à outros ambientes na sua rede. Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    9. Dos direitos autorais
                </Text>
                <Text style={styles.texto}>
                    O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciavel, para acessar e fazer uso da plataforma e dos serviços por ela disponibilizados.
                </Text>
                <Text style={styles.texto}>
                    A estrutura do aplicativo, as marcas, logotipos, nomes comerciais, layouts, e design de interface, imagens, ilustrações, conteúdos escritos, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual da razão social Consultoria Jurídica ME, observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº 9.609/98), estão devidamente reservados.
                </Text>
                <Text style={styles.texto}>
                    Este Termos de Uso não cede ou transfere aos usuários qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual aos usuários, exceto pela licença limitada ora concedida.
                </Text>
                <Text style={styles.texto}>
                    O uso da plataforma pelos usuários é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da razão social Consultoria Jurídica ME, puníveis nos termos da legislação aplicável.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    10. Das sanções
                </Text>
                <Text style={styles.texto}>
                    Sem prejuízo das demais medidas legais cabíveis, a razão social Consultoria Jurídica ME poderá, a qualquer momento, advertir, suspender ou cancelar a conta dos usuários:
                </Text>
                <Text style={styles.texto}>
                    a)	que violar qualquer dispositivo do presente Termo;
                </Text>
                <Text style={styles.texto}>
                    b)	que descumprir os seus deveres de usuário;
                </Text>
                <Text style={styles.texto}>
                    c)	que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    11. Da rescisão
                </Text>
                <Text style={styles.texto}>
                    A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da razão social Consultoria Jurídica ME e o bloqueio de todos os serviços prestados.
                </Text>

                <Text style={[styles.texto, { fontWeight: 'bold', }]}>
                    12. Das alterações
                </Text>
                <Text style={styles.texto}>
                    Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte do AconseLhEI, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo aplicativo e os usuários poderão optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços, caso seja assinante de algum serviço.
                </Text>
                <Text style={styles.texto}>
                    Os serviços oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso prévio, ser deixados de fornecer, alterados em suas características, bem como restringido para o uso ou acesso.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    textoTítulo: {
        fontSize: 20,
        textAlign: 'justify',
        marginBottom: 10,
        color: '#696969',
        fontWeight: 'bold',
    },
    texto: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 5,
        color: '#696969',
    }
})