import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
    return (
        <>
            <nav class="text-white">

            </nav>
            <main class="text-white">
                <Slot/>
            </main>
            <div
                class="hidden text-itemLevel text-rare text-uncommon text-artifact text-epic border-artifact border-epic border-rare border-common border-uncommon"></div>
        </>
    );
});
