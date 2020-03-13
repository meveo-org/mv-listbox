import { LitElement, html, css } from "lit-element";

export class MvListbox extends LitElement {
  static get properties() {
    return {
      // optional, this is the value that is returned when listbox items are clicked
      value: { type: Object, attribute: false },
      list: { type: Boolean, attribute: true },
      label: { type: Boolean, attribute: true },
      group: { type: Boolean, attribute: true },
      item: { type: Boolean, attribute: true },
      footer: { type: Boolean, attribute: true },
      open: { type: Boolean, attribute: true, reflect: true },

      //  valid theme values are: "light", "dark"
      //    default: "light"
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 1rem);
        --item-padding: var(--mv-listbox-item-padding, auto);
        --light-background: var(--mv-listbox-background, #ffffff);
        --light-color: var(--mv-listbox-light-color, #000000);        
        --dark-background: var(--mv-listbox-dark-background, #373e48);
        --dark-color: var(--mv-listbox-dark-color, #ffffff);        
      }

      section {
        color: var(--color);
        background-color: var(--background-color);
        margin: var(--mv-listbox-margin, 20px auto);
        padding: var(--mv-listbox-padding, 20px);
        border: var(--mv-listbox-border, 1px solid #bfbfbf);
        min-width: var(--mv-listbox-min-width, 300px);
        max-width: var(--mv-listbox-max-width, 500px);
        min-height: var(--mv-listbox-min-height, auto);
        max-height: var(--mv-listbox-max-height, auto);
        box-shadow: var(--mv-listbox-shadow, 0 0 13px 0 rgba(42, 42, 42, 0.65));
      }

      ul {
        margin: 0;
        padding: 0;
      }

      li {
        list-style: none;
      }

      li ::slotted(*) {
        padding: var(--item-padding);
      }

      .light {
        color: var(--light-color);
        background-color: var(--light-background);
      }

      .dark {
        color: var(--dark-color);
        background-color: var(--dark-background);
      }

      .mv-listbox-content {
        max-height: var(--mv-listbox-content-max-height);
        overflow-x: var(--mv-listbox-overflow-x, hidden);
        overflow-y: var(--mv-listbox-overflow-y, auto);
      }

      .mv-listbox-content.scrollbar {
        width: calc(100% - 2px);
        float: left;
        overflow-y: auto;
        margin: 0;
        /* fallback for firefox */
        scrollbar-color: #5a6473 #788394;
        scrollbar-width: thin;
        margin: var(--content-margin);
      }

      .mv-listbox-content.scrollbar:focus {
        outline: transparent auto 0;
      }

      .mv-listbox-content.scrollbar::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #788394;
      }

      .mv-listbox-content.scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #788394;
        border-radius: 10px;
      }

      .mv-listbox-content.scrollbar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #5a6473;
      }

      .mv-listbox-content.scrollbar.light {
        /* fallback for firefox */
        scrollbar-color: #1d9bc9 #eaebf0 !important;
      }

      .mv-listbox-content.scrollbar.light::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px 0 rgba(29, 155, 201, 0.3);
        background-color: #eaebf0 !important;
      }

      .mv-listbox-content.scrollbar.light::-webkit-scrollbar {
        background-color: #1d9bc9;
      }

      .mv-listbox-content.scrollbar.light::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 5px 0 rgba(29, 155, 201, 0.3);
        background-color: #008fc3;
      }

      .footer {
        min-height: var(--item-padding);
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
    this.selected = false;
    this.custom = false;
    this.theme = "light";
  }

  render() {
    const {
      theme,
      list,
      showLabel,
      label,
      group,
      item,
      footer,
      open,
      disabled,
      selected,
      custom
    } = this;
    const openClass = open ? " open" : " close";
    const disabledClass = disabled ? " disabled" : "";
    const selectedClass = selected ? " selected" : "";
    const itemClass = `${disabledClass || selectedClass}`;
    if (list) {
      return html`
        <section class="mv-listbox ${theme}">
          <div
            class="listbox-header ${theme}"
            @click="${this.handleHeaderClick}"
          >
            <slot name="listbox-label"></slot>
          </div>
          <ul class="mv-listbox-content scrollbar ${this.theme}">
            <slot></slot>
          </ul>
          <div class="footer">
            <slot name="footer">&nbsp;</slot>
          </div>
        </section>
      `;
    } else if (label) {
      this.setAttribute("slot", "listbox-label");
      return html`
        <slot></slot>
      `;
    } else if (group) {
      return html`
        <li class="${openClass}${itemClass}" @click="${this.handleOpenMenu}">
          <div class="sub-listbox${openClass}">
            <div class="listbox-label-group${openClass}">
              <div class="listbox-label">
                <slot name="listbox-label"></slot>
              </div>
              ${!custom
                ? html`
                    <i class="${`listbox-group-dropdown-icon${openClass}`}"></i>
                  `
                : html``}
            </div>
            ${open
              ? html`
                  <ul>
                    <slot></slot>
                  </ul>
                `
              : html``}
          </div>
        </li>
      `;
    } else if (item) {
      return html`
        <li class="${itemClass}" @click="${this.handleItemClick}">
          <div>
            <slot></slot>
          </div>
        </li>
      `;
    } else if (footer) {
      this.setAttribute("slot", "footer");
      return html`
        <slot></slot>
      `;
    }
    return html``;
  }

  connectedCallback() {
    //initialize
    if (this.open === undefined && (this.group || this.listbox)) {
      this.open = !this.group;
    }
    super.connectedCallback();
  }

  handleHeaderClick = originalEvent => {
    const { value } = this;
    this.dispatchEvent(
      new CustomEvent("select-header", { detail: { value, originalEvent } })
    );
  };

  handleOpenMenu = originalEvent => {
    const { custom, open, value } = this;
    if (!custom) {
      originalEvent.stopPropagation();
      this.open = !open;
    }
    this.dispatchEvent(
      new CustomEvent("select-group", { detail: { value, originalEvent } })
    );
  };

  handleItemClick = originalEvent => {
    const { value, disabled } = this;
    if (!!value && !disabled) {
      this.dispatchEvent(
        new CustomEvent("select-item", { detail: { value, originalEvent } })
      );
    } else {
      originalEvent.stopPropagation();
    }
  };
}

customElements.define("mv-listbox", MvListbox);
