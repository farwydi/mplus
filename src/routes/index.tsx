import {component$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import items from '~/dataset/Warrior_Protection-10960.json';
import {ItemTop} from '~/components/item/item-top'
import {ItemTopMulti} from '~/components/item/item-top-multi'

export default component$(() => {
    // const safeItems = Object.keys(items).filter(group => items[group] !== null).map(group => items[group])
    const topItems = items.top;
    return (
        <div>move</div>
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
