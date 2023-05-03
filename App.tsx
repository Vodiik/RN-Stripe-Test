import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StripeProvider} from "@stripe/stripe-react-native";
import {merchantIdentifier, publishableKey, stripeAccountId} from "./environment";

export default function App() {
    return (
        <StripeProvider publishableKey={publishableKey} merchantIdentifier={merchantIdentifier}
                        stripeAccountId={stripeAccountId}>
            <View style={styles.container}>
                <Text>RN Stripe Test!</Text>
                <Button title={"PAY"} onPress={() => console.log("")}/>
                <StatusBar style="auto"/>
            </View>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
