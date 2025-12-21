function generateRandomUsername() {
    const adjectives = ["Quick", "Lazy", "Happy", "Sad", "Brave", "Clever", "Witty", "Kind"];
    const nouns = ["Fox", "Dog", "Cat", "Bear", "Lion", "Tiger", "Wolf", "Eagle"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    return `${randomAdjective}${randomNoun}${randomNumber}`;
}

module.exports = generateRandomUsername;    