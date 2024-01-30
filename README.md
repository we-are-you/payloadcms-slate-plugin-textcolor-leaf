# PayloadCMS SlateEditor Leaf - TextColor
Add a simple text color picker - a predefined list - to the SlateJS editor.

## Installation

```bash
  yarn add @wru/payloadcms-slate-plugin-textcolor-leaf
  # OR
  npm i @wru/payloadcms-slate-plugin-textcolor-leaf
```

## Usage

Add the leav to the slateEditor. For example in `payload.config.ts`
```js
editor: slateEditor({
    admin: {
        leaves: [
            wruTextColorLeaf({
                name: 'color_picker',
                colorList: [
                    {
                        label: 'Primary',
                        color: '#8BE28C',
                    },
                    {
                        label: 'Secondary',
                        color: '#87021f',
                    },
                ],
            }),
        ],
    },
}),

```