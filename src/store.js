import Vue from 'vue';
import Vuex from 'vuex';

const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "",
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
        products: [
            {
                product: {
                    fruitType: 'a',
                    amount: 5,
                    storageDate: 45345345,
                    comments: "bal",
                }
            },
            {
                product: {
                    fruitType: 'safsfsa',
                    amount: 5,
                    storageDate: 453453,
                    comments: "basdfsafal",
                }
            },
        ],
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
        },
        products: state => {
            return state.products
        }
    },


    mutations: {
        addProductToProducts(state, payload) {
            state.products.push(payload);
        },
        setWeightedFruitTypes(state,payload){
            state.fruitTypes = payload
        },
        updateProducts(state, payload){
            state.products = payload
        }
    },


    actions: {
        // eslint-disable-next-line no-unused-vars
        saveToFirestore({commit, state}, product) {
            commit('addProductToProducts', product)
            db.collection("products")
                .add(product)
                .then(function (docRef) {
                    // update the document with the generated ID
                    db.collection('products')
                        .doc(docRef.id)
                        .update({id: docRef.id})
                        .then(() => {
                            // eslint-disable-next-line no-console
                            console.log("Document written with ID: ", docRef.id);
                        })

                }).catch(function (error) {
                // eslint-disable-next-line no-console
                console.error("Error adding document: ", error);
            });
        },
        addIdToFirestoreProduct(id){
            db.collection('users')
                .doc(id)
                .update({id: id})
                .then(() => {
                    // eslint-disable-next-line no-console
                    console.log('updated!')
                })
        },
        setFruitTypePredictionWeights({commit}, fruitTypes) {
            commit('setWeightedFruitTypes', fruitTypes)
        },
        retrieveProductsCollection({commit, state}) {
            // retrieve a collection
            db.collection('products')
                .get()
                .then(querySnapshot => {
                    const documents = querySnapshot.docs.map(doc => doc.data());
                    commit('updateProducts', documents);
                    // eslint-disable-next-line no-console
                    console.log(state.products)
                })
        }
    },

    strict: process.env.NODE_ENV !== 'production',
});
