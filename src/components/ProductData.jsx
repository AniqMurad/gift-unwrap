import box1 from '../assets/box1.jpg';
import box2 from '../assets/box2.jpg';
import box3 from '../assets/box3.jpg';
import box4 from '../assets/box4.jpg';


const products = {
    giftsForHer: [
        {
            id: 1, name: "Le Sigh Tee", price: 68, originalPrice: 98, discount: 25, keyGift: "mum", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.

                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Elegant Earrings", price: 45, originalPrice: 60, discount: 25, keyGift: "sister", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Makeup Kit", price: 80, originalPrice: 100, discount: 20, keyGift: "girlfriend", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Perfume Set", price: 60, originalPrice: 85, discount: 30, keyGift: "daughter", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Handbag", price: 120, originalPrice: 150, discount: 20, keyGift: "wife", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "Customized Necklace", price: 55, originalPrice: 75, discount: 27, keyGift: "friend", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 7, name: "Personalized Mug", price: 35, originalPrice: 50, discount: 30, keyGift: "mum", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 8, name: "Mum's Perfume", price: 80, originalPrice: 100, discount: 20, keyGift: "sister", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 9, name: "Customized Jewelry Box", price: 50, originalPrice: 70, discount: 28, keyGift: "girlfriend", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 10, name: "Sister's Bracelet", price: 40, originalPrice: 55, discount: 27, keyGift: "daughter", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 11, name: "Girlfriend's Perfume", price: 90, originalPrice: 120, discount: 25, keyGift: "wife", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 12, name: "Sister's Handbag", price: 70, originalPrice: 100, discount: 30, keyGift: "friend", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 13, name: "Girlfriend's Makeup Kit", price: 45, originalPrice: 65, discount: 30, keyGift: "girlfriend", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForHim: [
        {
            id: 1, name: "Classic Wallet", price: 50, originalPrice: 70, discount: 28, keyGift: "pop", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Leather Belt", price: 40, originalPrice: 55, discount: 27, keyGift: "brother", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Shaving Kit", price: 45, originalPrice: 65, discount: 30, keyGift: "boyfriend", subcategory: "Personal Care", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "T-Shirt Pack", price: 70, originalPrice: 100, discount: 30, keyGift: "son", subcategory: "Apparels", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Cologne Set", price: 90, originalPrice: 120, discount: 25, keyGift: "husband", subcategory: "Personal Care", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "Personalized Keychain", price: 30, originalPrice: 50, keyGift: "friend", discount: 40, subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    birthday: [
        {
            id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "her birthday", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "his birthday", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "baby birthday", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "employee birthday", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "employee birthday", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "her birthday", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForBabies: [
        {
            id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "newborn", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "newborn", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "newborn", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForEveryone: [
        {
            id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "couple", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "relative", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "relative", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "couple", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "relative", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "teacher", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForReligions: [
        {
            id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "eid", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "eid", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "diwali", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "navroz", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "navroz", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "holi", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForCompany: [
        {
            id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "farewell", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "newhire", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "ocassion", subcategory: "Gift Box", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "achievement", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "workanniversary", subcategory: "Customized Gift", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "achievement", subcategory: "Accessories", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
    giftsForWedding: [
        {
            id: 1, name: "Shadi krlo", price: 68, originalPrice: 98, discount: 25, keyGift: "bride", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 2, name: "Shadi hogai", price: 45, originalPrice: 60, discount: 25, keyGift: "groom", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 3, name: "shadi ke baad", price: 80, originalPrice: 100, discount: 20, keyGift: "bridalparty", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 4, name: "shadi ke bache", price: 60, originalPrice: 85, discount: 30, keyGift: "groom", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 5, name: "bacho ki shadi", price: 120, originalPrice: 150, discount: 20, keyGift: "bride", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 6, name: "shadi mai bache", price: 55, originalPrice: 75, discount: 27, keyGift: "groom", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 7, name: "bacho ke lie shadi", price: 35, originalPrice: 50, discount: 30, keyGift: "weddinganniversary", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
        {
            id: 8, name: "shadi bhencho", price: 80, originalPrice: 100, discount: 20, keyGift: "bride", images: [box1, box2, box3, box4], ShortDescription: "A stylish and soft t-shirt perfect for everyday casual wear.", LongDescription:
                `This premium gift is crafted with attention to detail and made from high-quality materials. 
                    Perfect for any occasion, it comes in elegant packaging ready to gift. 
                    The Birthday Mug is designed to last and bring joy for years to come.
                    
                    Features:
                    • High-quality materials
                    • Beautiful design
                    • Durable construction
                    • Perfect gift for any occasion` },
    ],
};

export default products;
