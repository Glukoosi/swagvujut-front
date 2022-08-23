import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { createApp, reactive } from "https://unpkg.com/petite-vue@0.2.2/dist/petite-vue.es.js"
import axios from 'https://cdn.skypack.dev/axios';

const registered = reactive({
    loaded: false,
    names: [],
    getRegistered() {
        const socket = io("https://api.ilmo.io");

        socket.on("xwagtest", (msg) => {
            this.names.push(msg)
        });

        axios.get("https://api.ilmo.io/api/registrations/names/xwagtest")
            .then(data => {
                this.names = data.data.reverse();

            })
    }
})

registered.getRegistered()

createApp({
    form: {
        name: "",
        email: "",
        group: "",
        greeting: "",
        food: "",
        alcohol: "",
        bottle: "",
        tablewish: "",
        free: "",
        checkbox: "",
    },
    send() {
        axios.post("https://api.ilmo.io/api/registration/xwagtest", this.form)
        .then(() => {
            for (const item in this.form) {
                this.form[item] = '';
            }
        })
    },
    registered
}).mount()
