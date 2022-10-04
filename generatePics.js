import { randomInt, getRandomElem, getRandomKey } from "/randoming.js";

const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;
export const PICS = {
    'gold': 'section_pic_winter.jpg',
    'white': 'section_pic_summer.jpg',
    'darkgreen': 'section_pic_spring.jpg',
    'lime': 'section_pic_2.jpg',
    'blue': 'section_pic_1.jpeg',
    'red': 'winter_scenery.jpg',
    'orange': 'fly_me_to_the_moon.jpg',
    'purple': 'cat.jpg',
};
const DESCRIPTIONS = [
    'This is my food',
    'Me and my family',
    'Look, my cat is so dump <3 <3 <3',
    'Just a reg com for reg pic',
    'I <3 pizza'
];
const MESSAGES = [
    'Wow, really cool!',
    'Hey, thats awesome!!!',
    'Picture, I choose YOU1',
    'I like you',
    'Like&Subscribe',
    'This is the best photo I\'ve ever seen!'
];
const NAMES = [
    'Dima',
    'Vlad',
    'Lesha',
    'Daniil',
    'Masha',
    'Lena',
    'Gena',
    'Natasha'
];

export function generatePicsArray(picturesNumber) {
    const maxCommentId = MAX_COMMENT_COUNT * picturesNumber;

    // Generate an array with certain amount of objects within
    // using Array.from:
    const pictures = Array.from({ length: picturesNumber }, () => generatePic(picturesNumber, maxCommentId));

    // using new Array(n).fill().map(() => func)
    // let pictures = new Array(picturesNumber).fill().map(() => generatePic(picturesNumber, maxComId));

    return pictures;
}

// As an argument gets the number of elements supposed to be in the array
function generatePic(maxPicId, maxCommentId) {

    // Static var immitation
    if (generatePic.usedPicIds === undefined) {
        generatePic.usedPicIds = [];
    }

    let creatingNewPic = true;
    while (creatingNewPic) {
        const nextId = randomInt(1, maxPicId);
        if (!generatePic.usedPicIds.includes(nextId)) {
            const newPic = {
                id: nextId,
                // url: `./photos/${nextId}.jpg`,
                url: `${getRandomKey(PICS)}`,
                descripction: getRandomElem(DESCRIPTIONS),
                likes: randomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT), // 15 - 200
                comments: Array.from({ length: randomInt(0, MAX_COMMENT_COUNT) }, () => generateComment(maxCommentId)) // 0 - 10
            };
            generatePic.usedPicIds.push(nextId);
            return newPic;
        }
    }
}
function generateComment(maxCommentId) {
    // Static var immitation
    if (generateComment.usedCommentIds === undefined) {
        generateComment.usedCommentIds = [];
    }

    let creatingNewComment = true;
    while (creatingNewComment) {
        const nextId = randomInt(1, maxCommentId);
        if (nextId < maxCommentId && !generateComment.usedCommentIds.includes(nextId)) {
            const commenter = randomInt(0, 5);
            const newComments = {
                id: nextId,
                avatar: `./img/avatar-${commenter + 1}.png`,
                message: getRandomElem(MESSAGES),
                name: NAMES[commenter]
            };
            generateComment.usedCommentIds.push(nextId);
            return newComments;
        }
    }
}
