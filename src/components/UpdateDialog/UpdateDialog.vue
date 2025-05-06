<template>
    <v-dialog v-model="dialog" persistent width="500">
        <v-card class="p-1">
            <v-card-title class="headline grey lighten-2" style="font-size: 20px!important;">
                Success to Update!
            </v-card-title>

            <v-card-text class="p-3 text-left">
                <b>Versi: {{ oldVersion || "0.0.0" }}</b>
                <hr>
                <b>What's New?:</b>
                <div class="row" v-for="(item, index) in list" :key="index">
                    <div class="col-12">
                        <div class="m-0">
                            <!-- NEW FEATURE -->
                            <div v-if="item.type == 'new'"
                                class="badge badge-success badge-pill text-center font-weight-bold">NEW!</div>
                            <!-- BUG FIX -->
                            <div v-if="item.type == 'bug'"
                                class="badge badge-danger badge-pill text-center font-weight-bold">BUG FIX!</div>
                            <!-- enhance -->
                            <div v-if="item.type == 'enhance'"
                                class="badge badge-primary badge-pill text-center font-weight-bold">ENHANCE!</div>
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="$emit('dialog-close', false)">
                    I accept
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "UpdateDialog",
    props: {
        list: Array,
        dialog: {
            type: Boolean,
            default: false
        },
        oldVersion: String
    }
}
</script>
<style></style>