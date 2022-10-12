import { PaymentFormContainer, FormContainer, PaymentButton} from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ButtonTypes } from "../button/button.component";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useState } from "react";

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const { user }  = useAppSelector(selectUser);
  const { cartTotal }  = useAppSelector(selectCartTotal);
  const stripe = useStripe(); //stripe instance
  const elements = useElements();

  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("PAYMENT");

    if(!stripe || !elements || !user) return; //check is stripe handler are present
    
    const stripeCard = elements.getElement(CardElement);
    if(!stripeCard) return;
    console.log("STRIPE CARD", stripeCard);

    setIsProcessingPayment(true);

    //send the request to our back end (serverless function) to create payment intent
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: cartTotal * 100 })
    }).then( res => res.json());

    //token returned by stripe that we need to submit a payment against this intent
    const clientSecret = response.paymentIntent.client_secret;

    //send the actual payment
    const paymentResult = await stripe.confirmCardPayment(clientSecret,{
      payment_method: {
        card: stripeCard,
        billing_details: {
          name: user ? user.displayName : "Guest"
        }
      }
    })

    setIsProcessingPayment(false);

    if(paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if(paymentResult.paymentIntent.status === "succeeded") {
        alert("payment sucessful");
      }
    }

  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement/>
        <PaymentButton buttonType={ButtonTypes.Inverted} isLoading={isProcessingPayment}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;
