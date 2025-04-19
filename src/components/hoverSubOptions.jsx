
const hoverSubOptions = {
    recipients: [
        {
            title: "FOR HIM",
            items: [
                { name: "Father", url: "/Giftforhim?category=pop" },
                { name: "Brother", url: "/Giftforhim?category=brother" },
                { name: "BoyFriend", url: "/Giftforhim?category=boyfriend" },
                { name: "Son", url: "/Giftforhim?category=son" },
                { name: "Husband", url: "/Giftforhim?category=husband" },
                { name: "Friend", url: "/Giftforhim?category=friend" }
            ],
            url: "/Giftforhim"
        },
        {
            title: "FOR HER",
            items: [
                { name: "Mother", url: "/Giftforher?category=mum" },
                { name: "Sister", url: "/Giftforher?category=sister" },
                { name: "GirlFriend", url: "/Giftforher?category=girlfriend" },
                { name: "Daughter", url: "/Giftforher?category=daughter" },
                { name: "Wife", url: "/Giftforher?category=wife" },
                { name: "Friend", url: "/Giftforher?category=friend" }
            ],
            url: "/Giftforher"
        },
        {
            title: "FOR BABIES",
            items: ["New Born", "Birthday"],
            url: "/Giftforbabies",
        },
        {
            title: "FOR COMPANIES",
            items: ["New Hire", "Occasions", "Farewell", "Achievements", "Birthday"],
            url: "/Giftforcompanies"
        },
        {
            title: "FOR EVERYONE",
            items: ["Couple", "Teacher", "Relatives"],
            url: "/Giftforeveryone"
        }
    ],
    occasions: [
        {
            title: "WEDDING",
            items: [
                { name: "For Bride", url: "/Giftforwedding" },
                { name: "For Groom", url: "/Giftforwedding" },
                { name: "Bridal Party Gifts", url: "/Giftforwedding" }
            ],
            url: "/Giftforwedding"
        },
        {
            title: "BIRTHDAY",
            items: [
                { name: "For Him", url: "/Giftforhim" },
                { name: "For Her", url: "/Giftforher" },
                { name: "For Employee", url: "/Giftforcompanies" }
            ]
        },
        {
            title: "ANNIVERSARY",
            items: [
                { name: "Wedding Anniversary", url: "/Giftforwedding" },
                { name: "Work Anniversary", url: "/Giftforcompanies" },
            ],
            url: "/Giftforwedding"
        },
        {
            title: "THANKYOU",
            items: [
                { name: "For Everyone", url: "/Giftforeveryone" },
            ],
            url: "/Giftforeveryone"
        },
        {
            title: "BUSINESS GIFTS",
            items: [
                {name: "For Company", url: "/Giftforcompanies" },
            ],
            url: "/Giftforcompanies"
        },
        {
            title: "RELIGIOUS MOMENTS",
            items: ["EID", "HOLI", "DIWALI", "Navroz"],
            url: "/Giftforreligions"
        }
    ],
};

export default hoverSubOptions;
