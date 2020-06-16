import Vue from 'vue';
import Vuex from 'vuex';
import {generateQRsrc} from "@/js/qrcode";

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
        lastId: '',
        fridges: [
            {
                name: 'Links',
                trays: [
                    {
                        name: 'A1',
                        volume: 20,
                        free: 8
                    },
                    {
                        name: 'A2',
                        volume: 20,
                        free: 16
                    },
                    {
                        name: 'A3',
                        volume: 20,
                        free: 4
                    },
                    {
                        name: 'A4',
                        volume: 20,
                        free: 17
                    }
                ]
            },
            {
                name: 'Mitte',
                trays: [
                    {
                        name: 'B1',
                        volume: 20,
                        free: 4
                    },
                    {
                        name: 'B2',
                        volume: 20,
                        free: 1
                    },
                    {
                        name: 'B3',
                        volume: 20,
                        free: 13
                    },
                    {
                        name: 'B4',
                        volume: 20,
                        free: 1
                    }
                ]
            },
            {
                name: 'Rechts',
                trays: [
                    {
                        name: 'C1',
                        volume: 20,
                        free: 7
                    },
                    {
                        name: 'C2',
                        volume: 20,
                        free: 5
                    },
                    {
                        name: 'C3',
                        volume: 20,
                        free: 16
                    },
                    {
                        name: 'C4',
                        volume: 20,
                        free: 1
                    }
                ]
            }

        ]
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
        },
        lastId: state => {
            return state.lastId
        },
        fridges: state => {
            return state.fridges
        }
    },


    mutations: {
        addProductToProducts(state, payload) {
            state.products.push(payload);
        },
        setWeightedFruitTypes(state, payload) {
            state.fruitTypes = payload
        },
        updateProducts(state, payload) {
            state.products = payload
        },
        updateLastId(state, payload) {
            state.lastId = payload
        },
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
                            commit('updateLastId', docRef.id)
                        })
                }).catch(function (error) {
                // eslint-disable-next-line no-console
                console.error("Error adding document: ", error);
            });
        },
        getFirestoreDocument({state}) {
            db.collection('products')
                .doc(state.lastId)
                .get()
                .then(snapshot => {
                    const document = snapshot.data();
                    // eslint-disable-next-line no-console
                    console.log(document)
                    generateQRsrc('qrcode', JSON.stringify(document));
                    return document;
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
