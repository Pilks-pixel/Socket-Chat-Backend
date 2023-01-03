const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minLength: [3, 'username must be at least 3 characters'],
        maxLength: [20, 'username too long!, needs to be under 20 and got {VALUE}'],
        required: [true, 'No username!'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxLength: [50, 'email too long!, needs to be under 50 and got {VALUE}'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password must be at least 6 characters, got {VALUE}'],
        // maxLength: [40, 'password too long!, needs to be under 40 and got {VALUE}'],
        required: [true, 'No password!']
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default:''
    },

});

module.exports = mongoose.model('User', userSchema);

// const userData = [
//     {
//     userName:'Pete',
//     email:'pete@gmail.test',
//     password:'test'
// }
// ]

// class User {
//     constructor(data) {
//         this.id = data.id
//         this.userName = data.userName
//         this.userName = data.email
//         this.userName = data.password

//     }

//     static get all() {
//         const allUsers = userData.map(user => {
//             return new User(user)
//         });

//         return allUsers
//     };;

//     static get create(data) {
//         const newUserId = userData.length + 1;
//         const newUser = new User({...data, id :newUserId});
//         userData.push(newUser); 
//         return newUser
//     }

//     static set update(userData, userToUpdate, newProperties) {
//         const targetUser = userData.filter(user => {
//             return user.id === userToUpdate.id
//         } );
//         return targetUser = new User({newProperties})

//     }

    
//     static set userDelete(userToDelete, userData) {
//         const targetUser = userData.findIndex(user => {
//             return user.id === userToDelete.id
//         } )
//         userData.splice(targetUser, 1);
//     }
    
// }
