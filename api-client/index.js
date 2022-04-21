import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://invoices-api-proxy.test/api',
  headers: {
    'Accept': 'application/json',
  }
});


export function getTwilioUsage(queryParams = {}) {
  return apiClient.get('/twilio-invoice', {params: {...queryParams}})
}
