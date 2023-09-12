<template>
    <svg class="spinner" viewBox="0 0 50 50">
        <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
        ></circle>
    </svg>
</template>
<style scoped>
.spinner {
    animation: rotate 2s linear infinite;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
}

.path {
    stroke: hsl(0, 0%, 16%);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}
</style>
