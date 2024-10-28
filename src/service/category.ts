import axios from 'axios';

export class CategoryService{
    static findAll = async () => {
        try {
            const response = await axios.get('https://anhoangstore.xyz/be/category', {
                params: {
                    limit: 500,
                    offset: 0
                }
            });
            return response.data.data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
              } else {
                console.log('Unexpected Error:', error);
              }
        }
    }
}