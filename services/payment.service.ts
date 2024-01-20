
import axios from "axios";
import { api } from "./api.config";
import { paymentapi } from "./payment.api.config";
const url = "https://preproduction-gateway.bizao.com/mobilemoney/v1"
const paymentService = {
 
  requestPaymentUrl,
  completePayment
};

const resource = "";

 
/**
 * requestPaymentUrl method
 *
 * @param {Object} payload
 * @returns
 */
function requestPaymentUrl(payload) {

  return paymentapi.postData(resource + "/paytech/generate", payload);

}


 
/**
 * completePayment method
 *
 * @param {Object} payload
 * @returns
 */
function completePayment(payload) {

  return paymentapi.getData(resource + "/paytech/complete?"+payload);

}


 



export default paymentService;
