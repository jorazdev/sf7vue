import { Ref } from "vue";

export default function useTools() {
    const toggleFullscreen = (document: Document, container: Ref) => {
        if (!document.fullscreenElement) {
            container.value?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    return {
        toggleFullscreen
    }
}