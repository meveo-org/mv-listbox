# mv-listbox

MvListbox is a Meveo listbox component (based on lit-element) that renders a list of items.

## Quick Start

To experiment with the MvListbox component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the listbox demo component in demo.js file

## Sample usage

```html
<mv-listbox
  list                        // this marks the main list
  .theme="${this.theme}"      // chooses between "light" and "dark" theme, default: "light"
>
  <mv-listbox
    label                     // this marks the header label of the list
  >Main label</mv-listbox>
  <mv-listbox
    item                      // this marks a list item
  >Main item</mv-listbox>
  <mv-listbox
    group                     // this marks a group
    open                      // this indicates whether the group is open or not, when open, its contents are
                              //   shown below it
  >
    <mv-listbox
      label                   // this marks the label of the group
    >Group label</mv-listbox>
    <mv-listbox
      item                    // this marks a group item which appears when the group is open
    >Group item</mv-listbox>
  </mv-listbox>
  <mv-listbox
    footer                    // this marks the list footer
  >Footer content</mv-listbox>
</mv-listbox>
```

You can also check this [demo](https://listbox.meveo.org/)

## Acknowledgements
Demo data derived from [Moogle API](https://www.moogleapi.com/)
