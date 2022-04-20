import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://sandbox.tratta.io/api',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer tratta-test-run'
  }
});


export function getTwilioUsage(queryParams = {}) {
  return apiClient.get('/twilio-test-run', {params: {...queryParams}})
}
