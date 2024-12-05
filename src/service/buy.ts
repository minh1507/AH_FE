import axios from 'axios';

export class BuyService{
    static create = async (data: any) => {
        try {
            const response = await axios.post('https://anhoangstore.xyz/be/buy', data);
            return response.data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
              } else {
                console.log('Unexpected Error:', error);
              }
        }
    }
}