import {StatusBar} from 'expo-status-bar';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {StripeProvider, usePaymentSheet} from "@stripe/stripe-react-native";
import {apiUrl, merchantIdentifier, publishableKey, stripeAccountId} from "./environment";
import {useEffect} from "react";
import axios from "axios";

export default function App() {
    const {presentPaymentSheet, initPaymentSheet, loading} = usePaymentSheet()

    useEffect(() => {
        initialisePaymentSheet()
    }, []);


    const initialisePaymentSheet = async () => {
        const {customer, ephemeralKey, paymentIntent} = await fetchPaymentSheetParams()
        // @ts-ignore
        const {error} = await initPaymentSheet({
            allowsDelayedPaymentMethods: true,
            applePay: {merchantCountryCode: "CZ"},
            customFlow: true,
            customerEphemeralKeySecret: ephemeralKey,
            customerId: customer,
            defaultBillingDetails: {
                email: "email@gmail.com",
                phone: "420420420",
                name: "Martin Voda",
            },
            googlePay: {merchantCountryCode: "CZ", testEnv: true, currencyCode: "czk"},
            merchantDisplayName: "Cexbit s.r.o.",
            paymentIntentClientSecret: paymentIntent,
        })
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
            console.error(`Error code: ${error.code}`, error.message)
        } else {
            console.log("Success")
        }

    }

    const buy = async () => {
        console.log("Buy pressed!")
        const {error} = await presentPaymentSheet()
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
            console.error(`Error code: ${error.code}`, error.message)
        } else {
            Alert.alert("Success", "The payment was confirmed successfully")
            console.log("Success", "The payment was confirmed successfully")
        }
    }

    return (
        <StripeProvider publishableKey={publishableKey} merchantIdentifier={merchantIdentifier}
                        stripeAccountId={stripeAccountId}>
            <View style={styles.container}>
                <Text>RN Stripe Test!</Text>
                <Button title={"PAY"} onPress={buy} disabled={loading}/>
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

const fetchPaymentSheetParams = async (): Promise<{
    customer: string,
    ephemeralKey: string,
    paymentIntent: string
}> => {
    console.log("fetchPaymentSheetParams")
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    }
    const response = await axios({
        method: "GET", url: apiUrl, headers: {...headers}
    })
    return {
        customer: response.data.customer || "",
        ephemeralKey: response.data.ephemeralKey || "",
        paymentIntent: response.data.paymentIntent || ""
    }
}