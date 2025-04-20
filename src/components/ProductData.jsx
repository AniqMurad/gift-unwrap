import birthdayimages from '../assets/1pp.png';
import giftsforhimimages from '../assets/2pp.png';
import giftsforherimages from '../assets/flowers.png';
import box1 from '../assets/box1.jpg';
import box2 from '../assets/box2.jpg';
import box3 from '../assets/box3.jpg';
import box4 from '../assets/box4.jpg';


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
        { id: 1, name: "Classic Wallet", price: 50, originalPrice: 70, discount: 28, keyGift: "pop", subcategory: "Accessories", image: box1 },
        { id: 2, name: "Leather Belt", price: 40, originalPrice: 55, discount: 27, keyGift: "brother", subcategory: "Accessories", image: box2 },
        { id: 3, name: "Shaving Kit", price: 45, originalPrice: 65, discount: 30, keyGift: "boyfriend", subcategory: "Personal Care", image: box3 },
        { id: 4, name: "T-Shirt Pack", price: 70, originalPrice: 100, discount: 30, keyGift: "son", subcategory: "Apparels", image: box4 },
        { id: 5, name: "Cologne Set", price: 90, originalPrice: 120, discount: 25, keyGift: "husband", subcategory: "Personal Care", image: box4 },
        { id: 6, name: "Personalized Keychain", price: 30, originalPrice: 50, keyGift: "friend", discount: 40, subcategory: "Customized Gift", image: box4 },
    ],
    birthday: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "her birthday", subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "his birthday", subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "baby birthday", subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "employee birthday", subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "employee birthday", subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "her birthday", subcategory: "Accessories", image: birthdayimages },
    ],
    giftsForBabies: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "newborn", subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "newborn", subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "newborn", subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, subcategory: "Accessories", image: birthdayimages },
    ],
    giftsForEveryone: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "couple", subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "relative", subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "relative", subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "couple", subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "relative", subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "teacher", subcategory: "Accessories", image: birthdayimages },
    ],
    giftsForReligions: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "eid", subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "eid", subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "diwali", subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "navroz", subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "navroz", subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "holi", subcategory: "Accessories", image: birthdayimages },
    ],
    giftsForCompany: [
        { id: 1, name: "Birthday Mug", price: 25, originalPrice: 35, discount: 29, keyGift: "farewell", subcategory: "Gift Box", image: birthdayimages },
        { id: 2, name: "Customized Frame", price: 55, originalPrice: 75, discount: 27, keyGift: "newhire", subcategory: "Customized Gift", image: birthdayimages },
        { id: 3, name: "Birthday Hamper", price: 85, originalPrice: 110, discount: 23, keyGift: "ocassion", subcategory: "Gift Box", image: birthdayimages },
        { id: 4, name: "Chocolate Box", price: 40, originalPrice: 60, discount: 33, keyGift: "achievement", subcategory: "Accessories", image: birthdayimages },
        { id: 5, name: "Photo Album", price: 70, originalPrice: 95, discount: 26, keyGift: "workanniversary", subcategory: "Customized Gift", image: birthdayimages },
        { id: 6, name: "LED Lamp", price: 50, originalPrice: 70, discount: 28, keyGift: "achievement", subcategory: "Accessories", image: birthdayimages },
    ],
    giftsForWedding: [
        { id: 1, name: "Shadi krlo", price: 68, originalPrice: 98, discount: 25, keyGift: "bride", image: giftsforherimages },
        { id: 2, name: "Shadi hogai", price: 45, originalPrice: 60, discount: 25, keyGift: "groom", image: giftsforherimages },
        { id: 3, name: "shadi ke baad", price: 80, originalPrice: 100, discount: 20, keyGift: "bridalparty", image: giftsforherimages },
        { id: 4, name: "shadi ke bache", price: 60, originalPrice: 85, discount: 30, keyGift: "groom", image: giftsforherimages },
        { id: 5, name: "bacho ki shadi", price: 120, originalPrice: 150, discount: 20, keyGift: "bride", image: giftsforherimages },
        { id: 6, name: "shadi mai bache", price: 55, originalPrice: 75, discount: 27, keyGift: "groom", image: giftsforherimages },
        { id: 7, name: "bacho ke lie shadi", price: 35, originalPrice: 50, discount: 30, keyGift: "weddinganniversary", image: giftsforherimages },
        { id: 8, name: "shadi bhencho", price: 80, originalPrice: 100, discount: 20, keyGift: "bride", image: giftsforherimages },
    ],
};

export default products;
