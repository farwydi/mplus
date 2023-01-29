import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { specs, specsIcon } from "~/dataset/meta";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div class="container mx-auto mt-4">
            <h2 class="text-5xl mb-2">World of Warcraft</h2>
            <h3 className="text-4xl mb-6">Best gear</h3>

            <div class="flex justify-between">
                {Object.entries(specs).map(([className, specs]) => {
                    return <div class="flex flex-col items-center">
                        <p class="text-center text-xl mb-2">{className}</p>
                        {specs.map(specName => {
                            return (
                                <Link
                                    class="text-white block p-2"
                                    href={`${className}/${specName}/0/none/`}
                                >
                                    <img src={`/spec/${specsIcon.get(className)?.get(specName)}`}
                                         alt={`${className}-${specName}`}/>
                                </Link>
                            )
                        })}
                    </div>
                })}
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'WoW Best Gear',
    meta: [
        {
            name: 'description',
            content: 'World of Warcraft bast gear compare',
        },
    ],
};
