<template>
    <div>
        <img :src="imageUrl" alt="Example Image" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: require('@/assets/assembly.jpg') // Replace with your image path
        };
    }
};
</script>

<style scoped>
img {
    max-width: 100%;
}
</style>