<template>
    <div>
        <div class="hidden">Teachable Machine Image Model</div>
        <!--        <button type="button" onclick="this.init">Start</button>-->
        <div class="hidden" id="webcam-container"></div>
        <div class="hidden" id="label-container"></div>
    </div>
</template>

<script>
    // eslint-disable-next-line
    import * as tf from '@tensorflow/tfjs';
    import * as tmImage from '@teachablemachine/image';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "predictionComponent",
        mounted: function () {
        },
        computed: {
            ...mapGetters([
            ]),
        },
        methods: {
            ...mapActions([
                'setFruitTypePredictionWeights',
            ]),
            showLoader() {
                let loader = this.$loading.show({
                    loader: 'bars',
                });
                // simulate AJAX
                setTimeout(() => {
                    loader.hide()
                }, 2000)
            },
            async init() {
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";

                // load the model and metadata
                // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
                // or files from your local hard drive
                // Note: the pose library adds "tmImage" object to your window (window.tmImage)
                model = await tmImage.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                // Convenience function to setup a webcam
                const flip = true; // whether to flip the webcam
                webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
                await webcam.setup(); // request access to the webcam
                await webcam.play();
                window.requestAnimationFrame(this.loop);

                // append elements to the DOM
                document.getElementById("webcam-container").appendChild(webcam.canvas);
                labelContainer = document.getElementById("label-container");
                for (let i = 0; i < maxPredictions; i++) { // and class labels
                    labelContainer.appendChild(document.createElement("div"));
                }
            },
            async loop() {
                webcam.update(); // update the webcam frame
                await this.predict();
                webcam.stop();
                // setTimeout(()=>{window.requestAnimationFrame(this.loop)}, 5000);
            },
            // run the webcam image through the image model
            async predict() {
                // predict can take in an image, video or canvas html element
                const prediction = await model.predict(webcam.canvas);
                // eslint-disable-next-line no-console
                console.log(prediction);
                this.setPredictionWeights(prediction);
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    labelContainer.childNodes[i].innerHTML = classPrediction;
                }
            },
            orderedPrediction(prediction) {
                function compare(a, b) {
                    if (a.probability < b.probability)
                        return 1;
                    if (a.probability > b.probability)
                        return -1;
                    return 0;
                }
                return prediction.sort(compare);
            },
            setPredictionWeights(prediction) {
                const orderedPrediction = this.orderedPrediction(prediction);
                let orderedFruitTypes = [];
                for (let i = 0; i < orderedPrediction.length; i++){
                    orderedFruitTypes.push(orderedPrediction[i].className);
                }
                // eslint-disable-next-line no-console
                this.setFruitTypePredictionWeights(orderedFruitTypes);
            }
        }
    }

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    // const URL = "https://teachablemachine.withgoogle.com/models/WfXWOZkec/"; // Michi | Serviette
    const URL = "https://teachablemachine.withgoogle.com/models/IDmpIM8BC/"; // Erdbeere | Marille | Zwetschke

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam

</script>
