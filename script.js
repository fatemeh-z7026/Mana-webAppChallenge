let $ = document;
let resultContainer = $.getElementById("result");

//Create Card
let card = `<div class="card"><h3>KWH (EMS-Meter)</h3><select>
            <option value="minTotal">Min</option>
            <option value="maxTotal">Max</option>
            <option value="sumTotal">Sum</option>
            <option value="countTotal">Count</option>
            <option value="avrageTotal">Avrage</option>
          </select><p>Value: 3.24</p></div>`;
resultContainer.insertAdjacentHTML("afterbegin", card);
