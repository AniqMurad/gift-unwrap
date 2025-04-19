import birthdayimages from '../assets/1pp.png';
import giftsforhimimages from '../assets/2pp.png';
import giftsforherimages from '../assets/flowers.png';

const products = {
    giftsForHer: [
        { id: 1, name: "Le Sigh Tee", price: 68, originalPrice: 98, discount: 25, keyGift: "mum", image: giftsforherimages },
        { id: 2, name: "Elegant Earrings", price: 45, originalPrice: 60, discount: 25, keyGift: "sister", image: giftsforherimages },
        { id: 3, name: "Makeup Kit", price: 80, originalPrice: 100, discount: 20, keyGift: "girlfriend", image: giftsforherimages },
        { id: 4, name: "Perfume Set", price: 60, originalPrice: 85, discount: 30, keyGift: "daughter", image: giftsforherimages },
        { id: 5, name: "Handbag", price: 120, originalPrice: 150, discount: 20, keyGift: "wife", image: giftsforherimages },
        { id: 6, name: "Customized Necklace", price: 55, originalPrice: 75, discount: 27, keyGift: "friend", image: giftsforherimages },
        { id: 7, name: "Personalized Mug", price: 35, originalPrice: 50, discount: 30, keyGift: "mum", image: giftsforherimages },
        { id: 8, name: "Mum's Perfume", price: 80, originalPrice: 100, discount: 20, keyGift: "sister", image: giftsforherimages },
        { id: 9, name: "Customized Jewelry Box", price: 50, originalPrice: 70, discount: 28, keyGift: "girlfriend", image: giftsforherimages },
        { id: 10, name: "Sister's Bracelet", price: 40, originalPrice: 55, discount: 27, keyGift: "daughter", image: giftsforherimages },
        { id: 11, name: "Girlfriend's Perfume", price: 90, originalPrice: 120, discount: 25, keyGift: "wife", image: giftsforherimages },
        { id: 12, name: "Sister's Handbag", price: 70, originalPrice: 100, discount: 30, keyGift: "friend", image: giftsforherimages },
        { id: 13, name: "Girlfriend's Makeup Kit", price: 45, originalPrice: 65, discount: 30, keyGift: "girlfriend", image: giftsforherimages },
    ],
    giftsForHim: [
        { id: 1, name: "Classic Wallet", price: 50, originalPrice: 70, discount: 28, subcategory: "Accessories", image: giftsforhimimages },
        { id: 2, name: "Leather Belt", price: 40, originalPrice: 55, discount: 27, subcategory: "Accessories", image: giftsforhimimages },
        { id: 3, name: "Shaving Kit", price: 45, originalPrice: 65, discount: 30, subcategory: "Personal Care", image: giftsforhimimages },
        { id: 4, name: "T-Shirt Pack", price: 70, originalPrice: 100, discount: 30, subcategory: "Apparels", image: giftsforhimimages },
        { id: 5, name: "Cologne Set", price: 90, originalPrice: 120, discount: 25, subcategory: "Personal Care", image: giftsforhimimages },
        { id: 6, name: "Personalized Keychain", price: 30, originalPrice: 50, discount: 40, subcategory: "Customized Gift", image: giftsforhimimages },
    ],
    birthday: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, subcategory: "Accessories", image: birthdayimages },
    ],
    Chocolates: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, subcategory: "Accessories", image: birthdayimages },
    ]
};

export default products;
