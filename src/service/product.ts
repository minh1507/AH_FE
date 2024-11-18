import axios from 'axios';

export class ProductService{
    static findAll = async (category: number) => {
        try {
            const response = await axios.get('https://anhoangstore.xyz/be/product?categoryId=' + category);
            
            const products = response.data.data;
    
            const productsWithImages = await Promise.all(
                products.map(async (product:any) => {
                    try {
                        const imageResponse = await axios.get(
                            `https://anhoangstore.xyz/be/file/${product.file.file}`,
                            {
                              responseType: 'blob',
                            }
                          );
                    
                        const imageUrl = URL.createObjectURL(imageResponse.data);

                        return { ...product, imageURL: imageUrl }; 
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

    static findOne = async (id: number) => {
        try {
            const response = await axios.get('https://anhoangstore.xyz/be/product/' + id);
            
            const product = response.data.data;

            const imageResponse = await axios.get(
                `https://anhoangstore.xyz/be/file/${product.file.file}`,
                {
                  responseType: 'blob',
                }
              );
        
            const imageUrl = URL.createObjectURL(imageResponse.data);
    
            return {...product, imageURL: imageUrl };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
              } else {
                console.log('Unexpected Error:', error);
              }
        }
    }
}