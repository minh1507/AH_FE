import axios from 'axios';

export class ProductService{
    static findAll = async (category: number) => {
        try {
            const response = await axios.get('https://222.255.1.152:4600/be/product?categoryId=' + category);
            
            const products = response.data.data;
    
            const productsWithImages = await Promise.all(
                products.map(async (product:any) => {
                    try {
                        const imageResponse = await axios.get(`https://222.255.1.152:4600/be/file/${product.file.file}`);
                        return { ...product, imageURL: imageResponse.data.data }; 
                    } catch (imageError) {
                        console.log(`Error fetching image for file ${product.file.file}`, imageError);
                        return product; 
                    }
                })
            );
    
            return productsWithImages;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
              } else {
                console.log('Unexpected Error:', error);
              }
        }
    }
}