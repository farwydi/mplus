import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
    return (
        <>
            <nav class="text-white">

            </nav>
            <main>
                <section>
                    <Slot/>
                </section>
            </main>
            <div
                class="hidden text-itemLevel text-rare text-uncommon text-epic border-epic border-rare border-common border-uncommon"></div>
        </>
    );
});
