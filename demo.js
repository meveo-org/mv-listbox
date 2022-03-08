import { LitElement, html, css } from "lit";
import "./mv-listbox.js";

import FF_CHARACTERS from "./data/ff-characters.json";

const JOBS = [...new Set(FF_CHARACTERS.map(character => character.job))];

export class MvContainerDemo extends LitElement {
  static get properties() {
    return {
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
        --mv-listbox-content-max-height: 600px;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }

      .avatar {
        vertical-align: middle;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .header {
        display: flex;
        align-items: center;
        padding-left: 20px;
        height: 66px;
        font-size: 2rem;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      .header.light {
        color: #80828c;
        background: #eeeeee;
      }

      .header.dark {
        color: #ffffff;
        background: linear-gradient(
          45deg,
          rgba(232, 179, 56, 1) 0%,
          rgba(255, 150, 0, 1) 100%
        );
      }

      .label {
        display: inline-block;
        width: calc(100% - 40px);
        padding: 5px 20px;
      }

      .label:hover {
        color: #80828c;
        background: #f5f6fa;
        cursor: pointer;
      }

      .character-info {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
      }

      .job {
        width: 130px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
      }

      .trash {
        background: none;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 3px 9px;
        font-size: 1em;
        outline: none;
        cursor: pointer;
      }

      .trash.dark {
        color: #80828c;
      }

      .trash:hover {
        background: #80828c;
        color: #ffffff;
      }

      .origin {
        color: #1d9bc9;
        font-size: 1.2em;
        padding-top: 10px;
      }

      .description {
        color: #80828c;
        font-size: 0.8em;
        padding: 10px;
      }

      .footer-button {
        padding: 10px 0;
        margin: 20px 0 0 0;
        width: 100%;
        font-size: 1.2em;
        font-weight: bold;
        border: none;
        background: #008fc3;
        color: #f5f6fa;
        border-radius: 5px;
        outline: none;
      }

      .footer-button:hover {
        background: #1d9bc9;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "light";
    this.characters = [...FF_CHARACTERS];
  }

  render() {
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark
        </label>
      </fieldset>
      <mv-listbox list show-label .theme="${this.theme}">
        <mv-listbox label>
          <span class="header ${this.theme}">Final Fantasy Characters</span>
        </mv-listbox>
        ${this.characters.map(
          character => html`
            <mv-listbox group>
              <mv-listbox label>
                <div class="label ${this.theme}">
                  <span class="character-info">
                    <img src="${character.picture}" class="avatar" />
                    ${character.name} (${character.race})
                    <select class="job">
                      ${JOBS.map(
                        job => html`
                      <option
                        ?selected="${job === character.job}"
                        value="${job}"
                      >${job}</selected>
                    `
                      )}
                    </select>
                    <button
                      class="trash ${this.theme}"
                      @click="${this.clickButton({
                        name: "Delete Character",
                        data: character
                      })}"
                    >
                      &#x2716;
                    </button>
                  </span>
                </div>
              </mv-listbox>
              <mv-listbox item>
                <div class="origin">${character.origin}</div>
              </mv-listbox>
              <mv-listbox item>
              <div class="description">${character.description}</div>
              </mv-listbox>
            </mv-listbox>
          `
        )}
        <mv-listbox footer>
          <button
            class="footer-button ${this.theme}"
            @click="${this.clickButton({ name: "Add Character" })}"
          >
            &#x2b; Add Character
          </button>
        </mv-listbox>
      </mv-listbox>
    `;
  }

  changeTheme = originalEvent => {
    const {
      target: { value }
    } = originalEvent;
    this.theme = value;
  };

  clickButton = ({ name, data }) => event => {
    event.preventDefault();
    event.stopPropagation();
    alert(
      `${name} button was clicked.\n\nData:\n ${JSON.stringify(
        data || {},
        null,
        2
      )}`
    );
  };
}

customElements.define("mv-listbox-demo", MvContainerDemo);
