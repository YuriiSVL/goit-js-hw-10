export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,flags,population`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function renderListOfCountries(countries) {
  const markup = countries
    .map(country => {
      {
        return `<li class="country-list__item">
  <img src="${country.flags.svg}" alt="flag" width="30" />${country.name.official}
</li>`;
      }
    })
    .join('');

  refs.countryList.innerHTML = markup;
}

export function renderCountryInfo(countries) {
  const country = countries[0];
  const markup = `<div class="country-info__flag-title-wrapper">
   <img src="${country.flags.svg}" alt="flag" width="50" />
   <h1 class="country-info__title">${country.name.official}</h1>
  </div>
  <p><span class="country-info__point">Capital</span> : ${country.capital}</p>
  <p><span class="country-info__point">Population</span> : ${
    country.population
  }</p>
  <p><span class="country-info__point">Languages:</span> ${Object.values(
    country.languages
  )}</p>`;

  refs.countryInfo.innerHTML = markup;
}
