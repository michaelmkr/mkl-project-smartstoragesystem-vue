import Vue from 'vue';
import Vuex from 'vuex';

const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyA7Ce4FSgn-7dj3VrqwyVNpHksfjSWExmQ",
    authDomain: "mkl-smartstoragesystem.firebaseapp.com",
    databaseURL: "https://mkl-smartstoragesystem.firebaseio.com",
    projectId: "mkl-smartstoragesystem",
    storageBucket: "mkl-smartstoragesystem.appspot.com",
    messagingSenderId: "847977060267",
    appId: "1:847977060267:web:1c7ab4a144241de38f64ee"
}

// eslint-disable-next-line no-unused-vars
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

Vue.use(Vuex);

// function firestoreProducts() {
//     db.collection("users").onSnapshot(function (querySnapshot) {
//         let products = [];
//         querySnapshot.forEach(function (doc) {
//             products.push(doc.data());
//         });
//         // eslint-disable-next-line no-console
//         return products;
//     });
// }

export default new Vuex.Store({
    state: {
        count: 0,
        products: [],
        fruitTypes: [
            'Erdbeeren',
            'Marillen',
            'Zwetschken',
        ],
        amounts: [
            3,
            5,
            10
        ],
    },


    getters: {
        fruitTypes: state => {
            return state.fruitTypes
        },
        amounts: state => {
            return state.amounts
        }
    },


    mutations: {
        addProductToProducts(state, payload) {
            state.products.push(payload);
        },
        setWeightedFruitTypes(state,payload){
            state.fruitTypes = payload
        }
    },


    actions: {
        // eslint-disable-next-line no-unused-vars
        saveToFirestore({commit, state}, product) {
            commit('addProductToProducts', product)
            // eslint-disable-next-line no-console
            console.log(state.products)
            db.collection("products")
                .add({product})
                .then(function (docRef) {
                    // eslint-disable-next-line no-console
                    console.log("Document written with ID: ", docRef.id);
                }).catch(function (error) {
                // eslint-disable-next-line no-console
                console.error("Error adding document: ", error);
            });
        },
        setFruitTypePredictionWeights({commit, state}, fruitTypes) {
            commit('setWeightedFruitTypes', fruitTypes)
            // eslint-disable-next-line no-console
            console.log(state.fruitTypes)
        },
    },

    strict: process.env.NODE_ENV !== 'production',
});
