import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { meta } from "~/dataset/meta";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="container mx-auto">
            {Object.entries(meta).map(([className, specs]) => {
                return specs.map(specName => {
                    return (
                        <Link
                            class="text-white block p-2"
                            href={`${className}/${specName}/0/`}
                        >
                            {className}-{specName}
                        </Link>)
                })
            })}
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
